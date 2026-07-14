import s from './MainMenuItem.module.scss';
import {NavLink} from "react-router-dom";
import {useMemo, useState} from "react";

const MainMenuItem = ({item}) => {

  const canHover = useMemo(() => {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const [showTooltip, setShowTooltip] = useState(false)

  return (
    <li className={s.menuItem} onMouseEnter={() => canHover && setShowTooltip(true)} onMouseLeave={() => canHover && setShowTooltip(false)}>
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

export default MainMenuItem;