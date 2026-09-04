import s from './MyMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";
import Attachments
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/Attachments.jsx";
import { LuClock4 } from "react-icons/lu";


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
      <div className={s.timeBlock}>
        {
          message.isEdited && <span>Изменено</span>
        }
        {
          formatTelegramTime(message.isEdited ? message.editedAt : message.createdAt)
        }

        {
          message.sendingStatus && message.sendingStatus === "sending" && <div className={s.clock}> <LuClock4 /></div>

        }
      </div>
    </div>
  )
}

export default MyMessage;