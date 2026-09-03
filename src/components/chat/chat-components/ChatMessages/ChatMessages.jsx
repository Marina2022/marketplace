import s from "./ChatMessages.module.scss"
import {useSelector} from "react-redux";
import {getCurrentChat} from "@/store/chatSlice.js";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import ChatHeader from "@/components/chat/chat-components/ChatMessages/ChatHeader/ChatHeader.jsx";
import MessageField from "@/components/chat/chat-components/ChatMessages/MessageField/MessageField.jsx";
import EmptyChatMessages from "@/components/chat/chat-components/ChatMessages/EmptyChatMessages/EmptyChatMessages.jsx";
import {getChatConnection} from "@/services/chatConnection.js";
import MessagesList from "@/components/chat/chat-components/ChatMessages/MessagesList/MessagesList.jsx";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import {normalizeFilesResponse} from "@/utils/chat.js";

const ChatMessages = () => {

  const currentChat = useSelector(getCurrentChat)
  const [messagesData, setMessagesData] = useState(null)
  const [messagesLoading, setMessagesLoading] = useState(true)
  const [inputMessage, setInputMessage] = useState("")

  const fileUrlCache = useRef({})

  const LIMIT = 7 // TODO 30 вроде должно быть

  console.log("messagesData = ", messagesData)

  const chatContainerRef = useRef(null)
  const observerRef = useRef(null)
  const isLoadingRef = useRef(false)

  const prevScrollHeightRef = useRef(null)


  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)
  // первоначальная загрузка сообщений
  useEffect(() => {

    if (!currentChat?.chatRoomId) return
    const connection = getChatConnection()

    const getMessages = async () => {
      try {
        setMessagesLoading(true)
        await connection.invoke("JoinChat", currentChat.chatRoomId)

        const response = await axiosInstance(`chat/${currentChat.chatRoomId}/messages?LIMIT=${LIMIT}`);
        setMessagesData(response.data)

        let mediaFields = []
        if (response.data.messages.length > 0) {
          response.data.messages.forEach((message) => {
            if (message.attachments.length > 0) {
              message.attachments.forEach((attachment) => {
                if (!mediaFields.includes(attachment.mediaFileId)) mediaFields.push(attachment.mediaFileId)
              })
            }
          })
        }

        if (mediaFields.length > 0) {
          const response = await axiosInstance.post(`chat/files/urls`, {
            mediaFileIds: mediaFields,
            ttlSeconds: 600
          })
          const normalized = normalizeFilesResponse(response.data)
          Object.assign(fileUrlCache.current, normalized)
        }

      } catch (error) {
        console.log("Ошибка загрузки сообщений:", error);
        showErrorToast("Ошибка загрузки сообщений")
      } finally {
        setMessagesLoading(false)
      }
    }

    getMessages()

    const el = chatContainerRef.current
    if (!el || !messagesData) return

    el.scrollTop = el.scrollHeight
  }, [currentChat])

  const handleObserverReached = async () => {

    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !messagesData) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!messagesData.meta.hasNext) return;

    prevScrollHeightRef.current = chatContainerRef.current.scrollHeight

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);

      const response = await axiosInstance(`chat/${currentChat.chatRoomId}/messages?LIMIT=${LIMIT}&cursor=${messagesData.meta.nextCursor}`);

      setMessagesData(prevMessagesData => (
          {
            meta: response.data.meta,
            messages: [...prevMessagesData.messages, ...response.data.messages]
          }
        )
      )

      let mediaFields = []
      if (response.data.messages.length > 0) {
        response.data.messages.forEach((message) => {
          if (message.attachments.length > 0) {
            message.attachments.forEach((attachment) => {
              if (!mediaFields.includes(attachment.mediaFileId)) mediaFields.push(attachment.mediaFileId)
            })
          }
        })
      }

      if (mediaFields.length > 0) {
        const response = await axiosInstance.post(`chat/files/urls`, {
          mediaFileIds: mediaFields,
          ttlSeconds: 600
        })
        const normalized = normalizeFilesResponse(response.data)
        Object.assign(fileUrlCache.current, normalized)
      }

    } catch (err) {
      console.log(err);
    } finally {
      setIsOnScrollLoading(false);
      isLoadingRef.current = false; // Открываем замок после завершения рендера данных
    }
  }

  //Инициализация обзервера
  useEffect(() => {
    // Если идет базовая загрузка или элементов еще нет на экране — обзервер не создаем
    if (messagesLoading || !observerRef.current || !chatContainerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        // Срабатывает строго при видимости элемента и открытом замке
        if (entry.isIntersecting && !isLoadingRef.current) {
          handleObserverReached();
        }
      },
      {
        root: chatContainerRef.current, // Привязываем слежку к нашему блоку ul со скроллом
        rootMargin: '10px 0px 0px 0px', // Начнет загрузку за 150px до конца списка
        threshold: 0
      }
    );

    observer.observe(observerRef.current);

    return () => {
      observer.disconnect();
    };
    // Массив зависимостей обновляет обзервер, спасая от старых замыканий флагов
  }, [messagesLoading, messagesData]);


  // 1. Флаг для отслеживания самого первого открытия чата
  const isFirstLoadRef = useRef(true);

// Эффект А: Сбрасываем флаг при смене чата
  useEffect(() => {
    isFirstLoadRef.current = true;
  }, [currentChat]);

// Эффект Б: Срабатывает СТРОГО в момент, когда сообщения добавились в DOM
  useLayoutEffect(() => {
    const el = chatContainerRef.current;
    if (!el || messagesLoading || !messagesData) return;

    // Сценарий 1: Самая первая загрузка чата — просто падаем в самый вниз
    if (isFirstLoadRef.current) {
      el.scrollTop = el.scrollHeight;
      isFirstLoadRef.current = false; // Выключаем режим первой загрузки
      return;
    }

    // Сценарий 2: Подгрузка истории по скроллу вверх
    if (prevScrollHeightRef.current) {
      const currentScrollHeight = el.scrollHeight;

      // Вычисляем, на сколько увеличился контейнер после добавления старых сообщений
      const heightDifference = currentScrollHeight - prevScrollHeightRef.current;

      // Корректируем позицию скролла на эту разницу
      el.scrollTop += heightDifference;

      // Очищаем реф до следующей подгрузки
      prevScrollHeightRef.current = null;
    }
    // }, [messagesData, messagesLoading]);
  }, [messagesData, messagesLoading]);


  const [files, setFiles] = useState([])  // для теста делала, будет null потом наверное

  if (!currentChat) return <EmptyChatMessages/>

  return (
    <div className={s.chatWrapper}>
      <ChatHeader/>

      <div ref={chatContainerRef} className={`${s.chatContainer}  scroll`}>
        <MessagesList
          messagesData={messagesData}
          messagesLoading={messagesLoading}
          fileUrlCache={fileUrlCache}
          chatContainerRef={chatContainerRef}
          observerRef={observerRef}
        />
      </div>

      <div className={s.bottomPart}>
        {
          files.length > 0 && (
            <div className={s.filesBlock}>
              <button onClick={() => setFiles([])}>Убрать все</button>
            </div>
          )
        }

        <div className={s.sendingPart}>
          <button className={s.pinBtn}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.9544 8.92395C11.1148 9.09988 11.1156 9.38551 10.9561 9.56245C10.7963 9.7391 10.5368 9.73996 10.3763 9.56417L7.07122 5.95239C7.06692 5.94766 7.06275 5.94293 7.05859 5.93791L7.05833 5.93819C6.55338 5.33238 5.99961 5.17695 5.56928 5.30672C5.41394 5.3536 5.27423 5.43763 5.15977 5.55005C5.0478 5.66017 4.95938 5.79968 4.90379 5.96042C4.75913 6.37868 4.84702 6.94549 5.32201 7.53366L11.3347 14.155C11.3429 14.164 11.3506 14.1732 11.3579 14.1827C12.1453 15.0704 13.0822 15.2528 13.832 14.9772C14.1205 14.8714 14.3816 14.6983 14.5952 14.4727C14.8077 14.2485 14.9734 13.9729 15.0728 13.6606C15.3363 12.8317 15.1377 11.7246 14.1304 10.573L14.13 10.5728C13.2066 9.55256 12.3378 8.50655 11.4795 7.47287C9.78135 5.42817 8.12459 3.43336 6.03607 1.66325C5.23516 0.984885 4.23543 0.78443 3.32281 0.964811C2.92398 1.04353 2.54274 1.1948 2.20316 1.41017C1.86931 1.62195 1.5753 1.89683 1.3447 2.22662C0.924392 2.82813 0.717492 3.62077 0.869835 4.55594C1.12543 6.12531 1.93272 7.01274 2.90537 8.08212C3.00484 8.19138 3.10601 8.30251 3.20784 8.41593L6.30482 11.8592L7.35246 13.024C7.5121 13.2009 7.51132 13.4867 7.35077 13.6625C7.19036 13.8384 6.93072 13.8375 6.77109 13.6607L5.72357 12.4957L2.62646 9.05256C2.52516 8.93972 2.42529 8.83017 2.32724 8.72234C1.25499 7.54341 0.365021 6.56508 0.0637215 4.7151C-0.133543 3.50463 0.141065 2.46866 0.695878 1.67486C0.991709 1.25144 1.36814 0.899283 1.79522 0.628424C2.2167 0.361151 2.68753 0.173887 3.17828 0.0769573C4.30405 -0.145436 5.54102 0.104918 6.53711 0.949038C8.67511 2.76102 10.3583 4.78766 12.0834 6.86462C12.9246 7.87751 13.776 8.90258 14.712 9.93683C14.7152 9.94013 14.7184 9.94357 14.7214 9.94716C15.9783 11.3839 16.2041 12.8345 15.8471 13.9576C15.7034 14.4089 15.4665 14.8041 15.1639 15.1237C14.8626 15.4416 14.496 15.6849 14.0924 15.8333C13.0683 16.2097 11.8063 15.9809 10.7716 14.8137C10.7655 14.8078 10.7595 14.8017 10.7536 14.7952L4.73933 8.17231L4.73973 8.17202C4.73465 8.16643 4.7297 8.16055 4.72488 8.15467C4.00145 7.27127 3.88934 6.35258 4.13621 5.63866C4.23817 5.344 4.40314 5.08533 4.61381 4.87813C4.82215 4.67338 5.07462 4.52124 5.35417 4.43679C6.05404 4.22558 6.92005 4.43722 7.66093 5.32493L10.9544 8.92395Z"
                fill="#6B7280"/>
            </svg>
          </button>
          <div className={s.inputBlock}>
            <MessageField message={inputMessage} setMessage={setInputMessage}/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ChatMessages;