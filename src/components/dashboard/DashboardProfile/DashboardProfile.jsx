import s from './DashboardProfile.module.scss';
import UserProfile from "@/components/dashboard/DashboardProfile/UserProfile/UserProfile.jsx";
import Tariff from "@/components/dashboard/DashboardProfile/Tariff/Tariff.jsx";


const DashboardProfile = () => {
  return (
    <div className={s.wrapper}>
      <UserProfile/>
      <Tariff/>
    </div>
  );
};

export default DashboardProfile;