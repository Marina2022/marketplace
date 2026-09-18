import s from './RecentResponse.module.scss';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import DashboardEmptyResponses
  from "@/components/dashboard/DashboardMain/dashboard-components/RecentResponse/DashboardEmptyResponses/DashboardEmptyResponses.jsx";
import DashboardResponseCard
  from "@/components/dashboard/DashboardMain/dashboard-components/RecentResponse/DashboardResponseCard/DashboardResponseCard.jsx";

const RecentResponse = ({responses}) => {

  const navigate = useNavigate()
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleGoToResponses = () => {
    const url = "/manage-requests/my-responses"
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
    <div className={s.responses}>
      <div className={s.header}>
        <div className={s.title}>Отклики на заявки</div>
        <div className={s.goToAll} onClick={handleGoToResponses}>
          <span>Все отклики</span>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8125 4.875L11 2.6875L8.8125 0.5M11 2.6875H0.5" stroke="#3D4A66" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
      {/*<div className={s.contentWrapper}>*/}
        {
          responses.length === 0 && <DashboardEmptyResponses/>
        }
        <ul className={`${s.responsesList} scroll`}>
          {
            responses.map((response) => <DashboardResponseCard key={response.chatRoomId} response={response} />)
          }
        </ul>
      {/*</div>*/}
    </div>
  )
}

export default RecentResponse;