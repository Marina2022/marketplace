import s from './Header.module.scss'
import logo from '@/assets/img/header/logo.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated, login, logout} from "@/store/userSlice.js";

const Header = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const dispatch = useDispatch()

  return (
    <header className={s.header}>
      <div className='container'>
        <div className={s.wrapper}>
          <div>
            <Link to="/">
              <img src={logo} alt="logo"/>
            </Link>
            <span>Header</span>
          </div>
          <div className={s.loginWrapper}>
            {
              isAuthenticated
                ? <>
                  <div>Пользователь авторизован</div>
                  <button onClick={()=>dispatch(logout())} className={s.loginBtn}>Выйти</button>
                </>
                : <>
                  <div>Пользователь не авторизован</div>
                  <button onClick={()=>dispatch(login())}  className={s.loginBtn}>Войти</button>
                </>
            }


          </div>

        </div>
      </div>
    </header>
  )
    ;
};

export default Header;