import s from './Attachments.module.scss';
import OnePicture
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/OnePicture/OnePicture.jsx";
import ManyPictures
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/ManyPictures/ManyPictures.jsx";
import ChatFiles
  from "@/components/chat/chat-components/ChatMessages/MessagesList/Message/Attachments/ChatFiles/ChatFiles.jsx";

const Attachments = ({attachments, fileUrlCache, chatContainerRef}) => {

  const hasImages = attachments.some(a =>
    a.contentType?.startsWith("image")
  )

  const imageCount = attachments.filter(a =>
    a.contentType?.startsWith("image")
  ).length

  const hasMultipleImages = imageCount > 1

  const hasFiles = attachments.some(a =>
    !a.contentType?.startsWith("image")
  )

  return (
    <div className={s.attachments}>

      {
        hasImages && hasMultipleImages && (
          <ManyPictures fileUrlCache={fileUrlCache} attachments={attachments} />
        )
      }

      {
        hasImages && !hasMultipleImages && (
          <OnePicture
            fileUrlCache={fileUrlCache} pictureInfo={attachments[0]} chatContainerRef={chatContainerRef}  />
        )
      }

      {
        hasFiles && (
          <ChatFiles fileUrlCache={fileUrlCache} attachments={attachments} />
        )
      }
    </div>
  )
}

export default Attachments;