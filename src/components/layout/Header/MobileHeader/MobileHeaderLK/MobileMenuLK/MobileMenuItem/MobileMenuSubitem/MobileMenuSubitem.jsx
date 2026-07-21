import s from './MobileMenuSubitem.module.scss';
import {useLocation, useNavigate} from "react-router-dom";

const MobileMenuSubitem = ({subitem}) => {

  const location = useLocation();
  const isSubitemActive = location.pathname === subitem.itemLink
  const navigate = useNavigate();

  const handleClick = ()=>{
    navigate(subitem.itemLink);
  }

  return (
    <li className={s.subitem} onClick={handleClick}>
      <div className={ isSubitemActive ? s.indicatorActive : s.indicator}></div>
      <div className={s.itemName}>{subitem.itemTitle}</div>
      <svg className={s.arrow} width="4" height="8" viewBox="0 0 4 8" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M4 4C4 4.32305 3.87438 4.64609 3.6278 4.89068L0.594359 7.89963C0.459436 8.03346 0.236115 8.03346 0.101192 7.89963C-0.0337307 7.76579 -0.0337307 7.54427 0.101192 7.41044L3.13463 4.4015C3.35795 4.17998 3.35795 3.82002 3.13463 3.5985L0.101192 0.58956C-0.0337307 0.455726 -0.0337307 0.234209 0.101192 0.100375C0.236115 -0.0334578 0.459436 -0.0334578 0.594359 0.100375L3.6278 3.10932C3.87438 3.35391 4 3.67695 4 4Z" fill="#3D4A66"/>
      </svg>
    </li>
  )
}

export default MobileMenuSubitem;