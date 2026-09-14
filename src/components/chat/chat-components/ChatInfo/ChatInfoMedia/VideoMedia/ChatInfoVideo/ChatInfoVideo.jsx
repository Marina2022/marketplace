import s from './ChatInfoVideo.module.scss';
import {formatDateShort, formatFileSize} from "@/utils/chat.js";
import axiosInstance from "@/api/axiosInstance.js";

const ChatInfoVideo = ({file, fileUrlCache}) => {

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
        <svg width="21" height="15" viewBox="0 0 21 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.25 6L18.97 1.28C19.0749 1.17524 19.2085 1.10392 19.3539 1.07503C19.4993 1.04615 19.65 1.061 19.7869 1.11771C19.9239 1.17442 20.041 1.27045 20.1234 1.39367C20.2058 1.51688 20.2499 1.66176 20.25 1.81V13.19C20.2499 13.3382 20.2058 13.4831 20.1234 13.6063C20.041 13.7295 19.9239 13.8256 19.7869 13.8823C19.65 13.939 19.4993 13.9538 19.3539 13.925C19.2085 13.8961 19.0749 13.8248 18.97 13.72L14.25 9M3 14.25H12C12.5967 14.25 13.169 14.0129 13.591 13.591C14.0129 13.169 14.25 12.5967 14.25 12V3C14.25 2.40326 14.0129 1.83097 13.591 1.40901C13.169 0.987053 12.5967 0.75 12 0.75H3C2.40326 0.75 1.83097 0.987053 1.40901 1.40901C0.987053 1.83097 0.75 2.40326 0.75 3V12C0.75 12.5967 0.987053 13.169 1.40901 13.591C1.83097 14.0129 2.40326 14.25 3 14.25Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

      </div>
      <div className={s.contect}>
        <div className={s.fileName}>{file.fileName}</div>
        <div className={s.fileSize}>
          {formatFileSize(file.fileSize)} · {formatDateShort(file.sentAt)}
        </div>
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

export default ChatInfoVideo;