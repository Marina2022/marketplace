import s from './MobileMenuItem.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import MobileMenuSubitem
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/MobileMenuLK/MobileMenuItem/MobileMenuSubitem/MobileMenuSubitem.jsx";

const MobileMenuItem = ({item}) => {

  const location = useLocation()
  const isActive = location.pathname.startsWith(item.urlStartsWith)
  const navigate = useNavigate()
  const [dropdownOpen, setDropdownOpen] = useState(item.kids)

  const handleClick = () => {

    if (!item.kids) {
      navigate(item.urlStartsWith)
    }

    if (item.kids) {
      setDropdownOpen(prev => !prev)
    }
  }

  return (
    <li className={`${s.menuItem} ${dropdownOpen ? s.menuItemOpened : ''} `} onClick={handleClick}>
      <div className={s.menuItemTop}>
        <div className={isActive ? s.iconWrapperActive : s.iconWrapper}>
          {item.icon}
        </div>

        <div className={s.itemName}>
          {item.title}
        </div>

        {
          item.kids && (
            <div className={dropdownOpen ? s.arrowActive : s.arrow}>
              <svg width="11" height="6" viewBox="0 0 11 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.05604 5.01521C4.64771 5.01521 4.23938 4.85771 3.93021 4.54854L0.126875 0.745208C-0.0422917 0.576041 -0.0422917 0.296042 0.126875 0.126875C0.296042 -0.0422917 0.576042 -0.0422917 0.745209 0.126875L4.54854 3.93021C4.82854 4.21021 5.28354 4.21021 5.56354 3.93021L9.36687 0.126875C9.53604 -0.0422917 9.81604 -0.0422917 9.98521 0.126875C10.1544 0.296042 10.1544 0.576041 9.98521 0.745208L6.18188 4.54854C5.87271 4.85771 5.46438 5.01521 5.05604 5.01521Z"
                  fill="#131D2A"/>
              </svg>
            </div>
          )
        }
      </div>
      {
        dropdownOpen && (
          <ul className={s.dropdown}>
            {
              item.kids.map((subitem, i) => <MobileMenuSubitem key={i} subitem={subitem}/>)
            }
          </ul>
        )
      }
    </li>
  )
}

export default MobileMenuItem;