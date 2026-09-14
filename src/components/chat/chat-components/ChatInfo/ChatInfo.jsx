import s from './ChatInfo.module.scss';
import ChatRequestInfo from "@/components/chat/chat-components/ChatInfo/ChatRequestInfo/ChatRequestInfo.jsx";
import {useState} from "react";
import ChatInfoTabs from "@/components/chat/chat-components/ChatInfo/ChatInfoTabs/ChatInfoTabs.jsx";
import ChatInfoFiles from "@/components/chat/chat-components/ChatInfo/ChatInfoFiles/ChatInfoFiles.jsx";
import ChatInfoMedia from "@/components/chat/chat-components/ChatInfo/ChatInfoMedia/ChatInfoMedia.jsx";
import ChatInfoLinks from "@/components/chat/chat-components/ChatInfo/ChatInfoLinks/ChatInfoLinks.jsx";

const ChatInfo = ({fileUrlCache, setShowChatInfo=null}) => {

  const [tab, setTab] = useState("media")
  const [tabCounts, setTabCounts] = useState(null)

  return (
    <div className={s.chatInfo} onClick={(e) => e.stopPropagation()} >
      <ChatRequestInfo fileUrlCache={fileUrlCache} setShowChatInfo={setShowChatInfo} />

      <ChatInfoTabs tab={tab} setTab={setTab} tabCounts={tabCounts} setTabCounts={setTabCounts}  />

      {
        tab === "media" && <ChatInfoMedia tabCounts={tabCounts} fileUrlCache={fileUrlCache} />
      }

      {
        tab === "files" && <ChatInfoFiles fileCount={tabCounts?.files} fileUrlCache={fileUrlCache} />
      }

      {
        tab === "links" && <ChatInfoLinks linkCount={tabCounts?.links} />
      }

    </div>
  )
}

export default ChatInfo;