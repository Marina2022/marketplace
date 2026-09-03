import s from './MyMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";
import Attachments
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/Attachments.jsx";

const MyMessage = ({message, fileUrlCache, chatContainerRef}) => {

  return (
    <div className={s.message}>
      {
        message.attachments.length > 0 && (
          <Attachments
            attachments={message.attachments} fileUrlCache={fileUrlCache} chatContainerRef={chatContainerRef}
          />
        )
      }
      <div className={s.messageText}>
        {message.text}
      </div>
      <div className={s.time}>
        {formatTelegramTime(message.createdAt)}
      </div>
    </div>
  )
}

export default MyMessage;