import {getChatFilter} from "@/store/chatSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";
import ChatRequestsList from "@/components/chat/chat-components/ChatFilters/ChatRequestsList/ChatRequestsList.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import EmptyRequests from "@/components/chat/chat-components/ChatFilters/EmptyRequests/EmptyRequests.jsx";
import {getActiveProfileId} from "@/store/userSlice.js";
import ChatFilterDropdown
  from "@/components/chat/chat-components/ChatFilters/ChatFilterDropdown/ChatFilterDropdown.jsx";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/requests.js";

const ChatFilters = () => {

  const currentFilterValue = useSelector(getChatFilter)
  const [requests, setRequests] = useState(null)
  const profileId = useSelector(getActiveProfileId)

  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(true)
  const isLoadingRef = useRef(false)

  const LIMIT = 20

  // первая подгрузка заявок и подгрузка заново при смене фильтра
  useEffect(() => {
    const loadRequests = async () => {
      try {
        setMainLoading(true)
        const requestsResponse = await axiosInstance(`messenger/requests?filter=${currentFilterValue}&limit=${LIMIT}`)

        const payload = getPreviewPayload(requestsResponse.data.items)
        const pictures = await axiosInstance.post(`/requests/preview`, payload)
        const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures})

        setRequests(requestsWithPictures);

      } catch (err) {
        console.log(err);
      } finally {
        setMainLoading(false)
      }
    }
    loadRequests()
  }, [currentFilterValue, profileId])


  // скролл в начало при смене фильтра
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = 0;
  }, [currentFilterValue, profileId]);

  const handleObserverReached = async () => {
    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !profileId || !requests) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!requests.meta.hasNext) return;

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);


      let url = `messenger/requests?filter=${currentFilterValue}&limit=${LIMIT}`
      if (requests.meta.nextCursor) url = url + '&cursor=' + requests.meta.nextCursor

      const requestsResponse = await axiosInstance(url)

      if (!requestsResponse.data.items || requestsResponse.data.items.length === 0) {
        return;
      }

      const payload = getPreviewPayload(requestsResponse.data.items)
      const pictures = await axiosInstance.post(`/requests/preview`, payload)

      const requestsWithPictures = getRequestsWithPictures({requests: requestsResponse, pictures})

      setRequests(prevRequests => ({
        ...prevRequests,
        items: [...prevRequests.items, ...requestsWithPictures.items],
        meta: requestsResponse.data.meta
      }))
    } catch (err) {
      console.log(err);
    } finally {
      setIsOnScrollLoading(false);
      isLoadingRef.current = false; // Открываем замок после завершения рендера данных
    }
  }

  // Инициализация обзервера
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
  }, [mainLoading, requests]);


  return (
    <div>
      <ChatFilterDropdown currentFilterValue={currentFilterValue}/>
      {
        requests && requests.items.length === 0 && <EmptyRequests/>
      }
      {
        requests && requests.items.length > 0 && <ChatRequestsList
          requests={requests}
          containerRef={containerRef}
          observerRef={observerRef}
          isOnScrollLoading={isOnScrollLoading}
        />
      }
    </div>
  )
}

export default ChatFilters;