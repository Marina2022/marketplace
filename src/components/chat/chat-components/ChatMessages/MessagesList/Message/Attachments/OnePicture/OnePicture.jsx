import s from './OnePicture.module.scss';
import axiosInstance from "@/api/axiosInstance.js";

const OnePicture = ({fileUrlCache, pictureInfo}) => {

  const handleOpen = async () => {
    const id = pictureInfo.mediaFileId
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

  return (
    <img onClick={handleOpen} className={s.img} src={fileUrlCache.current[pictureInfo.mediaFileId].url} alt="img"/>
  )
}

export default OnePicture;