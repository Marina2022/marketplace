import s from './ChatInfo.module.scss';
import ChatRequestInfo from "@/components/chat/chat-components/ChatInfo/ChatRequestInfo/ChatRequestInfo.jsx";

const ChatInfo = () => {


  return (
    <div className={s.chatInfo} onClick={(e) => e.stopPropagation()} >
      <ChatRequestInfo  />
    </div>
  )
}

export default ChatInfo;