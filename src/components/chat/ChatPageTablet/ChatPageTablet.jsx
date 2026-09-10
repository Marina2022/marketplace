import s from './ChatPageTablet.module.scss';
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";
import ChatInfo from "@/components/chat/chat-components/ChatInfo/ChatInfo.jsx";
import {useState} from "react";

const ChatPageTablet = () => {

  const [showChatInfo, setShowChatInfo] = useState(false)

  return (
    <div className={s.tabletChatWrapper}>
      <div className={s.contactsBlock}>
        <ChatContacts/>
      </div>
      <div className={s.messagesBlock}>

        {
          showChatInfo && (
            <div className={s.chatInfoUnderlay} onClick={() => setShowChatInfo(false)} >
              <div className={s.chatInfo}>
                <ChatInfo/>
              </div>
            </div>
          )
        }

        <ChatMessages setShowChatInfo={setShowChatInfo}/>
      </div>


    </div>
  );
};

export default ChatPageTablet;