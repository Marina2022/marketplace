import s from './MainMenuItem.module.scss';
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {useMemo, useState} from "react";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const MainMenuItem = ({item}) => {

  const canHover = useMemo(() => {
    return window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  }, []);

  const [showTooltip, setShowTooltip] = useState(false)

  const location = useLocation();

  const getFirstSegment = (path) => path.split('/').filter(Boolean)[0] || "";

  let isActive =
    getFirstSegment(item.url) === getFirstSegment(location.pathname);

  if (getFirstSegment(item.url) === "requests" && getFirstSegment(location.pathname) === "" ) isActive = true;


  const navigate = useNavigate();
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleClick = () => {

    const isInTabs = tabs.find((tab) => tab === item.url)
    navigate(item.url)

    if (!isInTabs) {
      const newTabs = [...tabs, item.url]
      dispatch(setTabs(newTabs))
    }
  }

  return (
    <li className={s.menuItem} onMouseEnter={() => canHover && setShowTooltip(true)} onMouseLeave={() => canHover && setShowTooltip(false)}>
      <NavLink
        onClick={handleClick}
        className={isActive ? s.menuItemLinkActive : s.menuItemLink}
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