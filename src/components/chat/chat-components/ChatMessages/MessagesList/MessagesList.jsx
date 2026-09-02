import s from './MessagesList.module.scss';
import Message from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Message.jsx";

const MessagesList = ({messagesData, messagesLoading}) => {

  console.log("messagesData = ", messagesData)


  if (!messagesData) return null

  const messagesToShow = [...messagesData.messages].reverse()

  return (
    <ul className={s.messagesList}>
      {
        messagesToShow.map((message, index, messages) => <Message
          message={message}
          key={index}
          allMessages={messages}
          index={index}
        />)
      }
    </ul>
  )
}

export default MessagesList;