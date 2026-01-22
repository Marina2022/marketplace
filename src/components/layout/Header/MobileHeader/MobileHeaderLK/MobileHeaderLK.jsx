import s from './MobileHeaderLK.module.scss';
import {Link} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import hamburger from "@/assets/img/header/hamburger.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";

const MobileHeaderLk = () => {
  return (
    <header className={s.headerLK}>
      <div className='container'>
        <div className={s.wrapper}>
          <ProfileInMobileHeader />
          <div className={s.lkHeaderButtons}>
            <Link className={s.cartBtnOnMobile} to="/chat">
              <img src={chatIcon} alt="chat"/>
            </Link>
            <button><img src={hamburger} alt="menu"/></button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderLk;