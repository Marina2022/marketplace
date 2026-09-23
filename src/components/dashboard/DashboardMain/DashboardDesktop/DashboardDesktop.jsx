import s from './DashboardDesktop.module.scss';
import DashboardSummery
  from "@/components/dashboard/DashboardMain/dashboard-components/DasboardSummery/DashboardSummery.jsx";
import {dashboardFormatDateRu} from "@/utils/dashboard.js";
import Events from "@/components/dashboard/DashboardMain/dashboard-components/Events/Events.jsx";
import ActiveRequests
  from "@/components/dashboard/DashboardMain/dashboard-components/ActiveRequests/ActiveRequests.jsx";
import RecentResponse
  from "@/components/dashboard/DashboardMain/dashboard-components/RecentResponse/RecentResponse.jsx";
import Subscriptions from "@/components/dashboard/DashboardMain/dashboard-components/Subscriptions/Subscriptions.jsx";
import QuickActions from "@/components/dashboard/DashboardMain/dashboard-components/QuickActions/QuickActions.jsx";

const DashboardDesktop = ({data, setRequestToEdit}) => {

  return (
    <div className={s.dashboardDesktop}>
      <div className={s.header}>
        <div className={s.title}>Обзор</div>
        <div className={s.subtitle}>{dashboardFormatDateRu(data.date)}</div>
      </div>
      <DashboardSummery data={data}/>
      <div className={s.mainBlock}>
        <div className={s.leftBlock}>
          <Events events={data.events}/>
        </div>
        <div className={s.middleBlock}>
          <div className={`${s.activeRequests}`}>
            <ActiveRequests requests={data.recentRequests} setRequestToEdit={setRequestToEdit}/>
          </div>
          <div className={`${s.responses}`}>
            <RecentResponse responses={data.recentResponses}/>
          </div>
        </div>
        <div className={s.rightBlock}>
          <Subscriptions/>
          <QuickActions data={data}/>
        </div>
      </div>
    </div>
  )
}

export default DashboardDesktop;