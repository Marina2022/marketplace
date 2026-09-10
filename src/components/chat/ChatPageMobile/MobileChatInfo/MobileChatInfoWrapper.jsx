import s from './MobileChatInfoWrapper.module.scss';
import ChatInfo from "@/components/chat/chat-components/ChatInfo/ChatInfo.jsx";

const MobileChatInfoWrapper = ({setShowChatInfo}) => {
  return (
    <div className={s.mobileTagsBlockWrapper} onClick={() => setShowChatInfo(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${s.mobileTagsBlock}`}>
        <div className={s.line}></div>
        <ChatInfo/>
      </div>
    </div>
  );
};

export default MobileChatInfoWrapper;