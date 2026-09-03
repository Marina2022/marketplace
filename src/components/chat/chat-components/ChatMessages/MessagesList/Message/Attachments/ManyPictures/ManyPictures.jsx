import s from './ManyPictures.module.scss';
import axiosInstance from "@/api/axiosInstance.js";

const ManyPictures = ({fileUrlCache, attachments}) => {

  const pictures = attachments.filter((img) => img.contentType.startsWith("image"));

  let picturesToShow = pictures

  let isCropped = false
  if (pictures.length > 4) {
    picturesToShow = pictures.slice(0, 3);
    isCropped = true
  }

  const handleOpen = async (picture) => {
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

  return (
    <ul className={s.pictures}>
      {
        picturesToShow.map((picture, i) => {
          return (
            <li onClick={()=>handleOpen(picture)} className={s.item} key={i}>
              <img className={s.img} src={fileUrlCache.current[picture.mediaFileId].url} alt="img" />
            </li>
          )
        })
      }

      {
        isCropped && (
          <li className={`${s.item} ${s.plusBlock}`}>
            +{pictures.length - picturesToShow.length}
          </li>
        )
      }
    </ul>
  )
}

export default ManyPictures;