import s from './LkMainPage.module.scss';
import {useEffect} from "react";
import MainTab from "@/components/lk-InnerPages/LkMainPage/MainTab/MainTab.jsx";
import CompaniesTab from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesTab.jsx";
import ProfileTab from "@/components/lk-InnerPages/LkMainPage/ProfileTab/ProfileTab.jsx";
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
    <div className={s.lkMain}>

      <div className={s.mobileTabsWrapper}>
        <ul className={s.mobileTabs}>
          {
            tabs.map((tab, i) => <div
              className={activeTab === i ? s.mobileTabItemActive : s.mobileTabItem}
              key={i}
              onClick={() => dispatch(setActiveTabInMain(i))}>
              {tab}
            </div>)
          }
        </ul>
      </div>

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
        activeTab === 2 && <ProfileTab/>
      }

      {
        activeTab === 3 && <SettingsTab/>
      }


    </div>
  );
};

export default LkMainPage;