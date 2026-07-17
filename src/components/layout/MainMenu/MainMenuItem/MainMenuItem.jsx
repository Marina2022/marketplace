import s from './MainMenuItem.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useState} from "react";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopupOpened} from "@/store/userSlice.js";

const MainMenuItem = ({item}) => {

  const canHover = window.matchMedia('(hover: hover)').matches;

  const [showTooltip, setShowTooltip] = useState(false)

  const location = useLocation();

  const getFirstSegment = (path) => path.split('/').filter(Boolean)[0] || "";

  let isActive =
    getFirstSegment(item.url) === getFirstSegment(location.pathname);

  if (getFirstSegment(item.url) === "requests" && getFirstSegment(location.pathname) === "") isActive = true;

  const navigate = useNavigate();
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const {isAuthenticated} = useSelector(state => state.user)

  const handleClick = () => {

    if (!item.public && !isAuthenticated) {
      dispatch(setIsLoginPopupOpened(true))
      return
    }

    const isInTabs = tabs.find((tab) => tab === item.url)
    navigate(item.url)

    if (!isInTabs) {
      const newTabs = [...tabs, item.url]
      dispatch(setTabs(newTabs))
    }
  }

  return (
    <li className={s.menuItem} onMouseEnter={() => canHover && setShowTooltip(true)}
        onMouseLeave={() => canHover && setShowTooltip(false)}>
      <button
        onClick={handleClick}
        className={isActive ? s.menuItemLinkActive : s.menuItemLink}
      >
        {
          item.svg
        }
      </button>
      {
        showTooltip && <div className={s.tooltip}>{item.tooltip}</div>
      }
    </li>
  );
};

export default MainMenuItem;