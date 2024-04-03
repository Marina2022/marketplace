import s from './Header.module.scss'
import logo from '@/assets/img/header/logo.svg'

const Header = () => {
  return (
      <header className={s.header}>
        <div className='container'>
          <div className={s.wrapper}>
            <img src={logo} alt="logo"/>
            Header
          </div>
        </div>
      </header>
  );
};

export default Header;