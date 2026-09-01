import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import {useState} from "react";
import MobileChatRequestsBlock
  from "@/components/chat/ChatPageMobile/MobileChatReqestsBlock/MobileChatRequestsBlock.jsx";

const ChatPageMobile = () => {

  const [requestsShown, setRequestsShown] = useState(false)

  return (
    <div>
      <MobileHeaderLk/>
      <ChatContacts setRequestsShown={setRequestsShown} />

      {
        requestsShown && <MobileChatRequestsBlock setRequestsShown={setRequestsShown} />
      }
    </div>
  );
};

export default ChatPageMobile;