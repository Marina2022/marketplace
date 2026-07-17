import s from './MobileHeaderLK.module.scss';
import {Link} from "react-router-dom";
import chatIcon from "@/assets/img/header/userMenu/chat.svg";
import ProfileInMobileHeader
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/ProfileInMobileHeader.jsx";
import MobileMenuLK from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuLK.jsx";
import {useState} from "react";

const MobileHeaderLk = () => {

  const [showCloseBtn, setShowCloseBtn] = useState(false);

  return (
    <header className={s.headerLK}>
      <div className='container'>
        <div className={s.wrapper}>
          <ProfileInMobileHeader setShowCloseBtn={setShowCloseBtn} />
          <div className={s.lkHeaderButtons}>
            <Link className={s.cartBtnOnMobile} to="/chat">
              <img src={chatIcon} alt="chat"/>
            </Link>
            <MobileMenuLK showCloseBtn={showCloseBtn} setShowCloseBtn={setShowCloseBtn} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default MobileHeaderLk;