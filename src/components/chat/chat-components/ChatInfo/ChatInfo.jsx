import s from './ChatInfo.module.scss';

const ChatInfo = () => {
  return (
    <div className={s.chatInfo} onClick={(e) => e.stopPropagation()} >
      ChatInfo
    </div>
  )
}

export default ChatInfo;