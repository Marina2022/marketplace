import s from './ChatPageDesktop.module.scss';
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";

const ChatPageDesktop = () => {
  return (
    <div className={s.desktopChatWrapper}>
      <div className={s.contactsBlock}>
        <ChatContacts />
      </div>
      <div className={s.messagesBlock}>
        <ChatMessages/>
      </div>
      <div className={s.requestInfo}>requestInfo</div>
    </div>
  )
}

export default ChatPageDesktop;