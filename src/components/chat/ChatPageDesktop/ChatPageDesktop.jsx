import s from './ChatPageDesktop.module.scss';

const ChatPageDesktop = () => {
  return (
    <div className={s.desktopChatWrapper}>
      <div className={s.contactsBlock}>contacts</div>
      <div className={s.messagesBlock}>messages</div>
      <div className={s.requestInfo}>requestInfo</div>
    </div>
  );
};

export default ChatPageDesktop;