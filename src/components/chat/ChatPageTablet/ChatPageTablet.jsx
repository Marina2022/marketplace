import s from './ChatPageTablet.module.scss';
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";

const ChatPageTablet = () => {
  return (
    <div className={s.tabletChatWrapper}>
      <div className={s.contactsBlock}>
        <ChatContacts />
      </div>
      <div className={s.messagesBlock}>
        <ChatMessages />
      </div>
      {/*<div className={s.requestInfo}>requestInfo</div>*/}
    </div>
  );
};

export default ChatPageTablet;