import s from './Tab.module.scss'
import {useNavigate} from "react-router-dom";
import {tabLabels} from "@/components/layout/Tabs/tabUtils.js";
import {useDispatch, useSelector} from "react-redux";
import {getTabs, setTabs} from "@/store/tabsSlice.js";

const Tab = ({tab, nextTab}) => {
  const tabs = useSelector(getTabs)

  const navigate = useNavigate()
  const isActive = location.pathname === tab
  const nextIsActive = nextTab && location.pathname === nextTab;

  const dispatch = useDispatch()

  const handleClick = () => {
    navigate(tab)
  }

  const handleClose = (e)=>{
    e.stopPropagation()
    const newTabs = tabs.filter(tabItem => tabItem !== tab)
    dispatch(setTabs(newTabs))

    if (newTabs.length > 0) {
      console.log("newTabs[newTabs.length - 1] = ", newTabs[newTabs.length - 1])
      navigate(newTabs[newTabs.length - 1]);
    } else {
      navigate('/requests'); // fallback
    }
  }

  let label = ""
  const itemWithLabel = tabLabels.find((item) => item.url === tab)
  if (itemWithLabel) {
    label = itemWithLabel.label
  }

  return (
    <div className={`${s.tab} ${isActive ? s.activeTab : nextIsActive ? "" : s.withDivider}`} onClick={handleClick}>
      <span className={`${s.label} ${isActive ? s.labelActive : ''}`}>
      {label}
      </span>

      {
        isActive && (
          <button className={s.closeBtn} onClick={handleClose}>
            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.184662 0.182526C0.42874 -0.0615522 0.824468 -0.061552 1.06855 0.182526L3.71951 2.83349L6.37047 0.182526C6.61448 -0.0611776 7.01034 -0.0611911 7.25435 0.182526C7.49833 0.426508 7.49814 0.822308 7.25435 1.06641L4.60339 3.71737L7.25573 6.36971C7.49981 6.61379 7.49981 7.00952 7.25573 7.25359C7.01164 7.49751 6.61587 7.49762 6.37185 7.25359L3.71951 4.60125L1.06716 7.25359C0.823087 7.49767 0.427359 7.49767 0.183281 7.25359C-0.060531 7.00949 -0.0607082 6.6137 0.183281 6.36971L2.83562 3.71737L0.184662 1.06641C-0.0593632 0.822384 -0.0592582 0.426616 0.184662 0.182526Z"
                fill="#3E5067"/>
            </svg>
          </button>
        )
      }
    </div>
  );
};

export default Tab;