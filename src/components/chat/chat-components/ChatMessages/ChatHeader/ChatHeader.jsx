import {useDispatch, useSelector} from "react-redux";
import {getCurrentChat, getIsTyping, setCurrentChat} from "@/store/chatSlice.js";
import s from "./ChatHeader.module.scss"
import {useMediaQuery} from "react-responsive";
import ChatMenu from "@/components/chat/chat-components/ChatMessages/ChatHeader/ChatMenu/ChatMenu.jsx";
import DropFilesArea from "@/components/chat/chat-components/ChatMessages/DropFilesArea/DropFilesArea.jsx";

// const ChatHeader = ({setFiles, files, setFilesLoading, filesLoading, getRootProps, getInputProps, dropProcess}) => {
const ChatHeader = ({dropProcess}) => {

    const isMobile = useMediaQuery({maxWidth: 960})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})
  const currentChat = useSelector(getCurrentChat)
  const dispatch = useDispatch()

  const isTyping = useSelector(getIsTyping)

  const handleClickBack = () => {
    dispatch(setCurrentChat(null))
  }
  const isDesktop = useMediaQuery({minWidth: 1341})

  return (

    <div className={s.header}>

      {
         isDesktop && <DropFilesArea
          // setFiles={setFiles}
          // files={files}
          // setFilesLoading={setFilesLoading}
          // filesLoading={filesLoading}
          dropProcess={dropProcess}
        />
      }
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

      <div className={s.companionNameWrapper}>
        <div className={s.text}>
          {currentChat.companionName}
        </div>

        {
          isTyping && <div className={s.isTyping}>Печатает...</div>
        }

        {
          !isTyping && <div className={s.isNotTyping}>Печатает...</div>
        }

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

        <ChatMenu/>
      </div>
    </div>

  )

}

export default ChatHeader;