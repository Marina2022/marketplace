import s from './MobileHeaderLK.module.scss';
import {Link} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";
import MobileMenuLK from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuLK.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";

const MobileHeaderLk = () => {

  const [showCloseBtn, setShowCloseBtn] = useState(false);
  const isAuth = useSelector(state => state.user.isAuthenticated)

  return (
    <header className={s.headerLK}>
      <div className='container'>
        <div className={s.wrapper}>

          {
            isAuth && (
              <ProfileInMobileHeader setShowCloseBtn={setShowCloseBtn}/>
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
              <MobileMenuLK showCloseBtn={showCloseBtn} setShowCloseBtn={setShowCloseBtn}/>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderLk;