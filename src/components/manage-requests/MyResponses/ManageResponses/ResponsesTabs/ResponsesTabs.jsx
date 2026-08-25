import s from './ResponsesTabs.module.scss';

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
    label: "Закреплён",
    value: "pinned"
  },
  {
    label: "Новые",
    value: "new"
  },
  {
    label: "Архив",
    value: "archive"
  }
  , {
    label: "История",
    value: "history"
  }
]

const ResponsesTabs = ({responses, setTab, tab}) => {

  return (
    <div className={s.tabsWrapperForScroll}>
      <ul className={s.tabs}>
        {
          pageTabs.map((tabItem, i) => {
              let count = 0;
              if (responses) {
                count = responses.tabCount[tabItem.value] ?? 0
              }

              const handleClick = () => {
                setTab(tabItem.value)

              }
              const isActive = tabItem.value === tab
              return (
                <li key={i}
                    className={`${s.tab} ${isActive ? s.tabActive : ''}`}
                    onClick={handleClick}
                >
                <span>
                  {tabItem.label}</span>
                  <span className={`${s.count} ${isActive ? s.countActive : ''}`}>{responses && count}</span>
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

export default ResponsesTabs;