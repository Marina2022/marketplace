import s from './ChatPageTablet.module.scss';

const ChatPageTablet = () => {
  return (
    <div className={s.tabletChatWrapper}>
      <div className={s.contactsBlock}>contacts</div>
      <div className={s.messagesBlock}>messages</div>
      {/*<div className={s.requestInfo}>requestInfo</div>*/}
    </div>
  );
};

export default ChatPageTablet;