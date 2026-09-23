import s from './RequestsHistory.module.scss';
import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import {
  formatCancelled,
  formatCompleted,
  formatRecords,
  getPreviewPayload,
  getRequestsWithPictures
} from "@/utils/requests.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import RequestHistoryTabs
  from "@/components/manage-requests/MyRequests/RequestsHistory/RequestHistoryTabs/RequestHistoryTabs.jsx";
import RequestsHistoryCard
  from "@/components/manage-requests/MyRequests/RequestsHistory/RequestsHistoryCard/RequestsHistoryCard.jsx";
import EmptyHistoryPage
  from "@/components/manage-requests/MyRequests/RequestsHistory/EmptyHistoryPage/EmptyHistoryPage.jsx";

const RequestsHistory = ({setShowHistoryPage}) => {

  const PAGE_SIZE = 12;

  const [requests, setRequests] = useState(null);

  const [mainLoading, setMainLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false);

  const activeProfileId = useSelector(getActiveProfileId)

  const observerRef = useRef(null);
  const containerRef = useRef(null); // Реф для самого списка ul со скроллом

  const isLoadingRef = useRef(false);
  const [status, setStatus] = useState(null)
  const [year, setYear] = useState(null)


  // Первичная загрузка данных
  const resetRequests = async () => {
    try {

      setMainLoading(true);
      isLoadingRef.current = true; // Закрываем замок на время загрузки

      let filterString = ``
      if (status) filterString += `&status=${status}`
      if (year) filterString += `&year=${year}`

      const requestsResponse = await axiosInstance(`requests/history?page=1&pageSize=${PAGE_SIZE}${filterString}`);

      const payload = getPreviewPayload(requestsResponse.data.items)
      const pictures = await axiosInstance.post(`/requests/preview`, payload)
      const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures})

      setRequests(requestsWithPictures);
      setPage(1);


    } catch (err) {
      console.log(err);
    } finally {
      setMainLoading(false);
      isLoadingRef.current = false; // Открываем замок
    }
  };

  // Вызов при смене вкладок или профиля
  useEffect(() => {
    if (!activeProfileId) return;
    resetRequests();
  }, [status, year, activeProfileId]);


  // Подгрузка по скроллу (вызывается из обзервера)
  const handleObserverReached = async () => {
    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !activeProfileId || !requests) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (requests.items.length >= requests.meta.totalCount) return;

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);

      let filterString = ``

      if (status) filterString += `&status=${status}`
      if (year) filterString += `&year=${year}`


      const nextPage = page + 1;
      const requestsResponse = await axiosInstance(`requests/history?page=${nextPage}&pageSize=${PAGE_SIZE}${filterString}`);

      if (!requestsResponse.data.items || requestsResponse.data.items.length === 0) {
        return;
      }

      const payload = getPreviewPayload(requestsResponse.data.items);
      const pictures = await axiosInstance.post(`/requests/preview`, payload);
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
  }

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
      <MobileHeaderLk/>
      <div>
        <div className={s.header}>
          <div className={s.leftHeader}>
            <h1 className={s.title}>История заявок</h1>
            <div className={s.subtitle}>
              {
                requests && requests.items.length === 0 && "Нет записей · завершённые заявки и отклики появятся здесь"
              }
              {requests && requests.stats.total > 0 && formatRecords(requests.stats.total)}
              {requests && requests.stats.completedCount > 0 && ` · ${formatCompleted(requests.stats.completedCount)} `}
              {requests && requests.stats.cancelledCount > 0 && ` · ${formatCancelled(requests.stats.cancelledCount)} `}
            </div>
          </div>
        </div>

        <div className={s.wrapperForTabs}>
          <RequestHistoryTabs
            setShowHistoryPage={setShowHistoryPage}
            status={status}
            setStatus={setStatus}
            year={year}
            setYear={setYear}
          />
        </div>

        {mainLoading && <Spinner/>}

        {!mainLoading && requests && requests.items.length > 0 && (
          <ul ref={containerRef} className={`${s.requestsList} scroll`}>
            {requests.items.map((request) => <RequestsHistoryCard request={request} key={request.requestId}/>
            )}

            {requests && (requests.items.length < requests.meta.totalCount) && (
              <li ref={observerRef} className={s.observerDiv}
                  style={{listStyleType: 'none', width: '100%', minHeight: '30px'}}>
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
              <EmptyHistoryPage resetRequests={resetRequests}/>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RequestsHistory;