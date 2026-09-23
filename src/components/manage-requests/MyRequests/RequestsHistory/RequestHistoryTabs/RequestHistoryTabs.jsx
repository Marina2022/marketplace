import s from './RequestHistoryTabs.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import YearFilter
  from "@/components/manage-requests/MyRequests/RequestsHistory/RequestHistoryTabs/YearFilter/YearFilter.jsx";

const RequestHistoryTabs = ({
                              setShowHistoryPage,
                              status,
                              setStatus,
                              year,
                              setYear

                            }) => {

  const [filtersValues, setFiltersValues] = useState();

  // загрузка фильтров
  useEffect(() => {
    const getFilters = async () => {
      try {
        const filtersResponse = await axiosInstance(`requests/history/filters`)
        setFiltersValues(filtersResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
    getFilters()
  }, [])

  const handleGoToRequests = () => {
    setShowHistoryPage(false)
  }
  if (!filtersValues) return <div className={s.loadingWrapper}></div>

  return (
    <div className={s.tabsWrapperForScroll}>
      <ul className={s.tabs}>

        <li className={`${s.tab} `}
            onClick={handleGoToRequests}
        >
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4.19964 7.00135C4.19964 6.59302 4.35714 6.18469 4.6663 5.87552L8.46964 2.07219C8.6388 1.90302 8.9188 1.90302 9.08797 2.07219C9.25714 2.24135 9.25714 2.52135 9.08797 2.69052L5.28464 6.49385C5.00464 6.77385 5.00464 7.22885 5.28464 7.50885L9.08797 11.3122C9.25714 11.4814 9.25714 11.7614 9.08797 11.9305C8.9188 12.0997 8.6388 12.0997 8.46964 11.9305L4.6663 8.12719C4.35714 7.81802 4.19964 7.40969 4.19964 7.00135Z"
              fill="#658092"/>
          </svg>
          <span>Все заявки</span>
        </li>

        {
          filtersValues.statuses.map((statusTab, i) => {
              const handleStatusClick = () => {
                setStatus(statusTab.code)
              }
              const isActive = status === statusTab.code;

              return (
                <li key={i}
                    className={`${s.tab} ${isActive ? s.tabActive : ''}`}
                    onClick={handleStatusClick}
                >
                  <span>{statusTab.label}</span>
                  <span className={`${s.count} ${isActive ? s.countActive : ''}`}>{statusTab.count}</span>
                </li>
              )
            }
          )
        }
        <YearFilter years={filtersValues.years} year={year} setYear={setYear}/>
        <li className={s.tabletEndItem}></li>
      </ul>
    </div>
  )
}

export default RequestHistoryTabs;