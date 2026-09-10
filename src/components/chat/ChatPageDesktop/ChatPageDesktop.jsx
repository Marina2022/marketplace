import s from './ChatPageDesktop.module.scss';
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";
import {useSelector} from "react-redux";
import {getCurrentChatRequest} from "@/store/chatSlice.js";

const ChatPageDesktop = () => {

  const currentRequest = useSelector(getCurrentChatRequest)

  console.log("currentRequest = ", currentRequest)

  return (
    <div className={s.desktopChatWrapper}>
      <div className={s.contactsBlock}>
        <ChatContacts />
      </div>
      <div className={`${s.messagesBlock} ${s.noCurrentRequest}`}>
        <ChatMessages/>
      </div>

      {
        currentRequest && <div className={s.requestInfo}>requestInfo</div>
      }

    </div>
  )
}

export default ChatPageDesktop;