import {useDispatch, useSelector} from "react-redux";
import {getCurrentChat, setCurrentChat} from "@/store/chatSlice.js";
import s from "./ChatHeader.module.scss"
import {useMediaQuery} from "react-responsive";

const ChatHeader = () => {
  const isMobile = useMediaQuery({maxWidth: 960})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})
  const currentChat = useSelector(getCurrentChat)
  const dispatch = useDispatch()

  const handleClickBack = () => {

    dispatch(setCurrentChat(null))
  }

  return (

    <div className={s.mobileHeader}>

      {
        isMobile && (
          <button className={s.backBtn} onClick={handleClickBack}>
            <svg width="8" height="14" viewBox="0 0 8 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.80078 12.7969L0.800781 6.79688L6.80078 0.796875" stroke="#3A3F49" strokeWidth="1.6"
                    strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        )
      }

      <div className={s.text}>
        {currentChat.companionName}
      </div>

      <div className={s.buttons}>

        {
          (isTablet || isMobile) && (
            <button className={s.btn}>
              <svg width="9" height="13" viewBox="0 0 9 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.5 0.5H5.5L8.5 3.5V12.5H0.5V0.5Z" stroke="#3D4A66" strokeLinejoin="round"/>
              </svg>
              {
                isTablet && <span>Заявка</span>
              }
            </button>
          )
        }

        <button className={s.btn}>
          <svg width="14" height="4" viewBox="0 0 14 4" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M1.53471 3.05682C1.11284 3.05682 0.750621 2.90767 0.448065 2.60938C0.149769 2.30682 0.000621498 1.9446 0.000621498 1.52273C0.000621498 1.10511 0.149769 0.747159 0.448065 0.448864C0.750621 0.150568 1.11284 0.00142026 1.53471 0.00142026C1.9438 0.00142026 2.30176 0.150568 2.60858 0.448864C2.91539 0.747159 3.0688 1.10511 3.0688 1.52273C3.0688 1.80398 2.99636 2.06179 2.85147 2.29616C2.71085 2.52628 2.52548 2.71165 2.29537 2.85227C2.06525 2.98864 1.8117 3.05682 1.53471 3.05682ZM6.89604 3.05682C6.47417 3.05682 6.11195 2.90767 5.80939 2.60938C5.5111 2.30682 5.36195 1.9446 5.36195 1.52273C5.36195 1.10511 5.5111 0.747159 5.80939 0.448864C6.11195 0.150568 6.47417 0.00142026 6.89604 0.00142026C7.30513 0.00142026 7.66309 0.150568 7.9699 0.448864C8.27672 0.747159 8.43013 1.10511 8.43013 1.52273C8.43013 1.80398 8.35769 2.06179 8.2128 2.29616C8.07218 2.52628 7.88681 2.71165 7.65669 2.85227C7.42658 2.98864 7.17303 3.05682 6.89604 3.05682ZM12.2574 3.05682C11.8355 3.05682 11.4733 2.90767 11.1707 2.60938C10.8724 2.30682 10.7233 1.9446 10.7233 1.52273C10.7233 1.10511 10.8724 0.747159 11.1707 0.448864C11.4733 0.150568 11.8355 0.00142026 12.2574 0.00142026C12.6665 0.00142026 13.0244 0.150568 13.3312 0.448864C13.6381 0.747159 13.7915 1.10511 13.7915 1.52273C13.7915 1.80398 13.719 2.06179 13.5741 2.29616C13.4335 2.52628 13.2481 2.71165 13.018 2.85227C12.7879 2.98864 12.5344 3.05682 12.2574 3.05682Z"
              fill="#3D4A66"/>
          </svg>
        </button>
      </div>

    </div>

  )

}

export default ChatHeader;