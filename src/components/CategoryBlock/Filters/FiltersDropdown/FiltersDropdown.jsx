import s from './FiltersDropdown.module.scss';
import {useState} from "react";

const FiltersDropdown = ({children, title}) => {

  const [isOpen, setIsOpen] = useState(true)

  const onBtnClick = () => {
    setIsOpen(prev => !prev)
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