import s from './IncomingMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";
import Attachments
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/Attachments.jsx";

const IncomingMessage = ({message, fileUrlCache, chatContainerRef}) => {
  return (
    <div className={s.incomingMessage}>
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