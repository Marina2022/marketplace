import s from './MainMenuItem.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {setIsLoginPopupOpened} from "@/store/userSlice.js";
import {getUnreadCount} from "@/store/chatSlice.js";

const MainMenuItem = ({item}) => {

  const canHover = window.matchMedia('(hover: hover)').matches;

  const [showTooltip, setShowTooltip] = useState(false)

  const location = useLocation();
  const getFirstSegment = (path) => path.split('/').filter(Boolean)[0] || ""
  let isActive = getFirstSegment(item.url) === getFirstSegment(location.pathname)

  //item.url - это значение урла, заданное для кнопки менюшки в самом начале, оно по факту будет не только этому урлу соответствовать
  if (getFirstSegment(item.url) === "requests" && getFirstSegment(location.pathname) === "") isActive = true
  if (getFirstSegment(item.url) === "requests" && getFirstSegment(location.pathname) === "search-keywords") isActive = true

  if (item.url === "/manage-requests/my-requests" && getFirstSegment(location.pathname) === "request") isActive = true
  if (item.url === "/manage-requests/my-requests" && getFirstSegment(location.pathname) === "response") isActive = true

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
    navigate(item.url, {
      state: {fromApp: true}
    })

    if (!isInTabs) {
      const newTabs = [...tabs, item.url]
      dispatch(setTabs(newTabs))
    }
  }

  const unreadCount = useSelector(getUnreadCount)

  const [showBadge, setShowBadge] = useState(false)

  useEffect(() => {
    if (item.url === "/chat" && unreadCount > 0) {
      setShowBadge(true)
    } else {
      setShowBadge(false)
    }
  }, [unreadCount, item.url])

  return (
    <li className={s.menuItem} onMouseEnter={() => canHover && setShowTooltip(true)}
        onMouseLeave={() => canHover && setShowTooltip(false)}>
      <button
        onClick={handleClick}
        className={isActive ? s.menuItemLinkActive : s.menuItemLink}
      >
        <div>
          {
            item.svg
          }

          {
            showBadge && <div className={s.circle}/>
          }
        </div>
      </button>
      {
        showTooltip && <div className={s.tooltip}>{item.tooltip}</div>
      }
    </li>
  );
};

export default MainMenuItem;