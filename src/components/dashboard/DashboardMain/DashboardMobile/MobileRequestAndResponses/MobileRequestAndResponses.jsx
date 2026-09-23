import s from './MobileRequestAndResponses.module.scss';
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import ActiveRequests
  from "@/components/dashboard/DashboardMain/dashboard-components/ActiveRequests/ActiveRequests.jsx";
import RecentResponse
  from "@/components/dashboard/DashboardMain/dashboard-components/RecentResponse/RecentResponse.jsx";

const MobileRequestAndResponses = ({data, setRequestToEdit}) => {
  const [tab, setTab] = useState("requests") // requests | responses
  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleGoToAll = () => {
    let url = "/manage-requests/my-requests"
    if (tab === "responses") url = "/manage-requests/my-responses"

    const isInTabs = tabs.find((tab) => tab === url)
    navigate(url, {
      state: {fromApp: true}
    })

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
  }

  return (
    <div className={s.mobileRequestAndResponses}>
      <div className={s.header}>
        <div className={s.tabs}>
          <div onClick={() => setTab("requests")} className={`${s.tab} ${tab === "requests" ? s.tabActive : ""} `}>
            Активные заявки
          </div>
          <div onClick={() => setTab("responses")} className={`${s.tab} ${tab === "responses" ? s.tabActive : ""} `}>
            Отклики на заявки
          </div>
        </div>
        <div className={s.goToAll} onClick={handleGoToAll}>
          <span>Все</span>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8125 4.875L11 2.6875L8.8125 0.5M11 2.6875H0.5" stroke="#3D4A66" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {
        tab === "requests" && <ActiveRequests requests={data.recentRequests} setRequestToEdit={setRequestToEdit}/>
      }
      {
        tab === "responses" && <RecentResponse responses={data.recentResponses}/>
      }
    </div>
  )
}

export default MobileRequestAndResponses;