// import Header from "@/components/layout/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import MobileBottomMenu from "@/components/layout/MobileBottomMenu/MobileBottomMenu.jsx";
import s from './MainLayout.module.scss'
import Header from "@/components/layout/Header/Header.jsx";
import MainMenu from "@/components/layout/MainMenu/MainMenu.jsx";
import Submenu from "@/components/layout/Submenu/Submenu.jsx";
import Tabs from "@/components/layout/Tabs/Tabs.jsx";

const MainLayout = () => {
  return (
    <main>
      <div className={s.layoutDesk}>
        <MainMenu/>

        <div className={s.rightPart}>
          <Header/>

          <div className={s.underHeaderPart}>
            <Submenu/>

            <div className={s.contentWithTabs}>
              <Tabs/>
              <div className={s.contentWrapper}>
                <Outlet/>
              </div>
            </div>
          </div>
        </div>
      </div>
      <MobileBottomMenu/>
    </main>
  );
};

export default MainLayout;

{/*<SideMainMenu/>*/
}
{/*<SideSubMenu/>*/
}