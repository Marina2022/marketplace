import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import ChatContacts from "@/components/chat/chat-components/ChatContacts/ChatContacts.jsx";
import {useState} from "react";
import MobileChatRequestsBlock
  from "@/components/chat/ChatPageMobile/MobileChatReqestsBlock/MobileChatRequestsBlock.jsx";
import ChatMessages from "@/components/chat/chat-components/ChatMessages/ChatMessages.jsx";
import {useSelector} from "react-redux";
import {getCurrentChat} from "@/store/chatSlice.js";

const ChatPageMobile = () => {

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
        currentChat && <ChatMessages/>
      }


    </div>
  );
};

export default ChatPageMobile;