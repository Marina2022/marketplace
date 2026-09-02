import s from './IncomingMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";

const IncomingMessage = ({message}) => {
  return (
    <div className={s.incomingMessage}>
      <div className={s.messageText}>
        {message.text}
      </div>
      <div className={s.time}>
        {formatTelegramTime(message.createdAt)}
      </div>
    </div>
  )
}

export default IncomingMessage;