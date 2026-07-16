import s from './SubmenuItem.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const SubmenuItem = ({label, url, icon}) => {


  const navigate = useNavigate();
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()

  const handleClick = () => {

    const isInTabs = tabs.find((tab) => tab === url)
    navigate(url)

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }
  }

  const location = useLocation();

  const isMyPage = location.pathname === url;


  return (
    <div className={`${s.submenuItem} ${isMyPage ? s.submenuItemActive : ''}`} onClick={handleClick}>
      {
        isMyPage && <div className={s.currentItemIndicator}></div>
      }

      <div className={s.iconWrapper}>{icon}</div>

      <span>{label}</span>

    </div>
  );
};

export default SubmenuItem;