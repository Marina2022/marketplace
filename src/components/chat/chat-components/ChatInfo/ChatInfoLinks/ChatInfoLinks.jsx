import s from './ChatInfoLinks.module.scss';
import {useSelector} from "react-redux";
import {getCurrentChat, getCurrentChatRequest} from "@/store/chatSlice.js";
import {useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {formatDateShort} from "@/utils/chat.js";
import MiniSpinnerPagination from "@/components/ui/miniSpinner/MiniSpinnerPagination/MiniSpinnerPagination.jsx";

const ChatInfoLinks = ({linkCount}) => {

  const LIMIT = 20
  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)

  const [filesData, setFilesData] = useState(null)

  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(true)
  const isLoadingRef = useRef(false)

  console.log("filesData = ", filesData)


  // первая подгрузка файлов (в т.ч. при смене заявки, чата
  useEffect(() => {
    const getFiles = async () => {
      setMainLoading(true)

      let url = `chat/links?requestId=${requestId}&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      try {
        const {data} = await axiosInstance(url)

        setFilesData(data)

      } catch (error) {
        console.log(error)
      } finally {
        setMainLoading(false)
      }
    }
    getFiles()

  }, [requestId, currentChat?.chatRoomId])

  const handleObserverReached = async () => {

    if (isLoadingRef.current || !filesData) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!filesData.meta.hasNext) return;

    try {
      isLoadingRef.current = true
      setIsOnScrollLoading(true)

      let url = `chat/links?requestId=${requestId}&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      if (filesData.meta.nextCursor) url += '&cursor=' + filesData.meta.nextCursor

      const {data} = await axiosInstance(url)

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
    <div className={s.chatLinks}>
      <div className={s.header}>
        <div className={s.headerTitle}>Ссылки · {linkCount}</div>
        {
          linkCount > 0 && <button onClick={handleDownloadAll} className={s.downloadAllBtn}>Скачать все</button>
        }
      </div>

      <ul ref={containerRef} className={`${s.filesList} scroll`}>
        {
          !mainLoading && filesData.items.map((file, index) => {
            return (
              <li key={index} className={s.linkBlock}>
                <div className={s.icon}>
                  <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M8.35436 5.12216C8.8209 5.34491 9.22717 5.67637 9.53905 6.08869C9.85092 6.50101 10.0593 6.98216 10.1467 7.49171C10.234 8.00126 10.1978 8.52434 10.0411 9.01701C9.8844 9.50967 9.61174 9.95753 9.24605 10.323L6.01529 13.5537C5.4094 14.1596 4.58764 14.5 3.73078 14.5C2.87392 14.5 2.05216 14.1596 1.44627 13.5537C0.840385 12.9478 0.5 12.1261 0.5 11.2692C0.5 10.4124 0.840385 9.5906 1.44627 8.98471L2.70771 7.72328M12.2923 7.27672L13.5537 6.01529C14.1596 5.4094 14.5 4.58764 14.5 3.73078C14.5 2.87392 14.1596 2.05216 13.5537 1.44627C12.9478 0.840385 12.1261 0.5 11.2692 0.5C10.4124 0.5 9.5906 0.840385 8.98471 1.44627L5.75395 4.67703C5.38826 5.04247 5.1156 5.49033 4.95889 5.983C4.80217 6.47566 4.76598 6.99874 4.85334 7.50829C4.94071 8.01784 5.14908 8.49899 5.46095 8.91131C5.77283 9.32364 6.1791 9.65509 6.64564 9.87784" stroke="#4B5563" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>

                <div className={s.text}>
                  <a target="_blank" className={s.link} href={file.url}>{file.url}</a>
                  <div className={s.date}>{formatDateShort(file.sentAt)}</div>
                </div>

              </li>
            )
          })
        }

        {
          filesData && (filesData.meta.hasNext) && (
            <li ref={observerRef}>
              {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
                {/*<MiniSpinnerPagination/>*/}
              </div>}
            </li>
          )}
      </ul>
    </div>
  )
}

export default ChatInfoLinks;