import s from './MobileFilters.module.scss'
import MobileFiltersPopup
  from "@/components/CategoryBlock/Filters/MobileFilters/MobileFiltersPopup/MobileFiltersPopup.jsx";
import IncheckboxFilterMobile
  from "@/components/CategoryBlock/Filters/MobileFilters/IncheckboxFilterMobile/IncheckboxFilterMobile.jsx";
import PriceFilterMobile
  from "@/components/CategoryBlock/Filters/MobileFilters/PriceFilterMobile/PriceFilterMobile.jsx";
import CheckboxFilterMobile
  from "@/components/CategoryBlock/Filters/MobileFilters/CheckboxFilterMobile/CheckboxFilterMobile.jsx";
import ColorFilterMobile
  from "@/components/CategoryBlock/Filters/MobileFilters/ColorFilterMobile/ColorFilterMobile.jsx";
import {useSearchParams} from "react-router-dom";
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useState} from "react";


const MobileFilters = ({isMobileFiltersOpen, setIsMobileFiltersOpen, allFilters}) => {
  const [searchParams, setSearchParams] = useSearchParams();


  const [currentFilters, setCurrentFilters] = useState([])

  useEffect(() => {
    const filtersFromAddressBar = []

    allFilters.forEach(filter => {
          const selectedValue = searchParams.get(filter.nameHandle)
          if (selectedValue) {
            filtersFromAddressBar.push({...filter, selectedValue: selectedValue})
          }
        }
    )
    const minPrice = searchParams.get('minPrice')

    const priceFilter =  allFilters.find(filter => filter.nameHandle === 'priceRange')
    
    // если цены нет в адресной строке, устанавливаем значение в '' (это будте state для инпута)
    if (!minPrice) filtersFromAddressBar.push({
      filterName: 'Цена',
      nameHandle: 'minPrice',
      selectedValue:  '',
      filterSettings: priceFilter.filterSettings
    })

    if (minPrice) filtersFromAddressBar.push({
      filterName: 'Цена',
      nameHandle: 'minPrice',
      selectedValue: minPrice,
      filterSettings: priceFilter.filterSettings
    })

    const maxPrice = searchParams.get('maxPrice')

    // если цены нет в адресной строке, устанавливаем значение в '' (это будте state для инпута)
    if (!maxPrice) filtersFromAddressBar.push({
      filterName: 'Цена',
      nameHandle: 'maxPrice',
      selectedValue: '',
      filterSettings: priceFilter.filterSettings
    })
    
    if (maxPrice) filtersFromAddressBar.push({
      filterName: 'Цена',
      nameHandle: 'maxPrice',
      selectedValue: maxPrice,
      filterSettings: priceFilter.filterSettings
    })
    
    
    setCurrentFilters(filtersFromAddressBar)
  }, []);

  const onSubmitClick = () => {
    console.log('currentFilters', currentFilters)

    allFilters.forEach(filterItem => {
      searchParams.delete(filterItem.nameHandle)
    })
    searchParams.delete('minPrice')
    searchParams.delete('maxPrice')

    currentFilters.forEach(filterItem => {
      
      if(filterItem.nameHandle === 'minPrice') {
        if (filterItem.selectedValue === '') {
          searchParams.set(filterItem.nameHandle, filterItem.filterSettings[0].value)          
        }
        else {
          searchParams.set(filterItem.nameHandle, filterItem.selectedValue)
        } 
      }

      if(filterItem.nameHandle === 'maxPrice') {
        if (filterItem.selectedValue === '') {
          searchParams.set(filterItem.nameHandle, filterItem.filterSettings[1].value)
        } else {
          searchParams.set(filterItem.nameHandle, filterItem.selectedValue)
        }
      }
      
      
    })

    setSearchParams(searchParams)
    setIsMobileFiltersOpen(false)
  }


  return (
      <div className={s.globalWrapper}>
        <button onClick={() => setIsMobileFiltersOpen(true)} className={s.buttonBlock}>
          <span>Фильтры</span>
          <svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M4.23047 13.3333L4.23047 9.83325C4.23047 9.59409 4.03214 9.39575 3.79297 9.39575C3.5538 9.39575 3.35547 9.59409 3.35547 9.83325L3.35547 13.3333C3.35547 13.5724 3.5538 13.7708 3.79297 13.7708C4.03214 13.7708 4.23047 13.5724 4.23047 13.3333Z"
                fill="#131D2A"/>
            <path
                d="M4.23047 4.00008L4.23047 1.66675C4.23047 1.42758 4.03214 1.22925 3.79297 1.22925C3.5538 1.22925 3.35547 1.42758 3.35547 1.66675L3.35547 4.00008C3.35547 4.23925 3.5538 4.43758 3.79297 4.43758C4.03214 4.43758 4.23047 4.23925 4.23047 4.00008Z"
                fill="#131D2A"/>
            <path
                d="M6.27083 6.33341C6.27083 4.96842 5.15667 3.85425 3.79167 3.85425C2.42667 3.85425 1.3125 4.96841 1.3125 6.33341C1.3125 7.69841 2.42667 8.81258 3.79167 8.81258C5.15667 8.81258 6.27083 7.69841 6.27083 6.33341ZM2.1875 6.33341C2.1875 5.44675 2.905 4.72925 3.79167 4.72925C4.67833 4.72925 5.39583 5.44675 5.39583 6.33341C5.39583 7.22008 4.67833 7.93758 3.79167 7.93758C2.905 7.93758 2.1875 7.22008 2.1875 6.33341Z"
                fill="#131D2A"/>
            <path
                d="M10.6445 13.3333L10.6445 11C10.6445 10.7608 10.4462 10.5625 10.207 10.5625C9.96786 10.5625 9.76953 10.7608 9.76953 11L9.76953 13.3333C9.76953 13.5725 9.96786 13.7708 10.207 13.7708C10.4462 13.7708 10.6445 13.5725 10.6445 13.3333Z"
                fill="#131D2A"/>
            <path
                d="M10.6445 5.16675L10.6445 1.66675C10.6445 1.42758 10.4462 1.22925 10.207 1.22925C9.96786 1.22925 9.76953 1.42758 9.76953 1.66675L9.76953 5.16675C9.76953 5.40591 9.96786 5.60425 10.207 5.60425C10.4462 5.60425 10.6445 5.40591 10.6445 5.16675Z"
                fill="#131D2A"/>
            <path
                d="M12.6888 8.66667C12.6888 7.30167 11.5746 6.1875 10.2096 6.1875C8.84464 6.1875 7.73047 7.30167 7.73047 8.66667C7.73047 10.0317 8.84464 11.1458 10.2096 11.1458C11.5746 11.1458 12.6888 10.0317 12.6888 8.66667ZM8.60547 8.66667C8.60547 7.78 9.32297 7.0625 10.2096 7.0625C11.0963 7.0625 11.8138 7.78 11.8138 8.66667C11.8138 9.55333 11.0963 10.2708 10.2096 10.2708C9.32297 10.2708 8.60547 9.55333 8.60547 8.66667Z"
                fill="#131D2A"/>
          </svg>
        </button>

        <MobileFiltersPopup isOpen={isMobileFiltersOpen} setIsOpen={setIsMobileFiltersOpen} title="Фильтры">

          <ul className={s.list}>
            {
              allFilters.map((filter, i) => {
                if (filter.filterType === 'checkbox') {
                  return <CheckboxFilterMobile key={i} filter={filter} currentFilters={currentFilters}
                                               setCurrentFilters={setCurrentFilters}/>

                }
                if (filter.filterType === 'incheckbox') {
                  return <IncheckboxFilterMobile key={i} filter={filter} currentFilters={currentFilters}
                                                 setCurrentFilters={setCurrentFilters}/>
                }

                if (filter.filterType === 'interval') {
                  return <PriceFilterMobile key={i} filter={filter} currentFilters={currentFilters}
                                            setCurrentFilters={setCurrentFilters}/>
                }

                if (filter.filterType === 'colcheckbox') {
                  return <ColorFilterMobile key={i} filter={filter} currentFilters={currentFilters}
                                            setCurrentFilters={setCurrentFilters}/>
                }
              })
            }
          </ul>
          <Button onClick={onSubmitClick} className={s.submitBtn}>Показать товары</Button>

        </MobileFiltersPopup>
      </div>
  );
};

export default MobileFilters;