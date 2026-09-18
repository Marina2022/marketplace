import s from './DashboardRequestCard.module.scss';
import {formatPinned, formatResponses} from "@/utils/responses.js";
import {statusColors} from "@/consts/requests.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTabs, setTabs} from "@/store/tabsSlice.js";

const DashboardRequestCard = ({request}) => {

  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleGoToRequest = () => {
    const url = `/request/${request.requestNumber}/${request.requestId}`
    const isInTabs = tabs.find((tab) => tab === url)
    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
    navigate(url, {
      state: {fromApp: true}
    })
  }

  return (
    <li className={s.requestCard}>
      <img onClick={handleGoToRequest} className={s.img} src={request.picture} alt=""/>
      <div className={s.desc}>
        <div onClick={handleGoToRequest} className={s.title}>{request.title}</div>
        <div className={s.stats}>
          <div>
            {
              request.regionName
            }
          </div>
          {
            request.totalResponses > 0 && (
              <div className={s.statItem}>
                <span>·</span>
                <span>{formatResponses(request.totalResponses)}</span>
              </div>
            )
          }
          {
            request.pinnedChatsCount > 0 && (
              <div className={s.statItem}>
                <span>·</span>
                <span>{formatPinned(request.pinnedChatsCount)}</span>
              </div>
            )
          }
        </div>
      </div>
      <div className={s.rightBlock}>
        <div className={s.number}>{request.requestNumber}</div>
        <div
          className={s.requestStatus}
          style={{
            color: statusColors[request.status.theme].color,
            background: statusColors[request.status.theme].backgroundColor,
            border: statusColors[request.status.theme].border
          }}
        >
          <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="6" rx="3" fill="currentColor"/>
          </svg>
          <span>{request.status.label}</span>
        </div>
      </div>
    </li>
  )
}

export default DashboardRequestCard;