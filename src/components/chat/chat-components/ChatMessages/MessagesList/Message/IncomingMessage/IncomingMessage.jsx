import s from './IncomingMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";
import Attachments
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/Attachments.jsx";
import MessageContextMenu
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/MessageContextMenu/MessageContextMenu.jsx";
import {useState} from "react";

const IncomingMessage = ({message, fileUrlCache, chatContainerRef}) => {

  const [showMenu, setShowMenu] = useState(false)
  const onClose = ()=>setShowMenu(false)

  return (
    <div className={s.incomingMessage} onClick={()=>setShowMenu(true)}>
      {
        showMenu && (
          <MessageContextMenu
            message={message}
            onClose={onClose}
          />
        )
      }
      {
        message.attachments.length > 0 && (
          <Attachments
            attachments={message.attachments} fileUrlCache={fileUrlCache} chatContainerRef={chatContainerRef} />
        )
      }
      <div className={s.messageText}>
        {message.text}
      </div>

      <div className={s.timeBlock}>
        {
          message.isEdited && <span>Изменено</span>
        }
        {formatTelegramTime(message.isEdited ? message.editedAt : message.createdAt)}
      </div>
    </div>
  )
}

export default IncomingMessage;