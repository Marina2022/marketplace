import s from './Header.module.scss'
import logo from '@/assets/img/header/logo.svg'
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated, login, logout} from "@/store/userSlice.js";
import {getFavs} from "@/store/favSlice.js";
import heartActiveBtn from '@/assets/img/cart/cart-card/heart-active.svg'
const Header = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const dispatch = useDispatch()  
  const favs = useSelector(getFavs)

  return (
    <header className={s.header}>
      <div className='container'>
        <div className={s.wrapper}>
          <div>
            <Link to="/">
              <img className={s.logo} src={logo} alt="logo"/>
            </Link>
            <span>Header</span>
          </div>          
          <Link to="/favourites" className={s.fav}><img src={heartActiveBtn} alt=""/> <span> {favs?.length} </span> </Link>
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
}

export default Header;