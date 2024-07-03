import s from './MobileBottomMenu.module.scss';
import btnImage1 from '@/assets/img/mobileMenu/1-home.svg'
import btnImage2 from '@/assets/img/mobileMenu/2-search.svg'
import btnImage3 from '@/assets/img/mobileMenu/3-fav.svg'
import btnImage4 from '@/assets/img/mobileMenu/4-cart.svg'
import btnImage5 from '@/assets/img/mobileMenu/5-profile.svg'

const MobileBottomMenu = () => {
  return (
    <div className={s.menuWrapper}>
      <div className={s.gray}>

      </div>
      <ul className={s.menu}>
        <li>
          <button><img src={btnImage1} alt="home"/></button>
        </li>
        <li>
          <button><img src={btnImage2} alt="search"/></button>
        </li>
        <li>
          <button><img src={btnImage3} alt="favourites"/></button>
        </li>
        <li>
          <button><img src={btnImage4} alt="cart"/></button>
        </li>
        <li>
          <button><img src={btnImage5} alt="profile"/></button>
        </li>
        
      </ul>
    </div>
  );
};

export default MobileBottomMenu;