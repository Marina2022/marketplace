import s from './MobileChatInfoWrapper.module.scss';
import ChatInfo from "@/components/chat/chat-components/ChatInfo/ChatInfo.jsx";

const MobileChatInfoWrapper = ({setShowChatInfo, fileUrlCache}) => {
  return (
    <div className={s.mobileTagsBlockWrapper} onClick={() => setShowChatInfo(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${s.mobileTagsBlock}`}>
        <div className={s.line}></div>
        <ChatInfo fileUrlCache={fileUrlCache} setShowChatInfo={setShowChatInfo} />
      </div>
    </div>
  );
};

export default MobileChatInfoWrapper;