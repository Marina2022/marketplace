import s from './FiltersDropdown.module.scss';
import {useRef, useState} from "react";
import {
  addDropdownedFilters,
  getDropdownedFilters,
  removeFromDropdownedFilters,
  setScroll
} from "@/store/catalogSlice.js";
import {useDispatch, useSelector} from "react-redux";

const FiltersDropdown = ({children, title, filtersWrapper, rightPartRef, filter}) => {

  // const [isOpen, setIsOpen] = useState(true)
  let isOpen
  
  const dropdownedFilters = useSelector(getDropdownedFilters)
  if (dropdownedFilters.includes(filter)) {
    isOpen = false
  } else {
    isOpen = true
  }

  const dispatch = useDispatch()
  const onBtnClick = () => {

    // поменять position в фильтрах, если высота стала меньше высоты экрана     
    // высота фильтра после! сворачивания - меньше экрана
    
    // если меняем состояние на Свернутое - посылаем в редакс экшн
    if (isOpen) {
      dispatch(addDropdownedFilters(filter))
      dispatch(setScroll(window.scrollY))

      const filtersHeigthAfterClosing = filtersWrapper.current.getBoundingClientRect().height
          - (dropdownRef.current.getBoundingClientRect().height - dropdownTitleRef.current.getBoundingClientRect().height)
            
      if (filtersHeigthAfterClosing <= (window.innerHeight - 40)) {
        if (rightPartRef.current.getBoundingClientRect().top <= 0) {
          console.log('я должон произойти')

          filtersWrapper.current.style = 'position: fixed; top: 20px'
        } else {
          filtersWrapper.current.style = 'position: static; '
        }
      }

      // если меняем состояние на Развернутое
    } else {
      dispatch(removeFromDropdownedFilters(filter))
      dispatch(setScroll(window.scrollY))
    }
  }

  const dropdownRef = useRef()
  const dropdownTitleRef = useRef()

  return (
      <div className={s.dropdownWrapper} ref={dropdownRef}>
        <h3 className={s.title} ref={dropdownTitleRef} onClick={onBtnClick}>
          <span>{title}</span>
          <button >
            <svg className={isOpen ? s.btnWhenFilterIsOpen : ''} width="12" height="13" viewBox="0 0 12 13" fill="none"
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