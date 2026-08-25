import s from './ManageResponses.module.scss';
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/requests.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import {formatActiveChats, formatNewMessages, formatPinned, formatResponses} from "@/utils/responses.js";
import ResponsesTabs from "@/components/manage-requests/MyResponses/ManageResponses/ResponsesTabs/ResponsesTabs.jsx";
import ResponseCard from "@/components/manage-requests/MyResponses/ManageResponses/ResponseCard/ResponseCard.jsx";
import MiniSpinnerPagination from "@/components/ui/miniSpinner/MiniSpinnerPagination/MiniSpinnerPagination.jsx";
import EmptyPageResponses from "@/components/manage-requests/MyResponses/EmptyPageResponses/EmptyPageResponses.jsx";

const ManageResponses = () => {
  const PAGE_SIZE = 12;

  const [tab, setTab] = useState("all");
  const [responses, setResponses] = useState(null);
  const [mainLoading, setMainLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false);

  const activeProfileId = useSelector(getActiveProfileId)

  // Ссылки на элементы в DOM
  const observerRef = useRef(null);
  const containerRef = useRef(null); // Реф для самого списка ul со скроллом

  // Замок для защиты от лишних запросов во время быстрого скролла
  const isLoadingRef = useRef(false);

  // Первичная загрузка данных
  const resetResponses = async () => {
    try {
      let queryParam = "";
      if (tab !== "all") queryParam = `&tab=${tab}`;

      setMainLoading(true);
      isLoadingRef.current = true; // Закрываем замок на время загрузки

      const response = await axiosInstance(`responses?page=1&pageSize=${PAGE_SIZE}${queryParam}`);

      const payload = getPreviewPayload(response.data.items);
      const pictures = await axiosInstance.post(`/requests/preview`, payload);
      const responsesWithPictures = getRequestsWithPictures({requests: response, pictures});

      setResponses(responsesWithPictures);
      setPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setMainLoading(false);
      isLoadingRef.current = false; // Открываем замок
    }
  }

  // Вызов при смене вкладок или профиля
  useEffect(() => {
    if (!activeProfileId) return;
    resetResponses();
  }, [tab, activeProfileId]);

  // Подгрузка по скроллу (вызывается из обзервера)
  const handleObserverReached = async () => {
    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !activeProfileId || !responses) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (responses.items.length >= responses.meta.totalCount) return;

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);

      let queryParam = "";
      if (tab !== "all") queryParam = `&tab=${tab}`;

      const nextPage = page + 1;
      const requestsResponse = await axiosInstance(`responses?page=${nextPage}&pageSize=${PAGE_SIZE}${queryParam}`);

      if (!requestsResponse.data.items || requestsResponse.data.items.length === 0) {
        return;
      }

      const payload = getPreviewPayload(requestsResponse.data.items);
      const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload);
      const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures});

      setResponses(prevRequests => ({
        ...prevRequests,
        items: [...prevRequests.items, ...requestsWithPictures.items]
      }));
      setPage(nextPage);
    } catch (err) {
      console.log(err);
    } finally {
      setIsOnScrollLoading(false);
      isLoadingRef.current = false; // Открываем замок после завершения рендера данных
    }
  };

  // Инициализация обзервера под ваш внутренний скролл
  useEffect(() => {
    // Если идет базовая загрузка или элементов еще нет на экране — обзервер не создаем
    if (mainLoading || !observerRef.current || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Срабатывает строго при видимости элемента и открытом замке
        if (entry.isIntersecting && !isLoadingRef.current) {
          handleObserverReached();
        }
      },
      {
        root: containerRef.current, // Привязываем слежку к нашему блоку ul со скроллом
        rootMargin: '0px 0px 150px 0px', // Начнет загрузку за 150px до конца списка
        threshold: 0
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
    // Массив зависимостей обновляет обзервер, спасая от старых замыканий флагов
  }, [mainLoading, responses, page]);

  return (
    <div className={s.manageRequestsWrapper}>

      <MobileHeaderLk/>

      <div>
        <div className={s.header}>
          <div className={s.leftHeader}>
            <h1 className={s.title}>Управление откликами</h1>
            <div className={s.subtitle}>{responses && formatResponses(responses.stats.totalResponses)}
              {responses && responses.stats.activeChats > 0 && ` · ${formatActiveChats(responses.stats.activeChats)}`}
              {responses && responses.stats.pinnedCount > 0 && ` · ${formatPinned(responses.stats.pinnedCount)}`}
              {responses && responses.stats.newMessages > 0 && ` · ${formatNewMessages(responses.stats.newMessages)}`}
            </div>
          </div>
        </div>

        <div className={s.wrapperForTabs}>
          <ResponsesTabs responses={responses} setTab={setTab} tab={tab} />
        </div>

        {mainLoading && <Spinner/>}

        {!mainLoading && responses && responses.items.length > 0 && (
          <div ref={containerRef} className={`${s.responsesTable}`}>
            <div className={s.tableHead}>
              <div className={s.leftBlock}>Заявка</div>
              <div className={s.middleBlock}>
                <div className={s.clientCell}>заказчик</div>
                <div className={s.statusCell}>статус чата</div>
              </div>
              <div className={s.rightBlock}>
                <div className={s.lastMessageCell}>
                  <span className={s.tabletHidden}>Последнее сообщение</span>
                </div>
                <div className={s.dateCell}><span className={s.tabletHidden}>Дата</span></div>
                <div className={s.iconWrapper}></div>
              </div>
            </div>
            <ul className={`${s.tableRows} scroll`}>
            {responses.items.map((response, index) => <ResponseCard
              key={index}
              response={response}
              resetResponses={resetResponses}
              isLast={index === responses.items.length-1}
              currentTab={tab}
            />)}
              {/* Обзервер находится внутри тега <ul> как элемент списка */}
              {responses && (responses.items.length < responses.meta.totalCount) && (
                <li ref={observerRef} className={s.observerDiv} style={{ listStyleType: 'none', width: '100%', minHeight: '30px' }}>
                  {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
                    <MiniSpinnerPagination />
                  </div>}
                </li>
              )}
            </ul>
          </div>
        )}
        {
          !mainLoading && responses && responses.items.length === 0 && (
            <div className={s.emptyPageWrapper}>
              <EmptyPageResponses tab={tab}  />
            </div>
          )
        }
      </div>
    </div>
  )
}

export default ManageResponses;
