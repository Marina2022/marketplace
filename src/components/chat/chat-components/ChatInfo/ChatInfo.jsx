import s from './ChatInfo.module.scss';
import ChatRequestInfo from "@/components/chat/chat-components/ChatInfo/ChatRequestInfo/ChatRequestInfo.jsx";
import {useState} from "react";
import ChatInfoTabs from "@/components/chat/chat-components/ChatInfo/ChatInfoTabs/ChatInfoTabs.jsx";

const ChatInfo = ({fileUrlCache, setShowChatInfo=null}) => {

  const [tab, setTab] = useState("");

  return (
    <div className={s.chatInfo} onClick={(e) => e.stopPropagation()} >
      <ChatRequestInfo fileUrlCache={fileUrlCache} setShowChatInfo={setShowChatInfo} />
      <ChatInfoTabs tab={tab} setTab={setTab} />

    </div>
  )
}

export default ChatInfo;