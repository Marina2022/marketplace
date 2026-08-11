import s from './MobileHeaderLK.module.scss';
import {Link, useLocation} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";
import MobileMenuLK from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuLK.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated, getUserStatus, setIsLoginPopupOpened} from "@/store/userSlice.js";

const MobileHeaderLk = () => {

  const isAuth = useSelector(state => state.user.isAuthenticated)

  const urlsWithoutCommonHeader = [
    "/search-keywords"
  ]

  const location = useLocation()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const userLoadingStatus = useSelector(getUserStatus)
  const dispatch = useDispatch()

  const handleLogin = () => {
    dispatch(setIsLoginPopupOpened(true))
  }

  if (urlsWithoutCommonHeader.includes(location.pathname)) {
    return null
  }

  return (
    <header className={s.headerLK}>
      <div className='container'>
        <div className={s.wrapper}>

          {
            isAuth && (
              <ProfileInMobileHeader/>
            )
          }

          {
            !isAuthenticated && userLoadingStatus !== 'loading' && <button className={s.loginBtn} onClick={handleLogin} >
              <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.55621 14.1693H4.25065C3.87493 14.1693 3.51459 14.02 3.24892 13.7543C2.98324 13.4887 2.83398 13.1283 2.83398 12.7526V4.2526C2.83398 3.87688 2.98324 3.51655 3.24892 3.25087C3.51459 2.98519 3.87493 2.83594 4.25065 2.83594H7.55621M10.3895 5.66927L13.2229 8.5026L10.3895 11.3359M13.2229 8.5026H6.13954"
                  stroke="white" strokeWidth="1.51111" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Войти</span>
            </button>
          }

          <div className={s.lkHeaderButtons}>

            {
              isAuth && (
                <Link className={s.cartBtnOnMobile} to="/chat">
                  <img src={chatIcon} alt="chat"/>
                </Link>
              )
            }

            <div className={s.burgerBtn}>
              <MobileMenuLK/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderLk;