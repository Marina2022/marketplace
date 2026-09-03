import s from './ChatFiles.module.scss';
import {formatFileSize} from "@/utils/chat.js";
import axiosInstance from "@/api/axiosInstance.js";

const ChatFiles = ({fileUrlCache, attachments}) => {

  const files = attachments.filter((img) => !img.contentType.startsWith("image"));

  const handleOpen = async (file) => {
    const id = file.mediaFileId
    const now = Date.now()

    const cached = fileUrlCache.current[id]

    try {
      let url

      // 1. проверяем кеш (ISO -> Date)
      if (cached && new Date(cached.expiresAt).getTime() > now) {
        url = cached.url
      }
      // 2. иначе запрашиваем заново
      else {
        const response = await axiosInstance.post(`chat/files/urls`, {
          mediaFileIds: [id],
          ttlSeconds: 600
        })

        const file = response.data.items[id]

        url = file.url

        // кладём обратно в кеш (ISO как пришло с бэка)
        fileUrlCache.current[id] = {
          url,
          expiresAt: response.data.expiresAt // ISO строка
        }
      }

      window.open(url, "_blank")

    } catch (e) {
      console.error("Failed to open file:", e)
    }
  }

  return (
    <ul className={s.files}>
      {
        files.map((file, i) => {
          const ext = file.fileName.split(".")[1]
          return (
            <li className={s.fileItem} key={i} onClick={() => handleOpen(file)}>
              <div className={s.ext}>{ext}</div>
              <div className={s.contect}>
                <div className={s.fileName}>{file.fileName}</div>
                <div className={s.fileSize}>{formatFileSize(file.fileSize)}</div>
              </div>
            </li>
          )
        })
      }
    </ul>
  )
}

export default ChatFiles;