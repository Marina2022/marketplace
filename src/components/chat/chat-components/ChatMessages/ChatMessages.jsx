import s from './ChatMessages.module.scss';
import {useSelector} from "react-redux";
import {getCurrentChatRoomId, getUnreadCount, setChatError, setChats} from "@/store/chatSlice.js";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";

const ChatMessages = () => {

  const chatRoomId = useSelector(getCurrentChatRoomId)
  const [messages, setMessages] = useState([])
  const [messagesLoading, setMessagesLoading] = useState(false)
  const [error, setError] = useState(null)

  const unreadCount = useSelector(getUnreadCount)

//  console.log("messages", messages)

  useEffect(()=>{

    if (!chatRoomId) return

    const getMessages = async()=>{
      try {
        setMessagesLoading(true)
        const response = await axiosInstance(`chat/${chatRoomId}/messages`);
        setMessages(response.data)
      } catch (error) {
        console.error("Ошибка загрузки сообщений:", error);
        setError(error)
      } finally {
        setMessagesLoading(false)
      }
    }

    getMessages()


  }, [chatRoomId])

  return (
    <div>
      <div>Messages</div>
      <div>Room ID - {chatRoomId}</div>
    </div>
  )
}

export default ChatMessages;