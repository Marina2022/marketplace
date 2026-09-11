import s from './ChatInfoFiles.module.scss';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getCurrentChat, getCurrentChatRequest} from "@/store/chatSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import {normalizeFilesResponse} from "@/utils/chat.js";
import ChatInfoFile from "@/components/chat/chat-components/ChatInfo/ChatInfoFiles/ChatInfoFile/ChatInfoFile.jsx";

const ChatInfoFiles = ({fileCount, fileUrlCache}) => {

  const LIMIT = 20

  const requestId = useSelector(getCurrentChatRequest)
  const currentChat = useSelector(getCurrentChat)

  const [filesData, setFilesData] = useState([])
  const [loading, setLoading] = useState(true)

  console.log("filesData = ", filesData)

  useEffect(() => {

    // GET api/chat/files?requestId={requestId}&chatRoomId={chatRoomId?}&cursor={string?}&limit=20

    const getFiles = async () => {

      // if (fileCount === 0) {
      //   setLoading(false)
      //   setFilesData({items: []})
      // }

      setLoading(true)

      let url = `chat/files?requestId=${requestId}&limit=${LIMIT}`
      if (currentChat) {
        url += `&chatRoomId=${currentChat.chatRoomId}`
      }

      try {
        const {data} = await axiosInstance(url)

        const items = data.items || []
        const now = Date.now()

        const mediaFileIds = items.map(item => item.mediaFileId)

        //  фильтруем только нужные
        const idsToFetch = mediaFileIds.filter((id) => {
          if (!id) return false
          const cached = fileUrlCache.current[id]
          return !cached || new Date(cached.expiresAt).getTime() <= now
        })

        // запрашиваем только недостающие
        if (idsToFetch.length > 0) {
          const {data: filesResponse} = await axiosInstance.post(`chat/files/urls`, {
            mediaFileIds: idsToFetch,
            ttlSeconds: 600
          })

          const normalized = normalizeFilesResponse(filesResponse)
          Object.assign(fileUrlCache.current, normalized)
        }

        setFilesData(data)

      } catch (error) {
        console.log(error)
      } finally {
        setLoading(false)
      }
    }

    getFiles()

  }, [requestId, currentChat?.chatRoomId]);

  const handleDownloadAll = async () => {
    console.log("Получаем архив с api и скачиваем")
  }

  if (loading) return null

  return (
    <div>
      <div className={s.header}>
        <div className={s.headerTitle}>Документы · {fileCount}</div>

        {
          fileCount > 0 && <button onClick={handleDownloadAll} className={s.downloadAllBtn}>Скачать все</button>
        }

      </div>

      <ul className={`${s.filesList} scroll`}>
        {
          fileCount > 0 && filesData.items.map((file, index) => <ChatInfoFile file={file} key={index} fileUrlCache={fileUrlCache} />)
        }
      </ul>

    </div>
  )
}

export default ChatInfoFiles;