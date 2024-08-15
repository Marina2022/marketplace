import s from './MobileBottomMenu.module.scss';
import btnImage1 from '@/assets/img/mobileMenu/1-home.svg'
import btnImage2 from '@/assets/img/mobileMenu/2-search.svg'
import btnImage3 from '@/assets/img/mobileMenu/3-fav.svg'
import btnImage4 from '@/assets/img/mobileMenu/4-cart.svg'
import btnImage5 from '@/assets/img/mobileMenu/5-profile.svg'
import {Link} from "react-router-dom";

const MobileBottomMenu = () => {
  return (
    <div className={s.menuWrapper}>      
      <ul className={s.menu}>
        <li>
          <Link to="/"><img src={btnImage1} alt="home"/></Link>
        </li>
        <li>
          <button><img src={btnImage2} alt="search"/></button>
        </li>
        <li>
          <Link to="/favourites"><img src={btnImage3} alt="favourites"/></Link>
        </li>
        <li>
          <Link to={"/cart"}><img src={btnImage4} alt="cart"/></Link>
        </li>
        <li>
          <button><img src={btnImage5} alt="profile"/></button>
        </li>        
      </ul>
    </div>
  );
};

export default MobileBottomMenu;