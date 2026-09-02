import s from './MyMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";

const MyMessage = ({message}) => {
  return (
    <div className={s.message}>
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