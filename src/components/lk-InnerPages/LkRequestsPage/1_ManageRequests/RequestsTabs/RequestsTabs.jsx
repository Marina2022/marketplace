import s from './RequestsTabs.module.scss';

const tabs = [
  {
    label: "Все",
    value: "all"
  },
  {
    label: "Активные",
    value: "active"
  },
  {
    label: "С откликами",
    value: "withresponses"
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
    label: "Архив",
    value: "archived"
  }
]

const RequestsTabs = ({requests, setTab, tab}) => {

  return (
    <ul className={s.tabs}>
      {
        tabs.map((tabItem, i) => {
          let count = 0;
          if (requests) {
            count = requests.tabCount[tabItem.value] ?? 0
          }
            return (
              <li key={i}
                  className={tabItem.value === tab ? s.tabActive : s.tab}
                  onClick={() => setTab(tabItem.value)}
              >
                {tabItem.label} ({count})
              </li>
            )
          }
        )
      }
    </ul>
  )
}

export default RequestsTabs;