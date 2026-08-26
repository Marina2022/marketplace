import s from './Header.module.scss'
import {useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated, getUserStatus, setIsLoginPopupOpened} from "@/store/userSlice.js";
import HeaderSearch from "@/components/layout/Header/HeaderSearch/HeaderSearch.jsx";
import UserDropdown from "@/components/layout/Header/UserDropdown/UserDropdown.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useEffect, useState} from "react";
import UserBalance from "@/components/layout/Header/UserBalance/UserBalance.jsx";
import Geo from "@/components/layout/Header/Geo/Geo.jsx";

const Header = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const userLoadingStatus = useSelector(getUserStatus)
  const isMobile = useMobileScreen()

  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const location = useLocation();

  useEffect(() => {
    setTimeout(() => {
      setCategoryDropdownOpen(false)
    }, 400)

  }, [location]);



  // скроллбар убираем
  useEffect(() => {
    if (categoryDropdownOpen) {
      document.documentElement.style.overflowY = 'hidden';
    } else {
      document.documentElement.style.overflowY = 'auto';
    }
  }, [categoryDropdownOpen]);

  const dispatch = useDispatch()

  // if (isMobile) {
  //   return <MobileHeaderLk/>
  // }

  if (isMobile) return null

  const handleLogin = () => {
    dispatch(setIsLoginPopupOpened(true))
  }

  return (
    <header className={s.header}>
      <div className={s.wrapper}>
        <div className={s.geoWrapper}>
          <Geo/>
        </div>
        <HeaderSearch/>

        <div className={s.userMenu}>

          {
            // isAuthenticated && userLoadingStatus !== 'loading' && <UserDropdown/>

            isAuthenticated && userLoadingStatus !== 'loading' && (
              <div className={s.userMenuWithAuth}>
                <UserBalance/>
                <UserDropdown/>
              </div>
            )
          }

          {
            !isAuthenticated && userLoadingStatus !== 'loading' && <button className={s.loginBtn} onClick={handleLogin}>
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.55621 14.1693H4.25065C3.87493 14.1693 3.51459 14.02 3.24892 13.7543C2.98324 13.4887 2.83398 13.1283 2.83398 12.7526V4.2526C2.83398 3.87688 2.98324 3.51655 3.24892 3.25087C3.51459 2.98519 3.87493 2.83594 4.25065 2.83594H7.55621M10.3895 5.66927L13.2229 8.5026L10.3895 11.3359M13.2229 8.5026H6.13954"
                  stroke="white" strokeWidth="1.51111" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Войти</span>
            </button>
          }
        </div>
      </div>
    </header>
  )
}
export default Header;

