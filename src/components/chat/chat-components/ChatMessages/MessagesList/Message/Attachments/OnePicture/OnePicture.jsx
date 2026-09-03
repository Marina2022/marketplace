import s from './OnePicture.module.scss';
import axiosInstance from "@/api/axiosInstance.js";
import {useRef} from "react";

const OnePicture = ({fileUrlCache, pictureInfo, chatContainerRef}) => {


  const loadedRef = useRef(false);

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

  const pictureRef = useRef(null)

  const handleLoad = ()=>{

    console.log("handleLoad")

    if (loadedRef.current) return;
    loadedRef.current = true;
    const height = pictureRef.current.clientHeight
    chatContainerRef.current.scrollTop = chatContainerRef.current.scrollTop + height
  }

  return (
    <img ref={pictureRef} onLoad={handleLoad} onClick={handleOpen} className={s.img} src={fileUrlCache.current[pictureInfo.mediaFileId].url} alt="img"/>
  )
}

export default OnePicture;