import s from './MobileMenuLK.module.scss';
import hamburger from "@/assets/img/header/hamburger.svg";
import closeBtn from "@/assets/img/header/mobileMenu/closeBtn.svg";
import {useLocation} from "react-router-dom";
import {useEffect, useState} from "react";

const MobileMenuLk = () => {

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  const underlayClickHandler = () => {
    setIsDropdownOpen(false)
  }

  const dropdownClickHandler = (e) => {
    e.stopPropagation();
  }


  return (

    <div className={s.userDropdownWrapper}>
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
                <br/>
                <br/>
              </div>

              <div className={s.menuSection}>
                <br/>
                <br/>
              </div>

              <div className={s.menuSection}>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
              </div>


            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenuLk;