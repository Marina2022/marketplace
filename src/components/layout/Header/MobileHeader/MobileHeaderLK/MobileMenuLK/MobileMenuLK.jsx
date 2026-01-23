import s from './MobileMenuLK.module.scss';
import hamburger from "@/assets/img/header/hamburger.svg";
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
      <button><img src={hamburger} alt="menu" onClick={() => setIsDropdownOpen(prev => !prev)}/></button>

      {isDropdownOpen && (
        <div className={s.underlay} onClick={underlayClickHandler}>
          <div className={s.dropWrapper} onClick={dropdownClickHandler} >
            <div className={s.dropdown}>
              menu
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileMenuLk;