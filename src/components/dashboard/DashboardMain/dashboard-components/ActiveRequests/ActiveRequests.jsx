import s from './ActiveRequests.module.scss';
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import DashboardEmptyRequests
  from "@/components/dashboard/DashboardMain/dashboard-components/ActiveRequests/DashboardEmptyRequests/DashboardEmptyRequests.jsx";
import DashboardRequestCard
  from "@/components/dashboard/DashboardMain/dashboard-components/ActiveRequests/DashboardRequestCard/DashboardRequestCard.jsx";

const ActiveRequests = ({requests, setRequestToEdit}) => {

  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleGoToRequests = () => {
    const url = "/manage-requests/my-requests"
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
    <div className={s.requests}>
      <div className={s.header}>
        <div className={s.title}>Активные заявки</div>
        <div className={s.goToAll} onClick={handleGoToRequests}>
          <span>Все заявки</span>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8125 4.875L11 2.6875L8.8125 0.5M11 2.6875H0.5" stroke="#3D4A66" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {
        requests.length === 0 && <DashboardEmptyRequests setRequestToEdit={setRequestToEdit}/>
      }
      <ul className={`${s.requestsList} scroll`}>
        {
          requests.map((request) => <DashboardRequestCard key={request.requestId} request={request}/>)
        }
      </ul>
    </div>
  )
}

export default ActiveRequests;