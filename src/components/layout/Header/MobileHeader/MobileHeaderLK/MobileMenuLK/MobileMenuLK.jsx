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
      <button className={s.hamburgerBtn} onClick={() => setIsDropdownOpen(prev => !prev)}>

        {
          !isDropdownOpen && <img src={hamburger} alt="menu" className={s.rotate}/>
        }

        {
          isDropdownOpen &&   <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.330758 0.331352C0.770106 -0.107882 1.48244 -0.107953 1.92175 0.331352L6.69334 5.10294L11.4663 0.329971C11.9056 -0.109326 12.6179 -0.109241 13.0573 0.329971C13.4966 0.769311 13.4966 1.48162 13.0573 1.92096L8.28433 6.69393L13.0587 11.4683C13.498 11.9076 13.4979 12.6199 13.0587 13.0593C12.6193 13.4986 11.907 13.4986 11.4677 13.0593L6.69334 8.28492L1.92037 13.0579C1.48103 13.4972 0.768717 13.4972 0.329377 13.0579C-0.109835 12.6185 -0.10992 11.9062 0.329377 11.4669L5.10235 6.69393L0.330758 1.92234C-0.108582 1.483 -0.108582 0.770692 0.330758 0.331352Z" fill="#3E5067"/>
          </svg>
        }


     </button>



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