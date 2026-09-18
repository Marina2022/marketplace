import {useMediaQuery} from "react-responsive";
import ChatPageDesktop from "@/components/chat/ChatPageDesktop/ChatPageDesktop.jsx";
import ChatPageTablet from "@/components/chat/ChatPageTablet/ChatPageTablet.jsx";
import ChatPageMobile from "@/components/chat/ChatPageMobile/ChatPageMobile.jsx";
import {useEffect, useRef} from "react";
import {getReconnectionStatus, initChat} from "@/store/chatSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";

const Chat = () => {

  const profileId = useSelector(getActiveProfileId);
  const dispatch = useDispatch()

  useEffect(() => {
    // страховка на случай полной потери соединения с чатом
    // если чат подключен, то второй раз подключаться не будет (в редаксе стоит if connections.state !== "Disconnected" return
    dispatch(initChat(profileId))
  }, [profileId]);

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})

  const fileUrlCache = useRef({});

  return (
    <div>

      {
        isDesktop && <ChatPageDesktop fileUrlCache={fileUrlCache}/>
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