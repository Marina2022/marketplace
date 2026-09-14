import s from './ChatInfoMedia.module.scss';
import PictureMedia from "@/components/chat/chat-components/ChatInfo/ChatInfoMedia/PictureMedia/PictureMedia.jsx";
import VideoMedia from "@/components/chat/chat-components/ChatInfo/ChatInfoMedia/VideoMedia/VideoMedia.jsx";

const ChatInfoMedia = ({tabCounts, fileUrlCache}) => {
  return (
    <div className={s.mediaBlock}>

      <PictureMedia tabCounts={tabCounts} fileUrlCache={fileUrlCache} />
      <VideoMedia  tabCounts={tabCounts} fileUrlCache={fileUrlCache} />

    </div>
  )
}

export default ChatInfoMedia;