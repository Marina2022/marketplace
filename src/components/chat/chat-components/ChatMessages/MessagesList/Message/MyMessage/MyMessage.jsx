import s from './MyMessage.module.scss';
import {formatTelegramTime} from "@/utils/chat.js";
import Attachments
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/Attachments.jsx";
import {LuClock4} from "react-icons/lu";
import {useSelector} from "react-redux";
import {getCurrentChat} from "@/store/chatSlice.js";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";


const MyMessage = ({message, fileUrlCache, chatContainerRef, messagesData, setMessagesData}) => {

  console.log("messagesData = ", messagesData)

  const currentChat = useSelector(getCurrentChat)


  const [sending, setSending] = useState(false)

  const handleSend = async () => {

    if (sending) return

    try {
      setSending(true)

      const body = {
        text: message.text,
        attachmentMediaFileIds: message.attachments
      }

      const response = await axiosInstance.post(`chat/${currentChat.chatRoomId}/messages`, body)

      setMessagesData(prev => ({
        ...prev,
        messages: prev.messages.map(msg =>
          msg.messageId === message.messageId
            ? {
              ...msg,
              messageId: response.data.messageId,
              sendingStatus: "success"
            }
            : msg
        )
      }))

    } catch (err) {

      console.log("err =", err)
      if (err.response && err.response.data?.errors?.length > 0) {
        showErrorToast(err.response?.data?.errors[0].message)
      }
    } finally {
      setSending(false)
    }
  }


  return (
    <div className={s.message}>
      {
        message.attachments.length > 0 && (
          <Attachments
            attachments={message.attachments} fileUrlCache={fileUrlCache} chatContainerRef={chatContainerRef}
          />
        )
      }
      <div className={s.messageText}>
        {message.text}
      </div>
      <div className={s.timeBlock}>
        {
          message.sendingStatus !== "error" && message.isEdited && <span>Изменено</span>
        }
        {
          message.sendingStatus !== "error" && formatTelegramTime(message.isEdited ? message.editedAt : message.createdAt)
        }

        {
          message.sendingStatus && message.sendingStatus === "sending" && <div className={s.clock}> <LuClock4 /></div>
        }

        {
          message.sendingStatus && message.sendingStatus === "error" && <div className={s.error} onClick={handleSend} >
          <span>Ошибка. Отправить повторно</span>
            <svg width="13" height="14" viewBox="0 0 13 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.602121 6.84493C0.583984 8.15892 1.00824 9.43869 1.8025 10.4659C2.59676 11.4931 3.7118 12.204 4.95736 12.4774C6.20292 12.7508 7.50181 12.5697 8.63241 11.965C9.763 11.3603 10.6552 10.3694 11.1569 9.16157C11.6585 7.9537 11.7384 6.60363 11.383 5.34172C11.0276 4.07982 10.2589 2.98427 9.20808 2.24203C8.15723 1.49978 6.88937 1.15684 5.62082 1.2717C4.35227 1.38657 3.16165 1.95213 2.25212 2.87188M1.70212 0.601562V3.43946H4.45212" stroke="#6B7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        }
      </div>
    </div>
  )
}

export default MyMessage;