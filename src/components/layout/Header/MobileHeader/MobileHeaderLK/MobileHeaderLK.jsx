import s from './MobileHeaderLK.module.scss';
import {Link} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";
import MobileMenuLK from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuLK.jsx";

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

            <MobileMenuLK />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderLk;