import s from './Chat.module.scss';
import {useMediaQuery} from "react-responsive";
import ChatPageDesktop from "@/components/chat/ChatPageDesktop/ChatPageDesktop.jsx";
import ChatPageTablet from "@/components/chat/ChatPageTablet/ChatPageTablet.jsx";
import ChatPageMobile from "@/components/chat/ChatPageMobile/ChatPageMobile.jsx";
import {useRef} from "react";

const Chat = () => {

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})

  const fileUrlCache = useRef({});

  return (
    <div>

      {
        isDesktop && <ChatPageDesktop fileUrlCache={fileUrlCache} />
      }

      {
        isTablet && <ChatPageTablet fileUrlCache={fileUrlCache}/>
      }

      {
        isMobile && <ChatPageMobile fileUrlCache={fileUrlCache}/>
      }
    </div>
  )
}

export default Chat;