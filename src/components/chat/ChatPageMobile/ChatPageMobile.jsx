import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import {useState} from "react";
import MobileChatRequestsBlock
  from "@/components/chat/ChatPageMobile/MobileChatReqestsBlock/MobileChatRequestsBlock.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";
import {useSelector} from "react-redux";
import {getCurrentChat} from "@/store/chatSlice.js";
import MobileChatInfoWrapper from "@/components/chat/ChatPageMobile/MobileChatInfo/MobileChatInfoWrapper.jsx";

const ChatPageMobile = ({fileUrlCache}) => {

  const [showChatInfo, setShowChatInfo] = useState(false)
  const [requestsShown, setRequestsShown] = useState(false)

  const currentChat = useSelector(getCurrentChat);

  return (
    <div>

      {
        !currentChat && <ChatContacts setRequestsShown={setRequestsShown}/>
      }

      {
        !currentChat && requestsShown && <MobileChatRequestsBlock setRequestsShown={setRequestsShown}/>
      }

      {
        currentChat && <ChatMessages setShowChatInfo={setShowChatInfo} fileUrlCache={fileUrlCache} />
      }

      {
        showChatInfo && <MobileChatInfoWrapper setShowChatInfo={setShowChatInfo} fileUrlCache={fileUrlCache} />
      }


    </div>
  );
};

export default ChatPageMobile;