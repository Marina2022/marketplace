import s from './ResponseCard.module.scss';
import placeHolderImg from "@/assets/img/lk/lk-requests/placeholder.png";
import {formatChatDate, getInitials} from "@/utils/oneRequest.js";
import {statusColors} from "@/consts/requests.jsx";
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useRef, useState} from "react";

const ResponseCard = ({response, isLast, currentTab}) => {

  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()
  const isArchive = response.chatLinkStatus.code === "archive" && currentTab !== "archive"
  const navigate = useNavigate()
  const handleGoToResponse = () => {
    const url = `/response/${response.requestNumber}/${response.requestId}`
    const isInTabs = tabs.find((tab) => tab === url)

    navigate(url, {
      state: {fromApp: true}
    })

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
  }

  const canHover = window.matchMedia('(hover: hover)').matches;
  const [showTooltip, setShowTooltip] = useState(false)
  const tooltipRef = useRef(null);

  // клик вне тултипа
  useEffect(() => {
    if (!showTooltip) return;

    const handleClickOutside = (e) => {
      if (tooltipRef.current && !tooltipRef.current.contains(e.target)) {
        setShowTooltip(false);
      }
    }

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    }
  }, [showTooltip])

  return (
    <div className={`${s.card} ${isLast ? s.lastCard : ''}`}>
      <div className={s.leftBlock}>
        <img onClick={handleGoToResponse} className={`${s.img} ${response.picture ? '' : s.imgWithBorder}`}
             src={response.picture ? response.picture : placeHolderImg} alt=""/>
        <div className={s.descBlock}>
          <div onClick={handleGoToResponse} className={`${s.title} ${isArchive ? s.titleArchived : ''}`}>
            {response.title}
          </div>
          <div className={s.geoCat}>
            <div className={s.city}>{response.regionName}</div>
            <ul className={s.cats}>
              {
                response.categoryNames.map((cat, i) => <li className={`${s.cat} ${isArchive ? s.catArchived : ""}`}
                                                           key={i}>{cat}</li>)
              }
            </ul>

          </div>
        </div>

        {
          response.hasChanges && (
            <div
              ref={tooltipRef}
              className={s.infoIcon}
              onMouseEnter={() => canHover && setShowTooltip(true)}
              onMouseLeave={() => canHover && setShowTooltip(false)}
              onClick={() => !canHover && setShowTooltip(prev => !prev)}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00776 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.14409 13.2599 3.36475 11.9476 2.05242C10.6353 0.740087 8.85592 0.00195988 7 0ZM7 12.9231C5.82853 12.9231 4.68336 12.5757 3.70932 11.9249C2.73527 11.274 1.9761 10.349 1.52779 9.26666C1.07949 8.18436 0.962193 6.99343 1.19074 5.84446C1.41928 4.6955 1.9834 3.64011 2.81175 2.81175C3.64011 1.98339 4.6955 1.41928 5.84447 1.19073C6.99343 0.96219 8.18436 1.07949 9.26667 1.52779C10.349 1.97609 11.274 2.73527 11.9249 3.70931C12.5757 4.68336 12.9231 5.82853 12.9231 7C12.9213 8.57035 12.2967 10.0759 11.1863 11.1863C10.0759 12.2967 8.57035 12.9213 7 12.9231ZM6.46154 7.53846V3.76923C6.46154 3.62642 6.51827 3.48946 6.61925 3.38848C6.72023 3.2875 6.85719 3.23077 7 3.23077C7.14281 3.23077 7.27977 3.2875 7.38075 3.38848C7.48173 3.48946 7.53846 3.62642 7.53846 3.76923V7.53846C7.53846 7.68127 7.48173 7.81823 7.38075 7.91921C7.27977 8.02019 7.14281 8.07692 7 8.07692C6.85719 8.07692 6.72023 8.02019 6.61925 7.91921C6.51827 7.81823 6.46154 7.68127 6.46154 7.53846ZM7.80769 9.96154C7.80769 10.1213 7.76032 10.2774 7.67157 10.4103C7.58282 10.5431 7.45668 10.6466 7.30909 10.7077C7.16151 10.7689 6.99911 10.7849 6.84243 10.7537C6.68575 10.7225 6.54183 10.6456 6.42888 10.5327C6.31592 10.4197 6.23899 10.2758 6.20783 10.1191C6.17666 9.96243 6.19266 9.80003 6.25379 9.65245C6.31492 9.50486 6.41845 9.37872 6.55127 9.28997C6.6841 9.20121 6.84026 9.15384 7 9.15384C7.21422 9.15384 7.41965 9.23894 7.57113 9.39041C7.7226 9.54188 7.80769 9.74732 7.80769 9.96154Z"
                  fill="#B0822F"/>
              </svg>
            </div>
          )
        }

        {
           showTooltip && (
            <div className={s.tooltip}>
              Заказчик внёс изменения в&nbsp;заявку. Проверьте актуальность условий перед&nbsp;ответом.
            </div>
          )
        }
      </div>

      <div className={s.middleBlock}>
        <div className={s.clientCell}>
          <div className={`${s.initialsCircle} ${isArchive ? s.initialsCircleArchived : ""}`}>
            {getInitials(response.ownerDisplayName)}
          </div>
          <div className={s.companyName}>{response.ownerDisplayName}</div>
        </div>

        <div className={s.statusCell}>
          <div
            className={s.commonBadge}
            style={{
              color: statusColors[response.chatLinkStatus.theme].color,
              background: statusColors[response.chatLinkStatus.theme].backgroundColor,
              border: statusColors[response.chatLinkStatus.theme].border
            }}
          >
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="6" height="6" rx="3" fill="currentColor"/>
            </svg>
            <span className={s.badgeText}>{response.chatLinkStatus.label}</span>
          </div>
          <div className={s.unreadMessages}>3</div>
        </div>
      </div>
      <div className={s.rightBlock}>
        <div className={s.lastMessageCell}>
          <div
            className={`${s.lastMessageText} ${response.lastMessageAttachmentType && !response.lastMessageText && s.attached} `}>{
            response.lastMessageText ? response.lastMessageText : response.lastMessageAttachmentType ? "Прикреплены файлы" : ""
          }</div>
        </div>
        <div className={s.dateCell}>{formatChatDate(response.respondedAt)}</div>
        <div className={s.iconWrapper}>
          <svg width="11" height="10" viewBox="0 0 11 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M3.76923 3.875C3.76923 3.92473 3.74897 3.97242 3.71291 4.00758C3.67684 4.04275 3.62793 4.0625 3.57692 4.0625C3.52592 4.0625 3.47701 4.04275 3.44094 4.00758C3.40488 3.97242 3.38462 3.92473 3.38462 3.875C3.38462 3.82527 3.40488 3.77758 3.44094 3.74242C3.47701 3.70726 3.52592 3.6875 3.57692 3.6875C3.62793 3.6875 3.67684 3.70726 3.71291 3.74242C3.74897 3.77758 3.76923 3.82527 3.76923 3.875ZM3.76923 3.875H3.57692M5.69231 3.875C5.69231 3.92473 5.67205 3.97242 5.63598 4.00758C5.59992 4.04275 5.551 4.0625 5.5 4.0625C5.449 4.0625 5.40008 4.04275 5.36402 4.00758C5.32795 3.97242 5.30769 3.92473 5.30769 3.875C5.30769 3.82527 5.32795 3.77758 5.36402 3.74242C5.40008 3.70726 5.449 3.6875 5.5 3.6875C5.551 3.6875 5.59992 3.70726 5.63598 3.74242C5.67205 3.77758 5.69231 3.82527 5.69231 3.875ZM5.69231 3.875H5.5M7.61539 3.875C7.61539 3.92473 7.59512 3.97242 7.55906 4.00758C7.52299 4.04275 7.47408 4.0625 7.42308 4.0625C7.37207 4.0625 7.32316 4.04275 7.2871 4.00758C7.25103 3.97242 7.23077 3.92473 7.23077 3.875C7.23077 3.82527 7.25103 3.77758 7.2871 3.74242C7.32316 3.70726 7.37207 3.6875 7.42308 3.6875C7.47408 3.6875 7.52299 3.70726 7.55906 3.74242C7.59512 3.77758 7.61539 3.82527 7.61539 3.875ZM7.61539 3.875H7.42308M0.5 5.38C0.5 6.18 1.0759 6.877 1.88821 6.9935C2.44564 7.0735 3.00872 7.135 3.57692 7.178V9.5L5.72256 7.4085C5.8288 7.30533 5.97163 7.2459 6.12154 7.2425C7.12237 7.21849 8.12078 7.13534 9.11128 6.9935C9.9241 6.877 10.5 6.1805 10.5 5.3795V2.3705C10.5 1.5695 9.9241 0.873001 9.11179 0.756501C7.91588 0.585358 6.70873 0.49963 5.5 0.500001C4.27333 0.500001 3.06718 0.587501 1.88821 0.756501C1.0759 0.873001 0.5 1.57 0.5 2.3705V5.3795V5.38Z"
              stroke="#9CA3AF" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  )
}

export default ResponseCard;