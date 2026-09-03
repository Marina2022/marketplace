import s from './MessagesList.module.scss';
import Message from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Message.jsx";

const MessagesList = ({messagesData, messagesLoading, fileUrlCache, observerRef, isOnScrollLoading, chatContainerRef}) => {

  if (messagesLoading) return null

  const messagesToShow = [...messagesData.messages].reverse()

  return (
    <ul className={s.messagesList}>

      {messagesData.messages && messagesData.meta.hasNext && (
        <li ref={observerRef} className={s.observerDiv} style={{ listStyleType: 'none', width: '100%', minHeight: '30px' }}>
          {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
            {/*<MiniSpinnerPagination />*/}
          </div>}
        </li>
      )}
      {
        messagesToShow.map((message, index, messages) => <Message
          message={message}
          key={message.messageId}
          allMessages={messages}
          index={index}
          fileUrlCache={fileUrlCache}
          chatContainerRef={chatContainerRef}
        />)
      }
    </ul>
  )
}

export default MessagesList;