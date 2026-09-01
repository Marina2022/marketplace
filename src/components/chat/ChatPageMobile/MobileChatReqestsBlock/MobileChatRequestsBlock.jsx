import s from './MobileChatRequestsBlock.module.scss';
import ChatFilters from "@/components/chat/chat-components/ChatFilters/ChatFilters.jsx";

const MobileChatRequestsBlock = ({setRequestsShown}) => {
  return (
    <div className={s.mobileTagsBlockWrapper} onClick={() => setRequestsShown(false)}>
      <div onClick={(e) => e.stopPropagation()} className={`${s.mobileTagsBlock}`}>
        <div className={s.line}></div>
        <ChatFilters/>
      </div>
    </div>
  )
}

export default MobileChatRequestsBlock;