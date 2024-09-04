import s from './LkMainPage.module.scss';
import {useEffect} from "react";
import MainTab from "@/components/lk-InnerPages/LkMainPage/MainTab/MainTab.jsx";
import CompaniesTab from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesTab.jsx";
import ProfilesTab from "@/components/lk-InnerPages/LkMainPage/ProfilesTab/ProfilesTab.jsx";
import SettingsTab from "@/components/lk-InnerPages/LkMainPage/SettingsTab/SettingsTab.jsx";
import {getActiveTabInMain, setActiveTabInMain} from "@/store/lkSlice.js";
import {useDispatch, useSelector} from "react-redux";

const LkMainPage = () => {

  useEffect(() => {
    return ()=>{
      dispatch(setActiveTabInMain(0))
    }
  }, []);
  
  const activeTab = useSelector(getActiveTabInMain)
  const tabs = ['Главная', 'Организации', 'Профиль пользователя', 'Настройки аккаунта']
  const dispatch = useDispatch()

  return (
    <div>

      <ul className={s.tabs}>
        {
          tabs.map((tab, i) => <div
            className={activeTab === i ? s.tabItemActive : s.tabItem}
            key={i}
            onClick={() => dispatch(setActiveTabInMain(i))}>
            {tab}
          </div>)
        }

      </ul>


      {
        activeTab === 0 && <MainTab/>
      }

      {
        activeTab === 1 && <CompaniesTab/>
      }

      {
        activeTab === 2 && <ProfilesTab/>
      }

      {
        activeTab === 3 && <SettingsTab/>
      }


    </div>
  );
};

export default LkMainPage;