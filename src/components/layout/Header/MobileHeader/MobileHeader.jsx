import React, {useEffect, useState} from 'react';
import s from './MobileHeader.module.scss'
import hamburger from "@/assets/img/header/hamburger.svg";
import {Link, useLocation} from "react-router-dom";
import logo from "@/assets/img/header/logo.svg";
import HeaderSearch from "@/components/layout/Header/HeaderSearch/HeaderSearch.jsx";
import cartIcon from "@/assets/img/header/userMenu/cart.svg";
import MobileHeaderLk from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileHeaderLK.jsx";

const MobileHeader = () => {

  const location = useLocation();
  const {pathname} = location;
  const [headerType, setHeaderType] = useState("default");

  useEffect(() => {
    if (pathname.startsWith("/lk")) {
      setHeaderType('lk')
    } else {
      setHeaderType('none')
    }
  }, [pathname]);


  if (headerType === 'lk') return <MobileHeaderLk />

  return (
    <header className={s.header}>
      <div className='container'>
        <div className={s.wrapper}>
          <button className={s.mobileMenuBtn}><img src={hamburger} alt="menu"/></button>
          <Link className={s.logoLink} to="/">
            <img className={s.logo} src={logo} alt="logo"/>
          </Link>
          <Link className={s.cartBtnOnMobile} to="/cart">
            <img src={cartIcon} alt="cart"/>
          </Link>
        </div>
        <HeaderSearch/>
        <div className={s.geoDiv}>
          {/*Москва...*/}
        </div>
      </div>
    </header>
  );
};

export default MobileHeader;