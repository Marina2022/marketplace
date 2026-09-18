import s from './DashboardResponseCard.module.scss';
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {statusColors} from "@/consts/requests.jsx";
import {formatChatDateForDashboard} from "@/utils/dashboard.js";

const DashboardResponseCard = ({response}) => {

  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleGoToRequest = () => {
    const url = `/response/${response.requestNumber}/${response.requestId}` // todo
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
      <img onClick={handleGoToRequest} className={s.img} src={response.picture} alt=""/>
      <div className={s.desc}>
        <div onClick={handleGoToRequest} className={s.title}>{response.requestTitle}</div>
        <div className={s.stats}>
          <div>
            {response.ownerName}
          </div>
          <div className={s.statItem}>
            <span>·</span>
            <span>{response.regionName}</span>
          </div>
        </div>
      </div>
      <div className={s.rightBlock}>
        <div className={s.number}>{formatChatDateForDashboard(response.lastMessageAt)}</div>
        {
          response.unreadCount ?
            <div className={s.unreadCount}>{response.unreadCount}</div>
            : (
              <div
                className={s.requestStatus}
                style={{
                  color: statusColors[response.status.theme].color,
                  background: statusColors[response.status.theme].backgroundColor,
                  border: statusColors[response.status.theme].border
                }}
              >
                <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect width="6" height="6" rx="3" fill="currentColor"/>
                </svg>
                <span>{response.status.label}</span>
              </div>
            )
        }
      </div>
    </li>
  )
}

export default DashboardResponseCard;