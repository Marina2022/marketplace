import s from './ChatInfoFiles.module.scss';
import {useEffect, useRef, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentChat, getCurrentChatRequest, getMessagesData, setChats} from "@/store/chatSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {normalizeFilesResponse} from "@/utils/chat.js";
import ChatInfoFile from "@/components/chat/chat-components/ChatInfo/ChatInfoFiles/ChatInfoFile/ChatInfoFile.jsx";
import MiniSpinnerPagination from "@/components/ui/miniSpinner/MiniSpinnerPagination/MiniSpinnerPagination.jsx";

const ChatInfoFiles = ({fileCount, fileUrlCache}) => {

  const LIMIT = 20

  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)
  const [filesData, setFilesData] = useState(null)

  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(true)
  const isLoadingRef = useRef(false)


  const getFiles = async () => {
    setMainLoading(true)

    let url = `chat/files?requestId=${requestId}&limit=${LIMIT}`
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

      setFilesData(data)

    } catch (error) {
      console.log(error)
    } finally {
      setMainLoading(false)
    }
  }

  // первая подгрузка файлов (в т.ч. при смене заявки, чата
  useEffect(() => {
    getFiles()
  }, [requestId, currentChat?.chatRoomId])

  const messagesData = useSelector(getMessagesData)
  const lastMessage = messagesData?.messages[0]

  // подгрузка при отправке новых файлов
  useEffect(() => {

    if (!lastMessage) return
    if (lastMessage.attachments[0]?.fileLoading) return
    if (!lastMessage.attachments.length) return

    const hasFiles =  lastMessage.attachments.some(a =>
      a.type === "Document"
    )

    if (!hasFiles) return

    getFiles()
  }, [lastMessage])


  const handleObserverReached = async () => {

    if (isLoadingRef.current || !filesData) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!filesData.meta.hasNext) return;

    try {
      isLoadingRef.current = true
      setIsOnScrollLoading(true)

      let url = `chat/files?requestId=${requestId}&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      if (filesData.meta.nextCursor) url += '&cursor=' + filesData.meta.nextCursor

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

      setFilesData(prev => (
        {
          meta: data.meta,
          items: [...prev.items, ...data.items]
        }
      ))

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
        rootMargin: '0px 0px 20px 0px', // Начнет загрузку за 150px до конца списка
        threshold: 0
      }
    )

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    }
  }, [mainLoading, filesData]);

  // скролл в начало при смене чата
  useEffect(() => {
    if (!containerRef.current) return

    containerRef.current.scrollTop = 0;
  }, [requestId, currentChat?.chatRoomId])

  const handleDownloadAll = async () => {
    console.log("Получаем архив с api и скачиваем")
  }

  return (
    <div className={s.wrapper}>
      <div className={s.header}>
        <div className={s.headerTitle}>Документы · {fileCount}</div>
        {
          fileCount > 0 && <button onClick={handleDownloadAll} className={s.downloadAllBtn}>Скачать все</button>
        }
      </div>

      <ul ref={containerRef} className={`${s.filesList} scroll`}>
        {
          !mainLoading && filesData.items.map((file, index) => <ChatInfoFile
            file={file}
            key={index}
            fileUrlCache={fileUrlCache}
          />)
        }

        {
          filesData && (filesData.meta.hasNext) && (
            <li ref={observerRef} >
              {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
                <MiniSpinnerPagination/>
              </div>}
            </li>
          )}
      </ul>
    </div>
  )
}

export default ChatInfoFiles;