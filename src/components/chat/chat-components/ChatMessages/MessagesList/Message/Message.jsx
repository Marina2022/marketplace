import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {formatChatDateForChat} from "@/utils/chat.js";
import s from './Message.module.scss'
import FirstSystemMessage
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/FirstSystemMessage/FirstSystemMessage.jsx";
import MyMessage from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/MyMessage/MyMessage.jsx";
import IncomingMessage
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/IncomingMessage/IncomingMessage.jsx";

const Message = ({message, index, allMessages}) => {
  const activeProfileId = useSelector(getActiveProfileId)
  const isMine = message.senderProfileId === activeProfileId
  const isSystem = message.isSystem
  const isSystemFirst = index === 0

  const isIncoming = message.senderProfileId !== activeProfileId && !isSystem


  let isDateChanged = false
  if (index === 0) isDateChanged = true

  if (index > 0) {
    isDateChanged =
      new Date(message.createdAt).toDateString() !==
      new Date(allMessages[index - 1].createdAt).toDateString();
  }


  return (
    <>
      {
        isDateChanged && <div className={s.dateChanged}>{formatChatDateForChat(message.createdAt)}</div>
      }

      {
        isMine && <MyMessage message={message}/>
      }

      {
        isIncoming && <IncomingMessage message={message}/>
      }

      {
        isSystem && !isSystemFirst && <div>{index} - isSystem</div>
      }

      {
        isSystemFirst && <FirstSystemMessage message={message}/>
      }


    </>
  )
}

export default Message;