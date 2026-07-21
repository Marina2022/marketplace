import s from './MobileBottomMenu.module.scss';
import {Link, useLocation} from "react-router-dom";
import LoginMobile from "@/components/layout/Header/LoginMobile/LoginMobile.jsx";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopupOpened} from "@/store/userSlice.js";

const MobileBottomMenu = () => {

  const location = useLocation()

  const isAuth = useSelector(state => state.user.isAuthenticated)

  const dispatch = useDispatch();

  const handleProtectedLinkClick = (e) => {
    if (!isAuth) {
      e.preventDefault();
      dispatch(setIsLoginPopupOpened(true))
    }
  }

  return (
    <div className={s.menuWrapper}>
      <ul className={s.menu}>
        <li>
          <Link to="/">
            <svg
              className={location.pathname === '/' ? s.menuItemActive : s.menuItem}
              width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z"
                fill="currentColor"/>
              <path
                d="M17.6009 22.5569H6.40094C4.58094 22.5569 2.92094 21.1569 2.62094 19.3669L1.29094 11.3969C1.07094 10.1569 1.68094 8.56689 2.67094 7.77689L9.60094 2.22689C10.9409 1.14689 13.0509 1.15689 14.4009 2.23689L21.3309 7.77689C22.3109 8.56689 22.9109 10.1569 22.7109 11.3969L21.3809 19.3569C21.0809 21.1269 19.3809 22.5569 17.6009 22.5569ZM11.9909 2.92689C11.4609 2.92689 10.9309 3.08689 10.5409 3.39689L3.61094 8.95689C3.05094 9.40689 2.65094 10.4469 2.77094 11.1569L4.10094 19.1169C4.28094 20.1669 5.33094 21.0569 6.40094 21.0569H17.6009C18.6709 21.0569 19.7209 20.1669 19.9009 19.1069L21.2309 11.1469C21.3409 10.4469 20.9409 9.38689 20.3909 8.94689L13.4609 3.40689C13.0609 3.08689 12.5209 2.92689 11.9909 2.92689Z"
                fill="currentColor"/>
            </svg>
          </Link>
        </li>
        <li>
          <Link to="/requests">
            <svg
              className={location.pathname === '/requests' ? s.menuItemActive : s.menuItem}
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M9 3.5H4.5C3.67157 3.5 3 4.17157 3 5V9.5C3 10.3284 3.67157 11 4.5 11H9C9.82843 11 10.5 10.3284 10.5 9.5V5C10.5 4.17157 9.82843 3.5 9 3.5Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M19.5 3.5H15C14.1716 3.5 13.5 4.17157 13.5 5V9.5C13.5 10.3284 14.1716 11 15 11H19.5C20.3284 11 21 10.3284 21 9.5V5C21 4.17157 20.3284 3.5 19.5 3.5Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M9 13.5H4.5C3.67157 13.5 3 14.1716 3 15V19.5C3 20.3284 3.67157 21 4.5 21H9C9.82843 21 10.5 20.3284 10.5 19.5V15C10.5 14.1716 9.82843 13.5 9 13.5Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M19.5 13.5H15C14.1716 13.5 13.5 14.1716 13.5 15V19.5C13.5 20.3284 14.1716 21 15 21H19.5C20.3284 21 21 20.3284 21 19.5V15C21 14.1716 20.3284 13.5 19.5 13.5Z"
                stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Link>
        </li>
        <li>
          <Link to="/favorites" onClick={handleProtectedLinkClick}>
            <svg className={location.pathname === '/favorites' ? s.menuItemActive : s.menuItem}
                 width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.68998C1.25 5.18998 4.08 2.34998 7.56 2.34998C9.25 2.34998 10.83 3.00998 12 4.18998C13.17 3.00998 14.75 2.34998 16.44 2.34998C19.92 2.34998 22.75 5.19998 22.75 8.68998C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65ZM7.56 3.84998C4.91 3.84998 2.75 6.01998 2.75 8.68998C2.75 15.52 9.32 19.32 11.63 20.11C11.81 20.17 12.2 20.17 12.38 20.11C14.68 19.32 21.26 15.53 21.26 8.68998C21.26 6.01998 19.1 3.84998 16.45 3.84998C14.93 3.84998 13.52 4.55998 12.61 5.78998C12.33 6.16998 11.69 6.16998 11.41 5.78998C10.48 4.54998 9.08 3.84998 7.56 3.84998Z"
                fill="currentColor"
              />
            </svg>
          </Link>
        </li>
        <li>
          <button onClick={handleProtectedLinkClick}>
            <svg className={location.pathname.startsWith('/dashboard') ? s.menuItemActive : s.menuItem}
                 width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                fill="currentColor"
                d="M22 12C22 6.49 17.51 2 12 2C6.49 2 2 6.49 2 12C2 14.9 3.25 17.51 5.23 19.34C5.23 19.35 5.23 19.35 5.22 19.36C5.32 19.46 5.44 19.54 5.54 19.63C5.6 19.68 5.65 19.73 5.71 19.77C5.89 19.92 6.09 20.06 6.28 20.2C6.35 20.25 6.41 20.29 6.48 20.34C6.67 20.47 6.87 20.59 7.08 20.7C7.15 20.74 7.23 20.79 7.3 20.83C7.5 20.94 7.71 21.04 7.93 21.13C8.01 21.17 8.09 21.21 8.17 21.24C8.39 21.33 8.61 21.41 8.83 21.48C8.91 21.51 8.99 21.54 9.07 21.56C9.31 21.63 9.55 21.69 9.79 21.75C9.86 21.77 9.93 21.79 10.01 21.8C10.29 21.86 10.57 21.9 10.86 21.93C10.9 21.93 10.94 21.94 10.98 21.95C11.32 21.98 11.66 22 12 22C12.34 22 12.68 21.98 13.01 21.95C13.05 21.95 13.09 21.94 13.13 21.93C13.42 21.9 13.7 21.86 13.98 21.8C14.05 21.79 14.12 21.76 14.2 21.75C14.44 21.69 14.69 21.64 14.92 21.56C15 21.53 15.08 21.5 15.16 21.48C15.38 21.4 15.61 21.33 15.82 21.24C15.9 21.21 15.98 21.17 16.06 21.13C16.27 21.04 16.48 20.94 16.69 20.83C16.77 20.79 16.84 20.74 16.91 20.7C17.11 20.58 17.31 20.47 17.51 20.34C17.58 20.3 17.64 20.25 17.71 20.2C17.91 20.06 18.1 19.92 18.28 19.77C18.34 19.72 18.39 19.67 18.45 19.63C18.56 19.54 18.67 19.45 18.77 19.36C18.77 19.35 18.77 19.35 18.76 19.34C20.75 17.51 22 14.9 22 12ZM16.94 16.97C14.23 15.15 9.79 15.15 7.06 16.97C6.62 17.26 6.26 17.6 5.96 17.97C4.44 16.43 3.5 14.32 3.5 12C3.5 7.31 7.31 3.5 12 3.5C16.69 3.5 20.5 7.31 20.5 12C20.5 14.32 19.56 16.43 18.04 17.97C17.75 17.6 17.38 17.26 16.94 16.97Z"
              />
              <path
                fill="currentColor"
                d="M12 6.92999C9.93 6.92999 8.25 8.60999 8.25 10.68C8.25 12.71 9.84 14.36 11.95 14.42C11.98 14.42 12.02 14.42 12.04 14.42C12.06 14.42 12.09 14.42 12.11 14.42C12.12 14.42 12.13 14.42 12.13 14.42C14.15 14.35 15.74 12.71 15.75 10.68C15.75 8.60999 14.07 6.92999 12 6.92999Z"
              />
            </svg>
          </button>
        </li>
      </ul>
    </div>
  )
}

export default MobileBottomMenu;