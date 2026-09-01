import s from './ChatContacts.module.scss';
import ChatSearch from "@/components/chat/chat-components/ChatContacts/ChatSearch/ChatSearch.jsx";
import {useMediaQuery} from "react-responsive";
import {useDispatch, useSelector} from "react-redux";
import {
  getChatError,
  getChatFilter,
  getChatProfileStatus,
  getChats,
  getChatSearch,
  getCurrentChatRequest,
  setChatError,
  setChats,
} from "@/store/chatSlice.js";
import {useEffect, useRef, useState} from "react";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import EmptyContacts from "@/components/chat/chat-components/ChatContacts/EmptyContacts/EmptyContacts.jsx";
import ContactList from "@/components/chat/chat-components/ChatContacts/ContactList/ContactList.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {getActiveProfileId} from "@/store/userSlice.js";

const ChatContacts = ({setRequestsShown}) => {

  const isMobile = useMediaQuery({maxWidth: 960})

  const contacts = useSelector(getChats)
  const chatError = useSelector(getChatError)

  const filter = useSelector(getChatFilter)
  const requestId = useSelector(getCurrentChatRequest)
  const search = useSelector(getChatSearch)
  const chatProfileStatus = useSelector(getChatProfileStatus)

  const profileId = useSelector(getActiveProfileId)


  const containerRef = useRef(null)
  const observerRef = useRef(null)
  const [isOnScrollLoading, setIsOnScrollLoading] = useState(false)
  const [mainLoading, setMainLoading] = useState(true)
  const isLoadingRef = useRef(false)

  useEffect(() => {
    if (chatError) showErrorToast("Ошибка при загрузке чатов")
  }, [chatError])

  const dispatch = useDispatch()

  console.log("contacts (chats) = ", contacts)

  const LIMIT = 20


  useEffect(() => {
    if (chatProfileStatus !== "registered") {
      // если идет переподключение к другому профилю
      if (contacts) {
        showErrorToast("В процессе подключения...")
      }

      // если первая подгрузка чатов - то просто выход
      return
    }

    const resetChats = async () => {

      try {
        let requestUrl = `chat?limit=${LIMIT}`

        if (filter) requestUrl += `&filter=${filter}`
        if (requestId) requestUrl += `&requestId=${requestId}`
        if (search) requestUrl += `&searchContacts=${search}`

        setMainLoading(true)
        const chatsResponse = await axiosInstance(requestUrl);
        dispatch(setChats(chatsResponse.data));
      } catch (error) {
        console.error("Ошибка загрузки чатов:", error);
        dispatch(setChatError(true));
      } finally {
        setMainLoading(false)
      }
    }

    resetChats()

  }, [filter, requestId, search, chatProfileStatus])

  // скролл в начало при смене фильтра
  useEffect(() => {
    if (!containerRef.current) return;

    containerRef.current.scrollTop = 0;
  }, [filter, profileId, search]);

  const handleObserverReached = async () => {
    // Если уже что-то загружается — мгновенно выходим (защита от спама скроллом)
    if (isLoadingRef.current || !profileId || !contacts) return;

    // Проверяем, не загрузили ли мы уже абсолютно все элементы
    if (!contacts.meta.hasNext) return;

    try {
      isLoadingRef.current = true; // Закрываем замок
      setIsOnScrollLoading(true);
      let requestUrl = `chat?limit=${LIMIT}`

      if (filter) requestUrl += `&filter=${filter}`
      if (requestId) requestUrl += `&requestId=${requestId}`
      if (search) requestUrl += `&searchContacts=${search}`

      if (contacts.meta.nextCursor) requestUrl = requestUrl + '&cursor=' + contacts.meta.nextCursor

      const chatsResponse = await axiosInstance(requestUrl)

      if (!chatsResponse.data.items || chatsResponse.data.items.length === 0) {
        return;
      }

      dispatch(setChats({
        ...contacts,
        items: [...contacts.items, ...chatsResponse.data.items],
        meta: chatsResponse.data.meta
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
  }, [mainLoading, contacts]);


  return (
    <div className={s.chatContacts}>
      <div className={s.contactsHeaderPart}>
        <ChatSearch/>

        {
          !isMobile && <button className={s.filterBtnDesktop}>
            <svg width="15" height="10" viewBox="0 0 15 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.83333 10H9.16667V8.33333H5.83333V10ZM0 0V1.66667H15V0H0ZM2.5 5.83333H12.5V4.16667H2.5V5.83333Z"
                    fill="#565C68"/>
            </svg>
          </button>
        }

        {
          isMobile && <button className={s.filterBtnMobile} onClick={() => setRequestsShown(prev => !prev)}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.3151 0.648438V16.6484M14.8707 0.648438H2.42622C1.44437 0.648438 0.648437 1.44438 0.648437 2.42622V14.8707C0.648437 15.8525 1.44437 16.6484 2.42622 16.6484H14.8707C15.8525 16.6484 16.6484 15.8525 16.6484 14.8707V2.42622C16.6484 1.44438 15.8525 0.648438 14.8707 0.648438Z"
                stroke="#565C68" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        }
      </div>

      {
        !contacts && mainLoading && <div className={s.spinnerWrapper}><MiniSpinner black/></div>
      }

      {
        contacts && contacts.items.length === 0 && <EmptyContacts/>
      }

      {
        contacts && contacts.items.length > 0 && <ContactList
          contacts={contacts}
          observerRef={observerRef}
          isOnScrollLoading={isOnScrollLoading}
          containerRef={containerRef}
        />
      }

    </div>
  )
}

export default ChatContacts;