import s from './ChatInfoTabs.module.scss';
import {useEffect, useState} from "react";
import {getCurrentChat, getCurrentChatRequest} from "@/store/chatSlice.js";
import {useSelector} from "react-redux";
import axiosInstance from "@/api/axiosInstance.js";

const ChatInfoTabs = ({tabs, setTabs}) => {

  const [tabCounts, setTabCounts] = useState(null)

  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)

  console.log("currentChat = ", currentChat)

  console.log("tabs = ", tabs)

  useEffect(() => {
    const getTabCounts = async () => {
      try {

        let url = `chat/attachments/counters?requestId=${requestId}`
        if (currentChat) url +=  `&chatRoomId=${currentChat.chatRoomId}`

        const response = await axiosInstance(url)
        setTabCounts(response.data)

      } catch (err) {
        console.log(err)
      }
    }

    getTabCounts()

  }, [requestId, currentChat])

  return (
    <div>

    </div>
  );
};

export default ChatInfoTabs;