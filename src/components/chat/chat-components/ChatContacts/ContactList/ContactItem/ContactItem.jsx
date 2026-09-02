import s from './ContactItem.module.scss';
import {formatChatDate, getInitials} from "@/utils/oneRequest.js";
import {getCurrentChat, setCurrentChat} from "@/store/chatSlice.js";
import {useDispatch, useSelector} from "react-redux";

const attachmentTypes = {
  image: "Изображение",
  video: "Видео",
  audio: "Аудио",
  document: "Документ",
  archive: "Архив"
}

const ContactItem = ({contact}) => {

  const currentChat = useSelector(getCurrentChat)
  const dispatch = useDispatch()

  let lastMessage = ""
  if (contact.lastMessageText) {
    lastMessage = contact.lastMessageText
  } else {

    if (contact.lastMessageAttachmentType) {
      lastMessage = attachmentTypes[contact.lastMessageAttachmentType.toLowerCase()] || ""
    }
  }

  const handleContactCLick = () => {
    dispatch(setCurrentChat(contact))
  }

  const isActive = contact.chatRoomId === currentChat?.chatRoomId

  return (
    <div className={`${s.contactItem} ${isActive ? s.contactItemActive : ''}`} onClick={handleContactCLick}>
      <div className={s.roundBlock}>
        {
          getInitials(contact.companionName)
        }
      </div>
      <div className={s.contactContent}>
        <div className={s.contactContentTop}>
          <div className={s.name}>{contact.companionName}</div>
          <div className={s.date}>{formatChatDate(contact.lastMessageAt)}</div>
        </div>
        <div className={s.contactContentBottom}>
          <div className={s.lastMessage}>{lastMessage}</div>
          {
            contact.isPinned && (
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M8.19146 0.0440233L11.9558 3.80898C12.0147 3.86768 12.0147 3.96378 11.9558 4.02268L10.6738 5.30455C10.615 5.36354 10.5189 5.36354 10.4602 5.30455L10.0958 4.94025L8.40601 6.62989C8.78511 8.05788 8.41529 9.64359 7.29565 10.7631C7.26967 10.7893 7.2434 10.8148 7.21674 10.84C7.1187 10.9333 7.13442 10.9327 7.03969 10.838L4.64817 8.4462L0 12L3.55461 7.35262L1.15958 4.95754C1.06407 4.86183 1.07208 4.87687 1.16602 4.77813C1.18946 4.75361 1.21339 4.729 1.2377 4.70458C2.35714 3.58503 3.94299 3.21487 5.37074 3.59411L7.0603 1.90448L6.69574 1.53999C6.63705 1.48129 6.63705 1.38518 6.69574 1.32629L7.97769 0.0440233C8.03667 -0.0146744 8.13276 -0.0146744 8.19146 0.0440233Z"
                      fill="#9AA1AC"/>
              </svg>
            )
          }
          {
            !contact.isPinned && contact.unreadCount > 0 && <div className={s.messageNumber}>{contact.unreadCount}</div>
          }
        </div>
      </div>
    </div>
  )
}

export default ContactItem;