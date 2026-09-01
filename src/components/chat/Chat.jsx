import s from './Chat.module.scss';
import {useMediaQuery} from "react-responsive";
import ChatPageDesktop from "@/components/chat/ChatPageDesktop/ChatPageDesktop.jsx";
import ChatPageTablet from "@/components/chat/ChatPageTablet/ChatPageTablet.jsx";
import ChatPageMobile from "@/components/chat/ChatPageMobile/ChatPageMobile.jsx";

const Chat = () => {

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})


  return (
    <div>

      {
        isDesktop && <ChatPageDesktop/>
      }

      {
        isTablet && <ChatPageTablet/>
      }

      {
        isMobile && <ChatPageMobile/>
      }
    </div>
  )
}

export default Chat;