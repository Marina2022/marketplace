import s from './IncheckboxFilterMobile.module.scss';
import ShowMoreModal from "@/components/CategoryBlock/Filters/MobileFilters/ShowMoreModal/ShowMoreModal.jsx";
import {useState} from "react";
import {sortFilterValues} from "@/utils/mobileFilters.js";
import Button from "@/components/ui/Button/Button.jsx";
import IncheckboxFilterMobileItem
  from "@/components/CategoryBlock/Filters/MobileFilters/IncheckboxFilterMobile/IncheckboxFilterMobileItem/IncheckboxFilterMobileItem.jsx";
import IncheckboxFilterMobileItemFull
  from "@/components/CategoryBlock/Filters/MobileFilters/IncheckboxFilterMobile/IncheckboxFilterMobileItemFull/IncheckboxFilterMobileItemFull.jsx";


const IncheckboxFilterMobile = ({filter, currentFilters, setCurrentFilters}) => {

  console.log('currentFilters', currentFilters)

  const {filterName, filterSettings, nameHandle} = filter

  console.log('filterSettings', filterSettings)

  // сортировка - вначале идут selected
  const filterSettingsSorted = [...filterSettings]
  sortFilterValues(filterSettingsSorted, nameHandle, currentFilters)

  const [showMoreIsOpen, setShowMoreIsOpen] = useState(false)
  const valuesToShow = filterSettingsSorted.slice(0, 5)

  // выбираются значения, которые есть в стейте currentFilters для текущего фильтра
  const activeValues = filterSettingsSorted.filter(filterSetting => {
        const foundFilterInState = currentFilters.find(stateItem => stateItem.nameHandle === nameHandle)
        if (foundFilterInState) {
          
          const arr = filterSetting.valueHandle.split('-')
              const val = `minValue:${arr[0]};maxValue:${arr[1]}`            

          if (foundFilterInState.selectedValue.split(',')
              .includes(val)) return true
        }
      }
  )

  const onDeleteAllClick = () => {
    const newState = [...currentFilters]
    const anotherNewState = newState.filter(filter => filter.nameHandle !== nameHandle)
    setCurrentFilters(anotherNewState)
  }

  return (
      <li className={s.filterItem}>
        <div className={s.topWrapper}>
          <h2 className={s.title}>{filterName}</h2>

          {filterSettingsSorted.length > 2 && (
              <button className={s.btn} onClick={() => {
                setShowMoreIsOpen(true)
              }}>Показать все
              </button>
          )
          }
        </div>

        <ul className={s.filtersList}>
          {
            valuesToShow.map((value, i) => <IncheckboxFilterMobileItem
                key={i}
                valueObject={value}
                currentFilters={currentFilters}
                setCurrentFilters={setCurrentFilters}
                filter={filter}/>)
          }
        </ul>


        {/* модалка "Показать все "*/}

        {
          <ShowMoreModal setIsOpen={setShowMoreIsOpen} isOpen={showMoreIsOpen} title={filter.filterName}
                         filterSettings={filterSettingsSorted}>

            <>

              {
                  activeValues.length > 0 && <ul className={s.filtersListFull}>
                    <button onClick={onDeleteAllClick}>
                      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M10.0013 18.9584C5.05964 18.9584 1.04297 14.9417 1.04297 10.0001C1.04297 5.05841 5.05964 1.04175 10.0013 1.04175C14.943 1.04175 18.9596 5.05841 18.9596 10.0001C18.9596 14.9417 14.943 18.9584 10.0013 18.9584ZM10.0013 2.29175C5.7513 2.29175 2.29297 5.75008 2.29297 10.0001C2.29297 14.2501 5.7513 17.7084 10.0013 17.7084C14.2513 17.7084 17.7096 14.2501 17.7096 10.0001C17.7096 5.75008 14.2513 2.29175 10.0013 2.29175Z"
                            fill="#3E5067"/>
                        <path
                            d="M7.64245 12.9834C7.48411 12.9834 7.32578 12.925 7.20078 12.8C6.95911 12.5584 6.95911 12.1584 7.20078 11.9167L11.9174 7.20005C12.1591 6.95838 12.5591 6.95838 12.8008 7.20005C13.0424 7.44172 13.0424 7.84172 12.8008 8.08338L8.08411 12.8C7.96745 12.925 7.80078 12.9834 7.64245 12.9834Z"
                            fill="#3E5067"/>
                        <path
                            d="M12.3591 12.9834C12.2008 12.9834 12.0424 12.925 11.9174 12.8L7.20078 8.08338C6.95911 7.84172 6.95911 7.44172 7.20078 7.20005C7.44245 6.95838 7.84245 6.95838 8.08411 7.20005L12.8008 11.9167C13.0424 12.1584 13.0424 12.5584 12.8008 12.8C12.6758 12.925 12.5174 12.9834 12.3591 12.9834Z"
                            fill="#3E5067"/>
                      </svg>
                    </button>

                    {
                      activeValues.map((value, i) => <IncheckboxFilterMobileItem
                          key={i}
                          valueObject={value}
                          currentFilters={currentFilters}
                          setCurrentFilters={setCurrentFilters}
                          filter={filter}/>)
                    }
                  </ul>
              }

              <ul>
                {
                  filterSettingsSorted.map((value, i) => <IncheckboxFilterMobileItemFull
                      key={i} valueObject={value}
                      currentFilters={currentFilters}
                      filter={filter}
                      setCurrentFilters={setCurrentFilters}
                  />)
                }
              </ul>

              <Button className={s.readyBtn} onClick={() => setShowMoreIsOpen(false)}>Готово</Button>

            </>
          </ShowMoreModal>

        }
      </li>
  )
}


export default IncheckboxFilterMobile;