import s from './LkMenuItem.module.scss';
import {NavLink} from "react-router-dom";
import {useState} from "react";

const LkMenuItem = ({item}) => {

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <li className={s.menuItem} onMouseEnter={() => setShowTooltip(true)} onMouseLeave={() => setShowTooltip(false)}>
      <NavLink
        className={({isActive}) => isActive ? s.menuItemLinkActive : s.menuItemLink}
        to={item.url}>
        {
          item.svg
        }
      </NavLink>

      {
        showTooltip && <div className={s.tooltip}>{item.tooltip}</div>
      }
    </li>
  );
};

export default LkMenuItem;