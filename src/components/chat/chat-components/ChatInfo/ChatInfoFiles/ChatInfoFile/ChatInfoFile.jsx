import s from './ChatInfoFile.module.scss';
import {formatFileSize} from "@/utils/chat.js";
import axiosInstance from "@/api/axiosInstance.js";

const ChatInfoFile = ({file, fileUrlCache}) => {

  let ext = ""
  const arr = file.fileName.split(".")
  if (arr.length >= 1) ext = arr[arr.length - 1]

  const handleOpen = async () => {
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
    <li className={s.fileItem}>
      <div className={s.ext}>
        {
          <span>{ext}</span>
        }
      </div>
      <div className={s.contect}>
        <div className={s.fileName}>{file.fileName}</div>
        <div className={s.fileSize}>{formatFileSize(file.fileSize)}</div>
      </div>
      <button className={s.downloadBtn} onClick={handleOpen}>
        <svg className={s.downloadBtnSvg} width="15" height="15" viewBox="0 0 15 15" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.5 11V12.75C0.5 13.2141 0.684374 13.6592 1.01256 13.9874C1.34075 14.3156 1.78587 14.5 2.25 14.5H12.75C13.2141 14.5 13.6592 14.3156 13.9874 13.9874C14.3156 13.6592 14.5 13.2141 14.5 12.75V11M4 7.5L7.5 11L11 7.5M7.5 11V0.5"
            strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>
    </li>
  )
}

export default ChatInfoFile;