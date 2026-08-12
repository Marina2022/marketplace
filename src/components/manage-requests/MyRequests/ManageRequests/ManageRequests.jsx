import s from './ManageRequests.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/requests.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import RequestsTabs from "@/components/manage-requests/MyRequests/ManageRequests/RequestsTabs/RequestsTabs.jsx";
import RequestCard from "@/components/manage-requests/MyRequests/ManageRequests/RequestCard/RequestCard.jsx";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";
import EmptyPage from "@/components/manage-requests/MyRequests/ManageRequests/EmptyPage/EmptyPage.jsx";

const ManageRequests = ({setRequestDetails}) => {
  const PAGE_SIZE = 12;

  const [tab, setTab] = useState("all");
  const [requests, setRequests] = useState(null);
  const [mainLoading, setMainLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false);


  const [requestToEdit, setRequestToEdit] = useState(null);

  console.log('requests = ', requests)

  const activeProfileId = useSelector(getActiveProfileId);

  // Ссылки на элементы в DOM
  const observerRef = useRef(null);
  const containerRef = useRef(null); // Реф для самого списка ul со скроллом

  // Замок для защиты от лишних запросов во время быстрого скролла
  const isLoadingRef = useRef(false);

  // Первичная загрузка и сброс данных
  const resetRequests = async () => {
    try {
      let queryParam = "";
      if (tab !== "all") queryParam = `&tab=${tab}`;

      setMainLoading(true);
      isLoadingRef.current = true; // Закрываем замок на время загрузки

      const requestsResponse = await axiosInstance(`requests/my?page=1&pageSize=${PAGE_SIZE}${queryParam}`);

      const payload = getPreviewPayload(requestsResponse.data.items);
      const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload);
      const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures});

      setRequests(requestsWithPictures);
      setPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setMainLoading(false);
      isLoadingRef.current = false; // Открываем замок
    }
  };

  // Вызов при смене вкладок или поиске
  useEffect(() => {
    if (!activeProfileId) return;
    resetRequests();
  }, [tab, activeProfileId]);

  // Подгрузка по скроллу (вызывается из обзервера)
  const handleObserverReached = async () => {
    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !activeProfileId || !requests) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (requests.items.length >= requests.meta.totalCount) return;

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);

      let queryParam = "";
      if (tab !== "all") queryParam = `&tab=${tab}`;

      const nextPage = page + 1;
      const requestsResponse = await axiosInstance(`requests/my?page=${nextPage}&pageSize=${PAGE_SIZE}${queryParam}`);

      if (!requestsResponse.data.items || requestsResponse.data.items.length === 0) {
        return;
      }

      const payload = getPreviewPayload(requestsResponse.data.items);
      const pictures = await axiosInstance.post(`/requests/preview?profileId=${activeProfileId}`, payload);
      const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures});

      setRequests(prevRequests => ({
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
  }, [mainLoading, requests, page]);

  return (
    <div className={s.manageRequestsWrapper}>
      <div>
        <div className={s.header}>
          <div className={s.leftHeader}>
            <h1 className={s.title}>Управление заявками</h1>
            <div className={s.subtitle}>{requests && requests.tabCount.all} заявок
              {requests && requests.tabCount.active > 0 && ` · ${requests.tabCount.active} активных`}
              {requests && requests.tabCount.inProgress > 0 && ` · ${requests.tabCount.inProgress} в работе`}
              {requests && requests.tabCount.expired > 0 && ` · ${requests.tabCount.expired} истекли`}
            </div>
          </div>

          <Button onClick={() => setRequestToEdit('new')} className={s.createRequestButton}>
            <svg className={s.plusIconInBtn} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7.5 2.8125V12.1875M2.8125 7.5H12.1875" stroke="white" strokeWidth="1.59375" strokeLinecap="round"/>
            </svg>
            <span className={s.btnText}>Новая заявка</span>
          </Button>
        </div>

        <div className={s.wrapperForTabs}>
          <RequestsTabs requests={requests} setTab={setTab} tab={tab}/>
        </div>

        {mainLoading && <Spinner/>}

        {!mainLoading && requests && requests.items.length > 0 && (
          <ul ref={containerRef} className={`${s.requestsList} scroll`}>
            {requests.items.map((request) => (
              <RequestCard
                resetRequests={resetRequests}
                request={request}
                key={request.requestId}
                setRequestDetails={setRequestDetails}
                setRequestToEdit={setRequestToEdit}
              />
            ))}

            {/* Обзервер находится внутри тега <ul> как элемент списка */}
            {requests && (requests.items.length < requests.meta.totalCount) && (
              <li ref={observerRef} className={s.observerDiv} style={{ listStyleType: 'none', width: '100%', minHeight: '30px' }}>
                {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
                  {/*<MiniSpinner/>*/}
                </div>}
              </li>
            )}
          </ul>
        )}
        {
          !mainLoading && requests && requests.items.length === 0 && (
            <div className={s.emptyPageWrapper}>
              <EmptyPage tab={tab} setRequestToEdit={setRequestToEdit} />
            </div>
          )
        }

      </div>

      {requestToEdit && (
        <EditRequest
          requestToEdit={requestToEdit}
          resetRequests={resetRequests}
          setRequestToEdit={setRequestToEdit}
        />
      )}
    </div>
  );
};

export default ManageRequests;
