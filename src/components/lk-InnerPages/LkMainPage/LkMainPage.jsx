import s from './LkMainPage.module.scss';
import {useState} from "react";
import MainTab from "@/components/lk-InnerPages/LkMainPage/MainTab/MainTab.jsx";
import CompaniesTab from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesTab.jsx";
import ProfilesTab from "@/components/lk-InnerPages/LkMainPage/ProfilesTab/ProfilesTab.jsx";
import SettingsTab from "@/components/lk-InnerPages/LkMainPage/SettingsTab/SettingsTab.jsx";

const LkMainPage = () => {
  
  // потом еще будет в location приходить вкладка
  const [activeTab, setActiveTab] = useState(0)
  
  const tabs = ['Главная', 'Организации', 'Профиль пользователя', 'Настройки аккаунта']
 
  
  
  return (
    <div>

      <ul className={s.tabs}>
        {
          tabs.map((tab,i)=><div className={s.tabItem} key={i} onClick={()=>setActiveTab(i)}>{tab}</div>)
        }
        
      </ul>


      {
        activeTab === 0 && <MainTab />
      }

      {
        activeTab === 1 && <CompaniesTab />
      }

      {
        activeTab === 2 && <ProfilesTab />
      }

      {
        activeTab === 3 && <SettingsTab />
      }

      
    </div>
  );
};

export default LkMainPage;