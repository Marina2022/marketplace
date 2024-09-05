import React from 'react';
import s from './MobileHeader.module.scss'
import hamburger from "@/assets/img/header/hamburger.svg";
import {Link} from "react-router-dom";
import logo from "@/assets/img/header/logo.svg";
import HeaderSearch from "@/components/layout/Header/HeaderSearch/HeaderSearch.jsx";
import cartIcon from "@/assets/img/header/userMenu/cart.svg";

const MobileHeader = () => {
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