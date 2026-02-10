import s from './MobileMenuLK.module.scss';
import hamburger from "@/assets/img/header/hamburger.svg";
import closeBtn from "@/assets/img/header/mobileMenu/closeBtn.svg";
import lkIcon from "@/assets/img/header/mobileMenu/lk.svg";
import shopIcon from "@/assets/img/header/mobileMenu/shop.svg";
import ordersIcon from "@/assets/img/header/mobileMenu/orders.svg";
import appIcon from "@/assets/img/header/mobileMenu/requests.svg";
import settingsIcon from "@/assets/img/header/mobileMenu/settings.svg";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useRef, useState} from "react";
import {setActiveTabInMain} from "@/store/lkSlice.js";
import {useDispatch} from "react-redux";
import {setOrdersTab} from "@/store/ordersSlice.js";
import {setSecondFromTopTab, setTopShopTab} from "@/store/lkShopSlice.js";
import {setRequestsTab} from "@/store/requestsSlice.js";


const MobileMenuLk = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(true);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const underlayClickHandler = () => {
    setIsDropdownOpen(false)
  }

  const dropdownClickHandler = (e) => {
    e.stopPropagation();
  }

  const userDropdownWrapperRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownWrapperRef.current &&
        !userDropdownWrapperRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOrganizationsClick = (e) => {
    e.preventDefault()
    dispatch(setActiveTabInMain(1))
    navigate("/lk/main")
  }

  const handleMainClick = (e) => {
    e.preventDefault()
    dispatch(setActiveTabInMain(0))
    navigate("/lk/main")
  }

  const handleProfileClick = (e) => {
    e.preventDefault()
    dispatch(setActiveTabInMain(2))
    navigate("/lk/main")
  }

  const handleSettingsClick = (e) => {
    e.preventDefault()
    dispatch(setActiveTabInMain(3))
    navigate("/lk/main")
  }

  const handleAllOrdersClick = (e) => {
    e.preventDefault()
    dispatch(setOrdersTab(2))
    navigate("/lk/orders")
  }

  const handleActiveOrdersClick = (e) => {
    e.preventDefault()
    dispatch(setOrdersTab(1))
    navigate("/lk/orders")
  }

  const handleShopProfile = (e) => {
    e.preventDefault()
    dispatch(setTopShopTab(4))
    navigate("/lk/shop")
  }

  const handleProductCard = (e) => {
    e.preventDefault()
    dispatch(setTopShopTab(1))
    dispatch(setSecondFromTopTab(1))
    navigate("/lk/shop")
  }

  const handleRequestsTab1 = (e) => {
    e.preventDefault()
    dispatch(setRequestsTab(1))
    navigate("/lk/requests")
  }

  //4.5.6
  const handleRequestsTab3 = (e) => {
    e.preventDefault()
    dispatch(setRequestsTab(3))
    navigate("/lk/requests")
  }

  const handleRequestsTab4 = (e) => {
    e.preventDefault()
    dispatch(setRequestsTab(4))
    navigate("/lk/requests")
  }

  const handleRequestsTab5 = (e) => {
    e.preventDefault()
    dispatch(setRequestsTab(5))
    navigate("/lk/requests")
  }

  const handleRequestsTab6 = (e) => {
    e.preventDefault()
    dispatch(setRequestsTab(6))
    navigate("/lk/requests")
  }

  return (

    <div className={s.userDropdownWrapper} ref={userDropdownWrapperRef}>
      <button className={s.hamburgerBtn} onClick={() => setIsDropdownOpen(prev => !prev)}>
        <img src={isDropdownOpen ? closeBtn : hamburger} alt="menu"/>
      </button>

      {isDropdownOpen && (
        <div className={s.underlay} onClick={underlayClickHandler}>
          <div className={s.dropWrapper} onClick={dropdownClickHandler}>
            <div className={s.dropdown}>
              <div className={s.menuHeader}>
                <h4 className={s.menuTitle}>Меню</h4>
                <button onClick={() => setIsDropdownOpen(false)}>
                  <img src={closeBtn} alt="close"/>
                </button>
              </div>

              <div className={s.menuSection}>
                <h5 className={s.sectionHeader}>
                  <img src={lkIcon} alt="userIcon"/>
                  <span>Личный кабинет</span>
                </h5>
                <div className={s.menuItem}>
                  <Link onClick={handleMainClick} to='lk' className={s.menuItemLink}>
                    Главная
                  </Link>
                </div>
                <div className={s.menuItem}>
                  <Link onClick={handleOrganizationsClick} to='lk' className={s.menuItemLink}>
                    Организации
                  </Link>
                </div>
                <div className={s.menuItem}>
                  <Link onClick={handleProfileClick} to='lk' className={s.menuItemLink}>
                    Профиль пользователя
                  </Link>
                </div>
                <div className={s.menuItem}>
                  <Link onClick={handleSettingsClick} to='lk' className={s.menuItemLink}>
                    Настройки аккаунта
                  </Link>
                </div>
              </div>

              <div className={s.menuSection}>
                <h5 className={s.sectionHeader}>
                  <img src={shopIcon} alt="shopIcon"/>
                  <span>Магазин</span>
                </h5>
                <div className={s.menuItem}>
                  <Link onClick={handleProductCard} to='lk/shop' className={s.menuItemLink}>
                    Карточки товара
                  </Link>
                </div>
                <div className={s.menuItem}>
                  <Link onClick={handleShopProfile} to='lk/shop' className={s.menuItemLink}>
                    Профиль магазина
                  </Link>
                </div>
              </div>

              <div className={s.menuSection}>
                <h5 className={s.sectionHeader}>
                  <img src={ordersIcon} alt="ordersIcon"/>
                  <span>Заказы</span>
                </h5>
                <div className={s.menuItem}>

                  <Link onClick={handleActiveOrdersClick} to='lk/orders' className={s.menuItemLink}>
                    Активные заказы
                  </Link>

                </div>
                <div className={s.menuItem}>

                  <Link onClick={handleAllOrdersClick} to='lk/orders' className={s.menuItemLink}>
                    Все заказы
                  </Link>
                </div>
              </div>

              <div className={s.menuSection}>
                <h5 className={s.sectionHeader}>
                  <img src={appIcon} alt="appIcon"/>
                  <span>Заявки</span>
                </h5>
                <div className={s.menuItem}>
                  <Link onClick={handleRequestsTab1} to='lk/requests' className={s.menuItemLink}>
                    Управление заявками
                  </Link>
                </div>
                <div className={s.menuItem}>
                  <Link onClick={handleRequestsTab3} to='lk/requests' className={s.menuItemLink}>
                    Принятые заявки
                  </Link>
                </div>

                <div className={s.menuItem}>
                  <Link onClick={handleRequestsTab4} to='#' className={s.menuItemLink}>
                    История заявок
                  </Link>
                </div>

                <div className={s.menuItem}>
                  <Link onClick={handleRequestsTab5} to='#' className={s.menuItemLink}>
                    Предложения
                  </Link>
                </div>

                <div className={s.menuItem}>
                  <Link onClick={handleRequestsTab6} to='#' className={s.menuItemLink}>
                    Предложения в работе
                  </Link>
                </div>
              </div>

              <div className={s.menuSection}>
                <Link to='#' className={s.sectionHeader}>
                  <img src={settingsIcon} alt="settingsIcon"/>
                  <span>Настройки</span>
                </Link>
              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenuLk;