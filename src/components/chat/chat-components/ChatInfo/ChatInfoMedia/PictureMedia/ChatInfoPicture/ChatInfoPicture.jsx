import s from './ChatInfoPicture.module.scss';
import axiosInstance from "@/api/axiosInstance.js";

const ChatInfoPicture = ({picture, fileUrlCache}) => {

  const handleOpen = async () => {
    const id = picture.mediaFileId
    const now = Date.now()
    const cached = fileUrlCache.current[id]

    try {
      let url

      if (cached && new Date(cached.expiresAt).getTime() > now) {
        url = cached.url
      }

      else {
        const response = await axiosInstance.post(`chat/files/urls`, {
          mediaFileIds: [id],
          ttlSeconds: 600
        })

        const file = response.data.items[id]

        url = file.url

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

  const cached = fileUrlCache.current[picture.mediaFileId]
  const src = cached?.url

  return (
    <li className={s.pictureItem} onClick={handleOpen} >
      <img className={s.img} src={src || ""} alt="" />
    </li>
  )
}

export default ChatInfoPicture;