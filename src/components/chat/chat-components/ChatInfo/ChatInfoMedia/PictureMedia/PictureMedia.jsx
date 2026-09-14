import s from './PictureMedia.module.scss';
import {useSelector} from "react-redux";
import {getCurrentChat, getCurrentChatRequest} from "@/store/chatSlice.js";
import {useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {normalizeFilesResponse} from "@/utils/chat.js";
import ChatInfoPicture
  from "@/components/chat/chat-components/ChatInfo/ChatInfoMedia/PictureMedia/ChatInfoPicture/ChatInfoPicture.jsx";

const PictureMedia = ({tabCounts, fileUrlCache}) => {

  const LIMIT = 20

  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)

  const [picturesData, setPicturesData] = useState(null)

  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const [mainLoading, setMainLoading] = useState(true)
  const isLoadingRef = useRef(false)


  // первая подгрузка файлов (в т.ч. при смене заявки, чата
  useEffect(() => {
    const getPictures = async () => {
      setMainLoading(true)

      let url = `chat/media?requestId=${requestId}&mediaType=image&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      try {
        const {data} = await axiosInstance(url)

        const items = data.items || []
        const now = Date.now()

        const mediaFileIds = items.map(item => item.mediaFileId)

        //  фильтруем только нужные
        const idsToFetch = mediaFileIds.filter((id) => {
          if (!id) return false
          const cached = fileUrlCache.current[id]
          return !cached || new Date(cached.expiresAt).getTime() <= now
        })

        // запрашиваем только недостающие
        if (idsToFetch.length > 0) {
          const {data: filesResponse} = await axiosInstance.post(`chat/files/urls`, {
            mediaFileIds: idsToFetch,
            ttlSeconds: 600
          })

          const normalized = normalizeFilesResponse(filesResponse)
          Object.assign(fileUrlCache.current, normalized)
        }

        setPicturesData(data)

      } catch (error) {
        console.log(error)
      } finally {
        setMainLoading(false)
      }
    }
    getPictures()

  }, [requestId, currentChat?.chatRoomId])

  const handleObserverReached = async () => {

    if (isLoadingRef.current || !picturesData) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!picturesData.meta.hasNext) return;

    try {
      isLoadingRef.current = true

      let url = `chat/media?requestId=${requestId}&mediaType=image&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      if (picturesData.meta.nextCursor) url += '&cursor=' + picturesData.meta.nextCursor

      const {data} = await axiosInstance(url)

      const items = data.items || []
      const now = Date.now()

      const mediaFileIds = items.map(item => item.mediaFileId)

      //  фильтруем только нужные
      const idsToFetch = mediaFileIds.filter((id) => {
        if (!id) return false
        const cached = fileUrlCache.current[id]
        return !cached || new Date(cached.expiresAt).getTime() <= now
      })

      // запрашиваем только недостающие
      if (idsToFetch.length > 0) {
        const {data: filesResponse} = await axiosInstance.post(`chat/files/urls`, {
          mediaFileIds: idsToFetch,
          ttlSeconds: 600
        })

        const normalized = normalizeFilesResponse(filesResponse)
        Object.assign(fileUrlCache.current, normalized)
      }

      setPicturesData(prev => (
        {
          meta: data.meta,
          items: [...prev.items, ...data.items]
        }
      ))

    } catch (err) {
      console.log(err);
    } finally {
      isLoadingRef.current = false;
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
        rootMargin: '0px 0px 20px 0px', // Начнет загрузку за 150px до конца списка
        threshold: 0
      }
    )

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    }
  }, [mainLoading, picturesData]);


  // скролл в начало при смене чата
  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.scrollTop = 0;
  }, [requestId, currentChat?.chatRoomId])


  const handleDownloadAll = async () => {
    console.log("Получаем архив с api и скачиваем")
  }

  return (
    <div className={s.pictureMedia}>

      <div className={s.header}>
        <div className={s.headerTitle}>Изображения · {tabCounts?.images}</div>
        {
          tabCounts?.images > 0 && <button onClick={handleDownloadAll} className={s.downloadAllBtn}>Скачать все</button>
        }
      </div>
      <ul ref={containerRef} className={`${s.pictureList} scroll`}>
        {
          !mainLoading && picturesData.items.map((picture, index) => <ChatInfoPicture
            picture={picture}
            key={index}
            fileUrlCache={fileUrlCache}
          />)
        }
        <li ref={observerRef}></li>
      </ul>
    </div>
  )
}

export default PictureMedia;