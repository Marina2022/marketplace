import s from './MobileBottomMenu.module.scss';
import {Link, useLocation} from "react-router-dom";
import LoginMobile from "@/components/layout/Header/LoginMobile/LoginMobile.jsx";

const MobileBottomMenu = () => {

  const location = useLocation()

  return (
    <div className={s.menuWrapper}>
      <ul className={s.menu}>
        <li>
          <Link to="/">
            <svg
              className={location.pathname === '/' ? s.menuItemActive : s.menuItem}
              width="24" height="24" viewBox="0 0 24 24"  xmlns="http://www.w3.org/2000/svg">
              <path d="M12 18.75C11.59 18.75 11.25 18.41 11.25 18V15C11.25 14.59 11.59 14.25 12 14.25C12.41 14.25 12.75 14.59 12.75 15V18C12.75 18.41 12.41 18.75 12 18.75Z" fill="currentColor" />
              <path d="M17.6009 22.5569H6.40094C4.58094 22.5569 2.92094 21.1569 2.62094 19.3669L1.29094 11.3969C1.07094 10.1569 1.68094 8.56689 2.67094 7.77689L9.60094 2.22689C10.9409 1.14689 13.0509 1.15689 14.4009 2.23689L21.3309 7.77689C22.3109 8.56689 22.9109 10.1569 22.7109 11.3969L21.3809 19.3569C21.0809 21.1269 19.3809 22.5569 17.6009 22.5569ZM11.9909 2.92689C11.4609 2.92689 10.9309 3.08689 10.5409 3.39689L3.61094 8.95689C3.05094 9.40689 2.65094 10.4469 2.77094 11.1569L4.10094 19.1169C4.28094 20.1669 5.33094 21.0569 6.40094 21.0569H17.6009C18.6709 21.0569 19.7209 20.1669 19.9009 19.1069L21.2309 11.1469C21.3409 10.4469 20.9409 9.38689 20.3909 8.94689L13.4609 3.40689C13.0609 3.08689 12.5209 2.92689 11.9909 2.92689Z" fill="currentColor" />
            </svg>
          </Link>
        </li>

        <li>
          <Link to="/requests">
            <svg
              className={location.pathname === '/requests'  ? s.menuItemActive : s.menuItem}
              width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 3.5H4.5C3.67157 3.5 3 4.17157 3 5V9.5C3 10.3284 3.67157 11 4.5 11H9C9.82843 11 10.5 10.3284 10.5 9.5V5C10.5 4.17157 9.82843 3.5 9 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 3.5H15C14.1716 3.5 13.5 4.17157 13.5 5V9.5C13.5 10.3284 14.1716 11 15 11H19.5C20.3284 11 21 10.3284 21 9.5V5C21 4.17157 20.3284 3.5 19.5 3.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M9 13.5H4.5C3.67157 13.5 3 14.1716 3 15V19.5C3 20.3284 3.67157 21 4.5 21H9C9.82843 21 10.5 20.3284 10.5 19.5V15C10.5 14.1716 9.82843 13.5 9 13.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M19.5 13.5H15C14.1716 13.5 13.5 14.1716 13.5 15V19.5C13.5 20.3284 14.1716 21 15 21H19.5C20.3284 21 21 20.3284 21 19.5V15C21 14.1716 20.3284 13.5 19.5 13.5Z" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>

          </Link>
        </li>

        <li>
          <Link to="/favorites">
            <svg className={location.pathname === '/favorites' ? s.menuItemActive : s.menuItem}
                 width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 21.65C11.69 21.65 11.39 21.61 11.14 21.52C7.32 20.21 1.25 15.56 1.25 8.68998C1.25 5.18998 4.08 2.34998 7.56 2.34998C9.25 2.34998 10.83 3.00998 12 4.18998C13.17 3.00998 14.75 2.34998 16.44 2.34998C19.92 2.34998 22.75 5.19998 22.75 8.68998C22.75 15.57 16.68 20.21 12.86 21.52C12.61 21.61 12.31 21.65 12 21.65ZM7.56 3.84998C4.91 3.84998 2.75 6.01998 2.75 8.68998C2.75 15.52 9.32 19.32 11.63 20.11C11.81 20.17 12.2 20.17 12.38 20.11C14.68 19.32 21.26 15.53 21.26 8.68998C21.26 6.01998 19.1 3.84998 16.45 3.84998C14.93 3.84998 13.52 4.55998 12.61 5.78998C12.33 6.16998 11.69 6.16998 11.41 5.78998C10.48 4.54998 9.08 3.84998 7.56 3.84998Z" fill="currentColor"
              />
            </svg>
          </Link>
        </li>

        <li>
          <LoginMobile/>
        </li>
      </ul>
    </div>
  )
}

export default MobileBottomMenu;