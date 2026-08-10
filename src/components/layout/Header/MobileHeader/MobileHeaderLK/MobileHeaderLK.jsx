import s from './MobileHeaderLK.module.scss';
import {Link, useLocation} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";
import MobileMenuLK from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuLK.jsx";
import {useSelector} from "react-redux";

const MobileHeaderLk = () => {

  const isAuth = useSelector(state => state.user.isAuthenticated)

  const urlsWithoutCommonHeader = [
    "/search-keywords"
  ]

  const location = useLocation()

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