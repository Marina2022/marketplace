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
import {getCart} from "@/store/cartSlice.js";
import HeaderSearch from "@/components/layout/Header/HeaderSearch/HeaderSearch.jsx";
import UserDropdown from "@/components/layout/Header/UserDropdown/UserDropdown.jsx";
import Login from "@/components/layout/Header/Login/Login.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobileHeader from "@/components/layout/Header/MobileHeader/MobileHeader.jsx";
import {getActiveOrders} from "@/store/ordersSlice.js";
import CategoryDropdownDesktop
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/CategoryDropdownDesktop.jsx";
import categoryDropdownDesktop
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/CategoryDropdownDesktop.jsx";
import {useEffect, useState} from "react";

const Header = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const userLoadingStatus = useSelector(getUserStatus)
  const isMobile = useMobileScreen()
  const favs = useSelector(getFavs)
  const cart = useSelector(getCart)
  const orders = useSelector(getActiveOrders)


  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false)

  const handleCatalogBtnClick = () => {
    setCategoryDropdownOpen(prev => !prev)
  }

  // скроллбар убираем
  useEffect(() => {
    if (categoryDropdownOpen) {
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = 'auto';
    }
  }, [categoryDropdownOpen]);

  let productsTotal
  if (cart?.cartItems) {
    productsTotal = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }

  if (isMobile) {
    return <MobileHeader/>
  }

  return (
    <header className={s.header}>
      <div className={s.topHeaderPart}></div>
      <div className='container'>
        <div className={s.wrapper}>
          <Link className={s.logoLink} to="/">
            <img className={s.logo} src={logo} alt="logo"/>
          </Link>


          <button onClick={handleCatalogBtnClick} className={s.catalogBtn}>
            <img className={s.catalogBtnIcon} src={catalogBtnIcon}/>
            <span>Каталог</span>
          </button>

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
              <Link className={s.menuItemLink} to="/lk/orders">
                <div className={s.menuItemImgWrapper}>
                  <img className={s.menuItemImg} src={orderIcon} alt="orders"/>
                  {
                    orders && orders.length > 0 && <div className={s.menuItemBadge}>{orders.length}</div>
                  }
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
                !isAuthenticated && userLoadingStatus !== 'loading' && <Login/>
              }
            </li>
          </ul>
        </div>
      </div>

      {
        categoryDropdownOpen && <CategoryDropdownDesktop setCategoryDropdownOpen={setCategoryDropdownOpen} />
      }

    </header>
  )
}
export default Header;