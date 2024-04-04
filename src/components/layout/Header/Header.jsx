import s from './Header.module.scss'
import logo from '@/assets/img/header/logo.svg'
import {Link} from "react-router-dom";

const Header = () => {
  return (
      <header className={s.header}>
        <div className='container'>
          <div className={s.wrapper}>
            <Link to="/">
              <img src={logo} alt="logo"/>
            </Link>
            Header
          </div>
        </div>
      </header>
  );
};

export default Header;