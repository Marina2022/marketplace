import s from './Tabs.module.scss';
import {useParams, useSearchParams} from "react-router-dom";

const Tabs = ({tabsCount}) => {

  const [searchParams, setSearchParams] = useSearchParams('statusTab');
  const activeTab = searchParams.get('statusTab')

  const tabs = [
    {label: "Все", value: 'all'},
    {label: "В продаже", value: 'active'},
    {label: "Готовы к продаже", value: 'approved'},
    {label: "Сняты с продажи", value: 'removed'},
    {label: "Архив", value: 'archived'},
  ]

  const handleClick = (tabValue) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set("statusTab", tabValue);
    setSearchParams(newParams);
  }

  return (
    <ul className={s.tabs}>
      {
        tabs.map((tab, i) => {

          let isActiveTab = false

          if (!activeTab && tab.value === 'all') {
            isActiveTab = true
          } else {
            isActiveTab = activeTab === tab.value
          }

          return (
            <li
              key={i}
              className={`${s.item} ${isActiveTab ? s.activeItem : ''}`}
              onClick={() => handleClick(tab.value)}
            >{tab.label} ({tabsCount[tab.value]})</li>
          )
        })
      }
    </ul>
  );
};

export default Tabs;