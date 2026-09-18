import s from './DashboardMobile.module.scss';
import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";
import DashboardSummery
  from "@/components/dashboard/DashboardMain/dashboard-components/DasboardSummery/DashboardSummery.jsx";
import Events from "@/components/dashboard/DashboardMain/dashboard-components/Events/Events.jsx";
import MobileRequestAndResponses
  from "@/components/dashboard/DashboardMain/DashboardMobile/MobileRequestAndResponses/MobileRequestAndResponses.jsx";
import Subscriptions from "@/components/dashboard/DashboardMain/dashboard-components/Subscriptions/Subscriptions.jsx";
import QuickActions from "@/components/dashboard/DashboardMain/dashboard-components/QuickActions/QuickActions.jsx";

const DashboardMobile = ({data, setRequestToEdit}) => {
  return (
    <div className={`${s.dashboardMobile} scroll`}>
      <MobileHeaderLk/>
      <div className={s.dashboardMobileContent}>
        <DashboardSummery data={data}/>
        <MobileRequestAndResponses data={data} setRequestToEdit={setRequestToEdit}/>
        <Events events={data.events}/>
        <QuickActions data={data}/>
        <Subscriptions/>
      </div>
    </div>
  )
}

export default DashboardMobile;