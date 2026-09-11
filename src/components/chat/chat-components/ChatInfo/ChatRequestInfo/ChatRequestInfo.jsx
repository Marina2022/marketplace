import s from './ChatRequestInfo.module.scss';
import {getCurrentChatRequest} from "@/store/chatSlice.js";
import {useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {getPreviewPayload} from "@/utils/requests.js";
import noPhotoImg from "@/assets/img/chat/noPhoto.jpg"

const ChatRequestInfo = ({fileUrlCache, setShowChatInfo}) => {
    const currentRequestId = useSelector(getCurrentChatRequest)

    const [request, setRequest] = useState(null)
    const [loading, setLoading] = useState(true)

    console.log("request", request)

    useEffect(() => {

      if (!currentRequestId) return

      const getRequestDetails = async () => {
        try {
          const response = await axiosInstance(`/messenger/requests/${currentRequestId}/context`)
          console.log(response)
          setRequest(response.data)

          const mediaFileId = response.data.previewMediaFileId

          if (!mediaFileId) {
            setRequest(prev => ({...prev, imgUrl: noPhotoImg}))
          }

          const now = Date.now()

          const cached = fileUrlCache.current[mediaFileId]

          try {
            let url

            if (cached && new Date(cached.expiresAt).getTime() > now) {
              url = cached.url
            } else {
              const payload = getPreviewPayload([response.data])
              const pictures = await axiosInstance.post(`/requests/preview`, payload)
              url = pictures.data.items[currentRequestId].url

              fileUrlCache.current[mediaFileId] = {
                url,
                expiresAt: response.data.expiresAt // ISO строка
              }
            }

            setRequest(prev => ({...prev, imgUrl: url}))

          } catch (e) {
            console.error("Failed to open file:", e)
          }

        } catch (err) {
          console.log("err =", err)
          if (err.response && err.response.data?.errors?.length > 0) {
            showErrorToast(err.response?.data?.errors[0].message)
          }
        } finally {
          setLoading(false)
        }
      }

      getRequestDetails()

    }, [currentRequestId, fileUrlCache])

    if (loading) {
      return <div className={s.chatRequestInfo}></div>
    }

    return (
      <div className={s.chatRequestInfo}>

        <div className={s.imgWrapper}>

          <div className={s.numberBadge}>#{request.requestNumber}</div>

          <button  onClick={()=>setShowChatInfo(false)} className={s.closeBtn}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.75 0.75L8.25 8.25M8.25 0.75L0.75 8.25" stroke="#565C68" strokeWidth="1.5" strokeLinecap="round"/>
            </svg>
          </button>

          <img className={s.img} src={request.imgUrl ? request.imgUrl : ""} alt=""/>
        </div>


        <div className={s.title}>{request.title}</div>
        <div className={s.geo}>
          <svg width="10" height="13" viewBox="0 0 10 13" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M5 2.78574C4.5505 2.78574 4.11109 2.92189 3.73734 3.17698C3.36359 3.43206 3.07229 3.79462 2.90027 4.21881C2.72826 4.643 2.68325 5.10977 2.77094 5.56009C2.85864 6.0104 3.07509 6.42405 3.39294 6.74871C3.71079 7.07337 4.11575 7.29447 4.55661 7.38404C4.99748 7.47361 5.45445 7.42764 5.86974 7.25194C6.28502 7.07623 6.63997 6.77868 6.8897 6.39692C7.13943 6.01516 7.27273 5.56633 7.27273 5.10719C7.27273 4.49151 7.03328 3.90104 6.60706 3.46568C6.18084 3.03032 5.60277 2.78574 5 2.78574ZM5 6.50006C4.7303 6.50006 4.46665 6.41837 4.2424 6.26532C4.01816 6.11227 3.84337 5.89474 3.74016 5.64022C3.63695 5.38571 3.60995 5.10565 3.66257 4.83546C3.71518 4.56527 3.84506 4.31708 4.03576 4.12228C4.22647 3.92749 4.46945 3.79483 4.73397 3.74109C4.99849 3.68734 5.27267 3.71493 5.52184 3.82035C5.77101 3.92577 5.98398 4.1043 6.13382 4.33336C6.28366 4.56241 6.36364 4.83171 6.36364 5.10719C6.36364 5.47661 6.21997 5.83089 5.96424 6.0921C5.70851 6.35332 5.36166 6.50006 5 6.50006ZM5 0C3.67438 0.00153607 2.40348 0.540107 1.46613 1.49756C0.528771 2.45501 0.00150383 3.75315 0 5.10719C0 6.92953 0.824432 8.86098 2.38636 10.6932C3.08819 11.5211 3.8781 12.2666 4.74148 12.916C4.8179 12.9707 4.90896 13 5.00227 13C5.09559 13 5.18664 12.9707 5.26307 12.916C6.12486 12.2664 6.91323 11.5209 7.61364 10.6932C9.1733 8.86098 10 6.92953 10 5.10719C9.9985 3.75315 9.47123 2.45501 8.53387 1.49756C7.59652 0.540107 6.32562 0.00153607 5 0ZM5 11.9555C4.0608 11.201 0.909091 8.42977 0.909091 5.10719C0.909091 3.99896 1.3401 2.93611 2.10729 2.15247C2.87448 1.36883 3.91502 0.928581 5 0.928581C6.08498 0.928581 7.12551 1.36883 7.89271 2.15247C8.6599 2.93611 9.09091 3.99896 9.09091 5.10719C9.09091 8.42861 5.9392 11.201 5 11.9555Z"
              fill="#9AA1AC"/>
          </svg>
          <span>{request.regionName}</span>
        </div>

      </div>
    )
  }


export default ChatRequestInfo;