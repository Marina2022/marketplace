import s from './RequestsTabs.module.scss';

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
    value: "draft"
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

const RequestsTabs = ({requests, setTab, tab, setShowHistoryPage}) => {
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
                  setShowHistoryPage(true)
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
                    <span className={`${s.count} ${isActive ? s.countActive : ''}`}>{requests && count}</span>
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