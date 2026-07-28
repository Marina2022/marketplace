// import Header from "@/components/layout/Header/Header.jsx";
import {Outlet} from "react-router-dom";
import MobileBottomMenu from "@/components/layout/MobileBottomMenu/MobileBottomMenu.jsx";
import s from './MainLayout.module.scss'
import Header from "@/components/layout/Header/Header.jsx";
import MainMenu from "@/components/layout/MainMenu/MainMenu.jsx";
import Submenu from "@/components/layout/Submenu/Submenu.jsx";
import Tabs from "@/components/layout/Tabs/Tabs.jsx";
import {getIsLoginPopupShown} from "@/store/userSlice.js";
import {useSelector} from "react-redux";
import LoginPopup from "@/components/layout/LoginPopup/LoginPopup.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import LoginMobile from "@/components/layout/Header/LoginMobile/LoginMobile.jsx";
import {getIsFirstGeoPopupOpen, getIsPopupWithCitiesOpen} from "@/store/geoSlice.js";
import FirstGeoPopup from "@/components/layout/Header/Geo/FirstGeoPopup/FirstGeoPopup.jsx";
import PopupWithCities from "@/components/layout/Header/Geo/PopupWithCities/PopupWithCities.jsx";

const MainLayout = () => {

  const isMobile = useMobileScreen()
  const isLoginPopupOpened = useSelector(getIsLoginPopupShown)

  const isFirstGeoPopupOpen = useSelector(getIsFirstGeoPopupOpen)
  const isPopupWithCitiesOpen = useSelector(getIsPopupWithCitiesOpen)

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

      {
        isLoginPopupOpened && !isMobile && <LoginPopup />
      }

      {
        isLoginPopupOpened && isMobile && <LoginMobile />
      }

      {
        isFirstGeoPopupOpen && <FirstGeoPopup />
      }

      {
        isPopupWithCitiesOpen && <PopupWithCities />
      }

    </main>
  );
};

export default MainLayout;

{/*<SideMainMenu/>*/
}
{/*<SideSubMenu/>*/
}