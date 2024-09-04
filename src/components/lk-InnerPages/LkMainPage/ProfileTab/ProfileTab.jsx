import s from './ProfileTab.module.scss';
import Tariff from "@/components/lk-InnerPages/LkMainPage/ProfileTab/Tariff/Tariff.jsx";
import UserProfile from "@/components/lk-InnerPages/LkMainPage/ProfileTab/UserProfile/UserProfile.jsx";

const ProfileTab = () => {
  return (
    <div className={s.wrapper}>
      <UserProfile/>
      <Tariff/>
    </div>
  );
};

export default ProfileTab;