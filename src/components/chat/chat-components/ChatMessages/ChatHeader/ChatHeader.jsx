import {useDispatch, useSelector} from "react-redux";
import {getCurrentChat, setCurrentChat} from "@/store/chatSlice.js";
import s from "./ChatHeader.module.scss"
import {useMediaQuery} from "react-responsive";
import ChatMenu from "@/components/chat/chat-components/ChatMessages/ChatHeader/ChatMenu/ChatMenu.jsx";

const ChatHeader = () => {
  const isMobile = useMediaQuery({maxWidth: 960})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})
  const currentChat = useSelector(getCurrentChat)
  const dispatch = useDispatch()

  const handleClickBack = () => {
    dispatch(setCurrentChat(null))
  }

  return (

    <div className={s.mobileHeader}>

      {
        isMobile && (
          <button className={s.backBtn} onClick={handleClickBack}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.80078 12.7969L0.800781 6.79688L6.80078 0.796875" stroke="#3A3F49" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )
      }

      <div className={s.text}>
        {currentChat.companionName}
      </div>

      <div className={s.buttons}>

        {
          (isTablet || isMobile) && (
            <button className={s.btn}>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.5H5.5L8.5 3.5V12.5H0.5V0.5Z" stroke="#3D4A66" strokeLinejoin="round"/>
              </svg>
              {
                isTablet && <span>Заявка</span>
              }
            </button>
          )
        }

        <ChatMenu />
      </div>
    </div>

  )

}

export default ChatHeader;