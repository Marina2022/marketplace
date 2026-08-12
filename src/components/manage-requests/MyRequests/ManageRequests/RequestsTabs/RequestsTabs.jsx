import s from './RequestsTabs.module.scss';
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import {useDispatch, useSelector} from "react-redux";

const pageTabs = [
  {
    label: "Все",
    value: "all"
  },
  {
    label: "Активные",
    value: "active"
  },
  {
    label: "В работе",
    value: "inProgress"
  },
  {
    label: "Приостановленные",
    value: "paused"
  },
  {
    label: "На модерации",
    value: "moderating"
  }
  , {
    label: "Черновики",
    value: "drafts"
  },
  {
    label: "Истекшие",
    value: "expired"
  },
  {
    label: "История",
    value: "history"
  }

]

const RequestsTabs = ({requests, setTab, tab}) => {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const tabs = useSelector(getTabs)

  return (
    <div className={s.tabsWrapperForScroll}>
      <ul className={s.tabs}>
        {
          pageTabs.map((tabItem, i) => {
              let count = 0;
              if (requests) {
                count = requests.tabCount[tabItem.value] ?? 0
              }

              const handleClick = () => {
                if (tabItem.value !== "history") {
                  setTab(tabItem.value)
                } else {

                  const url = '/requests-history'
                  const isInTabs = tabs.find((tab) => tab === url)
                  navigate(url)

                  if (!isInTabs) {
                    const newTabs = [...tabs, url]
                    dispatch(setTabs(newTabs))
                  }
                }
              }

              const isActive = tabItem.value === tab

              return (
                <li key={i}
                    className={`${s.tab} ${isActive ? s.tabActive : ''}`}
                    onClick={handleClick}
                >
                <span>
                  {tabItem.label}</span>
                  {
                    tabItem.value !== "history" &&
                    <span className={`${s.count} ${isActive ? s.countActive : ''}`}>{count}</span>
                  }
                </li>
              )
            }
          )
        }
        <li className={s.tabletEndItem}></li>
      </ul>
    </div>
  )
}

export default RequestsTabs;