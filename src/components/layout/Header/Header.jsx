import s from './Header.module.scss'
import logo from '@/assets/img/header/logo.svg'
import {Link} from "react-router-dom";
import {useSelector} from "react-redux";
import {getIsAuthenticated, getUserStatus} from "@/store/userSlice.js";
import {getFavs} from "@/store/favSlice.js";
import catalogBtnIcon from '@/assets/img/header/catalogBtnIcon.svg'
import heartIcon from '@/assets/img/header/userMenu/heart.svg'
import orderIcon from '@/assets/img/header/userMenu/orders.svg'
import cartIcon from '@/assets/img/header/userMenu/cart.svg'
import userIcon from '@/assets/img/header/userMenu/user.svg'
import hamburger from '@/assets/img/header/hamburger.svg'
import {getCart} from "@/store/cartSlice.js";
import HeaderSearch from "@/components/layout/Header/HeaderSearch/HeaderSearch.jsx";
import UserDropdown from "@/components/layout/Header/UserDropdown/UserDropdown.jsx";
import Login from "@/components/layout/Header/Login/Login.jsx";

const Header = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const userLoadingStatus = useSelector(getUserStatus)

  const favs = useSelector(getFavs)
  const cart = useSelector(getCart)

  //const user = useSelector(getUserData)
  // console.log('user из хедера', user)

  let productsTotal
  if (cart?.cartItems) {
    productsTotal = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  return (
    <header className={s.header}>
      <div className={s.topHeaderPart}></div>
      <div className='container'>
        <div className={s.wrapper}>
          <button className={s.mobileMenuBtn}><img src={hamburger} alt="menu"/></button>
          <Link className={s.logoLink} to="/">
            <img className={s.logo} src={logo} alt="logo"/>
          </Link>
          <Link to="/category/smartfoni-781001bc-3a72-4e5b-8d2a-ee22e0ea7b0a" className={s.catalogBtn}><img
            className={s.catalogBtnIcon} src={catalogBtnIcon}/><span>Каталог</span></Link>

          <HeaderSearch/>

          <ul className={s.userMenu}>
            <li className={s.userMenuItem}>
              <Link className={s.menuItemLink} to="/favourites">
                <div className={s.menuItemImgWrapper}>
                  <img className={s.menuItemImg} src={heartIcon} alt="favourites"/>
                  {
                    favs?.length > 0 && <div className={s.menuItemBadge}>{favs.length}</div>
                  }
                </div>
                <div className={s.menuItemLabel}>Избранное</div>
              </Link>
            </li>
            <li className={s.userMenuItem}>
              <Link className={s.menuItemLink} to="/orders">
                <div className={s.menuItemImgWrapper}>
                  <img className={s.menuItemImg} src={orderIcon} alt="orders"/>
                  <div className={s.menuItemBadge}>12</div>
                </div>
                <div className={s.menuItemLabel}>Заказы</div>
              </Link>
            </li>
            <li className={s.userMenuItem}>
              <Link className={s.menuItemLink} to="/cart">
                <div className={s.menuItemImgWrapper}>
                  <img className={s.menuItemImg} src={cartIcon} alt="cart"/>
                  {
                    cart?.cartItems?.length > 0 && <div className={s.menuItemBadge}>
                      {productsTotal}
                    </div>
                  }
                </div>
                <div className={s.menuItemLabel}>Корзина</div>
              </Link>
            </li>
            <li className={s.userMenuItem}>

              {
                isAuthenticated && userLoadingStatus !== 'loading' && <UserDropdown/>
              }

              {
                !isAuthenticated && userLoadingStatus !== 'loading' && <button className={`${s.menuItemLink} `}>
                  <div className={s.menuItemImgWrapper}>
                    <img className={s.menuItemImg} src={userIcon} alt="login"/>
                  </div>                  
                  <Login/>
                </button>
              }
            </li>
          </ul>

          <Link className={s.cartBtnOnMobile} to="/cart">
            <img className={s.menuItemImg} src={cartIcon} alt="cart"/>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header;