import s from './FiltersDropdown.module.scss';
import {useState} from "react";

const FiltersDropdown = ({children, title, filtersWrapper, rightPartRef}) => {

  const [isOpen, setIsOpen] = useState(true)

  const onBtnClick = () => {
    setIsOpen(prev => !prev)
 
    
    //if (filtersWrapper.current.getBoundingClientRect().height <= window.innerHeight - 230) {
      if (filtersWrapper.current.getBoundingClientRect().height <= window.innerHeight ) {
      console.log('happen')
      if (rightPartRef.current.getBoundingClientRect().top <= 0) {
       
      filtersWrapper.current.style = 'position: fixed; top: 20px'
      } else {
        filtersWrapper.current.style = 'position: static; '
      }
    }
    
  }

  return (
      <div className={s.dropdownWrapper}>

        <h3 className={s.title}>

          <span>{title}</span>

          <button onClick={onBtnClick}>
            <svg className={ isOpen ? s.btnWhenFilterIsOpen : '' } width="12" height="13" viewBox="0 0 12 13" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M9.5 5L6 8.5L2.5 5" stroke="#5C798B" strokeWidth="2" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </button>
        </h3>

        {isOpen && children}
      </div>
  );
};

export default FiltersDropdown;