import s from './ChatMenu.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getChats, getCurrentChat, setChats, setCurrentChat} from "@/store/chatSlice.js";
import {useEffect, useRef, useState} from "react";
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";

const ChatMenu = () => {

  const currentChat = useSelector(getCurrentChat)
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);

  useEffect(() => {
    if (!menuOpen) return;

    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setMenuOpen(false);
      }
    };

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, [menuOpen]);

  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()
  const chats = useSelector(getChats)

  const handleOpenRequest = () => {

    const url = `/request/${currentChat.requestInfo.requestNumber}/${currentChat.requestInfo.requestId}`
    const isInTabs = tabs.find((tab) => tab === url)


    navigate(url, {
      state: {fromApp: true}
    })

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
    setMenuOpen(false);
  }


  const [pinning, setPinning] = useState(false)

  const handlePin = async () => {
    if (pinning) return
    try {
      setPinning(true)
      await axiosInstance.post(`/responses/chat-links/${currentChat.requestInfo.chatLinkId}/pin`)

      const updatedChatItems = chats.items.map(chat => {
        if (chat.chatRoomId === currentChat.chatRoomId) {
          return {...chat, isPinned: true}
        }
        return chat
      })
      setMenuOpen(false)

      const sortedChats = updatedChatItems.sort(
        (a, b) => Number(b.isPinned) - Number(a.isPinned)
      )
      dispatch(setChats({items: sortedChats, meta: chats.meta}))
      dispatch(setCurrentChat({...currentChat, isPinned: true}))


    } catch (err) {
      console.log("err =", err)
      if (err.response && err.response.data.errors.length > 0) {
        showErrorToast(err.response?.data?.errors[0].message)
      }
      console.log(err.message)
    } finally {
      setPinning(false)
    }
  }

  const handleUnPin = async () => {
    if (pinning) return
    try {
      setPinning(true)
      await axiosInstance.post(`/responses/chat-links/${currentChat.requestInfo.chatLinkId}/unpin`)

      const updatedChatItems = chats.items.map(chat => {
        if (chat.chatRoomId === currentChat.chatRoomId) {
          return {...chat, isPinned: false}
        }
        return chat
      })

      setMenuOpen(false)

      const sortedChats = updatedChatItems.sort(
        (a, b) => Number(b.isPinned) - Number(a.isPinned)
      )
      dispatch(setChats({items: sortedChats, meta: chats.meta}))
      dispatch(setCurrentChat({...currentChat, isPinned: true}))

    } catch (err) {
      console.log("err =", err)
      if (err.response?.data?.errors?.length > 0) {
        showErrorToast(err.response.data?.errors[0].message)
      }

    } finally {
      setPinning(false)
    }
  }

  return (
    <div className={s.menuBtnWrapper} ref={menuRef}>
      <button className={s.btn} onClick={() => setMenuOpen(prev => !prev)}>
        <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M1.53471 3.05682C1.11284 3.05682 0.750621 2.90767 0.448065 2.60938C0.149769 2.30682 0.000621498 1.9446 0.000621498 1.52273C0.000621498 1.10511 0.149769 0.747159 0.448065 0.448864C0.750621 0.150568 1.11284 0.00142026 1.53471 0.00142026C1.9438 0.00142026 2.30176 0.150568 2.60858 0.448864C2.91539 0.747159 3.0688 1.10511 3.0688 1.52273C3.0688 1.80398 2.99636 2.06179 2.85147 2.29616C2.71085 2.52628 2.52548 2.71165 2.29537 2.85227C2.06525 2.98864 1.8117 3.05682 1.53471 3.05682ZM6.89604 3.05682C6.47417 3.05682 6.11195 2.90767 5.80939 2.60938C5.5111 2.30682 5.36195 1.9446 5.36195 1.52273C5.36195 1.10511 5.5111 0.747159 5.80939 0.448864C6.11195 0.150568 6.47417 0.00142026 6.89604 0.00142026C7.30513 0.00142026 7.66309 0.150568 7.9699 0.448864C8.27672 0.747159 8.43013 1.10511 8.43013 1.52273C8.43013 1.80398 8.35769 2.06179 8.2128 2.29616C8.07218 2.52628 7.88681 2.71165 7.65669 2.85227C7.42658 2.98864 7.17303 3.05682 6.89604 3.05682ZM12.2574 3.05682C11.8355 3.05682 11.4733 2.90767 11.1707 2.60938C10.8724 2.30682 10.7233 1.9446 10.7233 1.52273C10.7233 1.10511 10.8724 0.747159 11.1707 0.448864C11.4733 0.150568 11.8355 0.00142026 12.2574 0.00142026C12.6665 0.00142026 13.0244 0.150568 13.3312 0.448864C13.6381 0.747159 13.7915 1.10511 13.7915 1.52273C13.7915 1.80398 13.719 2.06179 13.5741 2.29616C13.4335 2.52628 13.2481 2.71165 13.018 2.85227C12.7879 2.98864 12.5344 3.05682 12.2574 3.05682Z"
            fill="#3D4A66"/>
        </svg>
      </button>

      {
        menuOpen && (
          <ul className={s.menuList}>
            <li className={s.menuItem} onClick={handleOpenRequest}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.91016 2.61719H9.98288L13.9102 6.54446V15.3808H4.91016V2.61719Z" stroke="#3D4A66"
                      strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.81641 2.61719V6.54446H13.9073" stroke="#3D4A66" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Открыть заявку</span>
            </li>

            {
              currentChat.isPinned && (
                <li className={s.menuItem} onClick={handleUnPin}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4.91016 2.61719H9.98288L13.9102 6.54446V15.3808H4.91016V2.61719Z" stroke="black"
                          strokeWidth="1.30909" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M9.81641 2.61719V6.54446H13.9073" stroke="black" strokeWidth="1.30909" strokeLinecap="round"
                          strokeLinejoin="round"/>
                  </svg>
                  <span>Открепить чат</span>
                </li>
              )
            }

            {
              !currentChat.isPinned && (
                <li className={s.menuItem} onClick={handlePin}>
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M4.26324 4.07311C4.22271 4.02744 4.1735 3.99026 4.11849 3.96374C4.06347 3.93721 4.00373 3.92186 3.94274 3.91858C3.88174 3.91531 3.82071 3.92416 3.76316 3.94463C3.70561 3.9651 3.6527 3.99679 3.6075 4.03785C3.5623 4.07891 3.52569 4.12853 3.49982 4.18383C3.47394 4.23914 3.4593 4.29902 3.45675 4.36002C3.4542 4.42102 3.46379 4.48192 3.48496 4.53919C3.50613 4.59646 3.53847 4.64896 3.58009 4.69364L5.03929 6.29804C4.41644 6.43734 3.83562 6.72257 3.34468 7.13022C3.24366 7.21141 3.16088 7.31295 3.10173 7.42823C3.04258 7.54352 3.00838 7.66996 3.00136 7.79933C2.99433 7.9287 3.01465 8.0581 3.06098 8.1791C3.1073 8.3001 3.17861 8.41 3.27024 8.50163L6.05652 11.2871L3.59509 13.7456C3.50848 13.8322 3.45982 13.9496 3.45982 14.072C3.45982 14.1945 3.50848 14.3119 3.59509 14.3984C3.6817 14.485 3.79917 14.5336 3.92166 14.5336C4.04415 14.5336 4.16163 14.485 4.24824 14.3984L6.70794 11.9382L9.49422 14.7231C9.57988 14.8091 9.68166 14.8773 9.79374 14.924C9.90581 14.9706 10.026 14.9946 10.1474 14.9948C10.1693 14.9948 10.1906 14.9948 10.2126 14.9948C10.3442 14.9856 10.4723 14.9483 10.5882 14.8853C10.704 14.8223 10.805 14.7352 10.8842 14.6297C11.1569 14.2708 11.3815 13.8778 11.5523 13.4607L12.8125 14.8448C12.853 14.8905 12.9022 14.9277 12.9572 14.9542C13.0123 14.9807 13.072 14.9961 13.133 14.9993C13.194 15.0026 13.255 14.9938 13.3126 14.9733C13.3701 14.9528 13.423 14.9211 13.4682 14.8801C13.5134 14.839 13.55 14.7894 13.5759 14.7341C13.6018 14.6788 13.6164 14.6189 13.619 14.5579C13.6215 14.4969 13.6119 14.436 13.5908 14.3787C13.5696 14.3215 13.5373 14.269 13.4956 14.2243L4.26324 4.07311ZM10.1474 14.072L3.92166 7.84822C4.51192 7.37244 5.14488 7.13541 5.80611 7.1406L10.8351 12.6701C10.7065 13.2393 10.3978 13.7393 10.1474 14.072ZM14.7298 8.07429L12.1541 10.6574C12.1113 10.7003 12.0605 10.7343 12.0045 10.7576C11.9485 10.7808 11.8885 10.7929 11.8279 10.7929C11.7673 10.793 11.7072 10.7812 11.6512 10.758C11.5951 10.7349 11.5442 10.701 11.5013 10.6582C11.4584 10.6154 11.4243 10.5646 11.401 10.5087C11.3777 10.4527 11.3657 10.3927 11.3656 10.3321C11.3656 10.2715 11.3774 10.2115 11.4005 10.1555C11.4237 10.0995 11.4576 10.0486 11.5004 10.0057L14.0767 7.42261L10.5755 3.92201L8.19715 6.30669C8.11003 6.38972 7.9939 6.43545 7.87353 6.43413C7.75316 6.4328 7.63806 6.38453 7.55279 6.2996C7.46752 6.21467 7.41882 6.09981 7.41707 5.9795C7.41532 5.85919 7.46066 5.74296 7.54342 5.65559L9.92235 3.27034C10.0081 3.18463 10.1099 3.11664 10.2219 3.07026C10.3339 3.02387 10.454 3 10.5752 3C10.6965 3 10.8165 3.02387 10.9285 3.07026C11.0406 3.11664 11.1423 3.18463 11.2281 3.27034L14.7298 6.76978C14.9028 6.94281 15 7.17742 15 7.42204C15 7.66665 14.9028 7.90126 14.7298 8.07429Z"
                      fill="#3D4A66"/>
                  </svg>
                  <span>Закрепить чат</span>
                </li>
              )
            }
          </ul>
        )
      }
    </div>
  )
}

export default ChatMenu;