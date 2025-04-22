import s from './ProductCardFilters.module.scss';
import {useEffect, useRef, useState} from "react";
import OneFilter
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ProductCardFilters/OneFilter/OneFilter.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import {useSearchParams} from "react-router-dom";

const ProductCardFilters = ({filters}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  let initialFilterState = []

  filters.forEach(filterItem => {
    const filterValues = searchParams.get(filterItem.filterName)
    let valuesArray
    if (filterValues) {
      valuesArray = filterValues.split(',')
      initialFilterState.push({filterName: filterItem.filterName, filterValues: valuesArray})
    }
  })

  const [selectedFilters, setSelectedFilters] = useState(initialFilterState)
  const [showFilters, setShowFilters] = useState(false)
  const popupRef = useRef(null)
  const btnRef = useRef(null)

  // Закрытие по ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setShowFilters(false)
      }
    }

    if (showFilters) {
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [showFilters]);

  // Закрытие по клику вне попапа
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(e.target) &&
        btnRef.current &&
        !btnRef.current.contains(e.target)
      ) {
        setShowFilters(false);
      }
    };

    if (showFilters) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    };
  }, [showFilters]);

  const handleApply = () => {

    const params = new URLSearchParams(searchParams);

    filters.forEach(filterFromApi => {
      const filterIsSelected = selectedFilters.find(filterItem => filterItem.filterName === filterFromApi.filterName)
      if (!filterIsSelected || filterIsSelected.filterValues.length === 0) {
        params.delete(filterFromApi.filterName)
      } else {
        params.set(filterFromApi.filterName, filterIsSelected.filterValues.join(','));
      }
    })

    setSearchParams(params);
    setShowFilters(false)
  }

  return (
    <div className={s.filtersWrapper}>
      <button ref={btnRef} className={s.filterBtn} onClick={() => setShowFilters(prev => !prev)}>
        <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="path-1-inside-1_1218_18211" fill="white">
            <path
              d="M4.83594 15.5834L4.83594 11.3334C4.83594 11.043 4.60927 10.8021 4.33594 10.8021C4.0626 10.8021 3.83594 11.043 3.83594 11.3334L3.83594 15.5834C3.83594 15.8738 4.0626 16.1146 4.33594 16.1146C4.60927 16.1146 4.83594 15.8738 4.83594 15.5834Z"/>
          </mask>
          <path
            d="M3.83594 15.5834L3.83594 11.3334L5.83594 11.3334L5.83594 15.5834L3.83594 15.5834ZM3.83594 11.3334C3.83594 11.5373 4.00074 11.8021 4.33594 11.8021L4.33594 9.80212C5.2178 9.80212 5.83594 10.5487 5.83594 11.3334L3.83594 11.3334ZM4.33594 11.8021C4.67114 11.8021 4.83594 11.5373 4.83594 11.3334L2.83594 11.3334C2.83594 10.5487 3.45407 9.80212 4.33594 9.80212L4.33594 11.8021ZM4.83594 11.3334L4.83594 15.5834L2.83594 15.5834L2.83594 11.3334L4.83594 11.3334ZM4.83594 15.5834C4.83594 15.3795 4.67114 15.1146 4.33594 15.1146L4.33594 17.1146C3.45407 17.1146 2.83594 16.3681 2.83594 15.5834L4.83594 15.5834ZM4.33594 15.1146C4.00074 15.1146 3.83594 15.3795 3.83594 15.5834L5.83594 15.5834C5.83594 16.3681 5.2178 17.1146 4.33594 17.1146L4.33594 15.1146Z"
            fill="#3E5067" mask="url(#path-1-inside-1_1218_18211)"/>
          <mask id="path-3-inside-2_1218_18211" fill="white">
            <path
              d="M4.83594 4.24996L4.83594 1.41663C4.83594 1.12621 4.60927 0.885376 4.33594 0.885376C4.0626 0.885376 3.83594 1.12621 3.83594 1.41663L3.83594 4.24996C3.83594 4.54038 4.0626 4.78121 4.33594 4.78121C4.60927 4.78121 4.83594 4.54038 4.83594 4.24996Z"/>
          </mask>
          <path
            d="M3.83594 4.24996L3.83594 1.41663L5.83594 1.41663L5.83594 4.24996L3.83594 4.24996ZM3.83594 1.41663C3.83594 1.62052 4.00074 1.88538 4.33594 1.88538L4.33594 -0.114624C5.2178 -0.114624 5.83594 0.631903 5.83594 1.41663L3.83594 1.41663ZM4.33594 1.88538C4.67114 1.88538 4.83594 1.62052 4.83594 1.41663L2.83594 1.41663C2.83594 0.631903 3.45407 -0.114624 4.33594 -0.114624L4.33594 1.88538ZM4.83594 1.41663L4.83594 4.24996L2.83594 4.24996L2.83594 1.41663L4.83594 1.41663ZM4.83594 4.24996C4.83594 4.04607 4.67114 3.78121 4.33594 3.78121L4.33594 5.78121C3.45407 5.78121 2.83594 5.03468 2.83594 4.24996L4.83594 4.24996ZM4.33594 3.78121C4.00074 3.78121 3.83594 4.04607 3.83594 4.24996L5.83594 4.24996C5.83594 5.03468 5.2178 5.78121 4.33594 5.78121L4.33594 3.78121Z"
            fill="#3E5067" mask="url(#path-3-inside-2_1218_18211)"/>
          <path
            d="M6.66667 7.08329C6.66667 5.67295 5.58907 4.57288 4.33333 4.57288C3.0776 4.57288 2 5.67295 2 7.08329C2 5.75947 3.01573 4.63538 4.33333 4.63538C5.65093 4.63538 6.66667 5.75947 6.66667 7.08329ZM6.66667 7.08329C6.66667 8.49364 5.58907 9.59371 4.33333 9.59371C3.07875 9.59371 2.00198 8.49566 2 7.08717C2.00198 8.40931 3.01702 9.53121 4.33333 9.53121C5.65093 9.53121 6.66667 8.40711 6.66667 7.08329Z"
            stroke="#3E5067"/>
          <mask id="path-6-inside-3_1218_18211" fill="white">
            <path
              d="M12.1641 15.5833L12.1641 12.75C12.1641 12.4596 11.9374 12.2188 11.6641 12.2188C11.3907 12.2188 11.1641 12.4596 11.1641 12.75L11.1641 15.5833C11.1641 15.8738 11.3907 16.1146 11.6641 16.1146C11.9374 16.1146 12.1641 15.8738 12.1641 15.5833Z"/>
          </mask>
          <path
            d="M11.1641 15.5833L11.1641 12.75L13.1641 12.75L13.1641 15.5833L11.1641 15.5833ZM11.1641 12.75C11.1641 12.9539 11.3289 13.2188 11.6641 13.2188L11.6641 11.2188C12.5459 11.2188 13.1641 11.9653 13.1641 12.75L11.1641 12.75ZM11.6641 13.2188C11.9993 13.2188 12.1641 12.9539 12.1641 12.75L10.1641 12.75C10.1641 11.9653 10.7822 11.2187 11.6641 11.2188L11.6641 13.2188ZM12.1641 12.75L12.1641 15.5833L10.1641 15.5833L10.1641 12.75L12.1641 12.75ZM12.1641 15.5833C12.1641 15.3794 11.9993 15.1146 11.6641 15.1146L11.6641 17.1146C10.7822 17.1146 10.1641 16.3681 10.1641 15.5833L12.1641 15.5833ZM11.6641 15.1146C11.3289 15.1146 11.1641 15.3794 11.1641 15.5833L13.1641 15.5833C13.1641 16.3681 12.5459 17.1146 11.6641 17.1146L11.6641 15.1146Z"
            fill="#3E5067" mask="url(#path-6-inside-3_1218_18211)"/>
          <mask id="path-8-inside-4_1218_18211" fill="white">
            <path
              d="M12.1641 5.66663L12.1641 1.41663C12.1641 1.12621 11.9374 0.885376 11.6641 0.885376C11.3907 0.885376 11.1641 1.12621 11.1641 1.41663L11.1641 5.66663C11.1641 5.95704 11.3907 6.19788 11.6641 6.19788C11.9374 6.19788 12.1641 5.95704 12.1641 5.66663Z"/>
          </mask>
          <path
            d="M11.1641 5.66663L11.1641 1.41663L13.1641 1.41663L13.1641 5.66663L11.1641 5.66663ZM11.1641 1.41663C11.1641 1.62052 11.3289 1.88538 11.6641 1.88538L11.6641 -0.114624C12.5459 -0.114624 13.1641 0.631903 13.1641 1.41663L11.1641 1.41663ZM11.6641 1.88538C11.9993 1.88538 12.1641 1.62052 12.1641 1.41663L10.1641 1.41663C10.1641 0.631903 10.7822 -0.114624 11.6641 -0.114624L11.6641 1.88538ZM12.1641 1.41663L12.1641 5.66663L10.1641 5.66663L10.1641 1.41663L12.1641 1.41663ZM12.1641 5.66663C12.1641 5.46274 11.9993 5.19788 11.6641 5.19788L11.6641 7.19788C10.7822 7.19788 10.1641 6.45135 10.1641 5.66663L12.1641 5.66663ZM11.6641 5.19788C11.3289 5.19788 11.1641 5.46274 11.1641 5.66663L13.1641 5.66663C13.1641 6.45135 12.5459 7.19788 11.6641 7.19788L11.6641 5.19788Z"
            fill="#3E5067" mask="url(#path-8-inside-4_1218_18211)"/>
          <path
            d="M14.0026 9.91667C14.0026 8.50632 12.925 7.40625 11.6693 7.40625C10.4135 7.40625 9.33594 8.50632 9.33594 9.91667M14.0026 9.91667C14.0026 11.327 12.925 12.4271 11.6693 12.4271C10.4135 12.4271 9.33594 11.327 9.33594 9.91667M14.0026 9.91667C14.0026 11.2405 12.9869 12.3646 11.6693 12.3646C10.3517 12.3646 9.33594 11.2405 9.33594 9.91667M14.0026 9.91667C14.0026 8.59285 12.9869 7.46875 11.6693 7.46875C10.3517 7.46875 9.33594 8.59285 9.33594 9.91667"
            stroke="#3E5067"/>
        </svg>
        <span className={s.btnText}>Фильтры</span>
      </button>

      {showFilters && (
        <div className={s.filtersPopup} ref={popupRef}>
          <div className={s.header}>
            <span>
              Фильтры
            </span>
            <button onClick={() => setShowFilters(false)} className={s.closeBtn}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.07138 0.928861C0.583228 1.41702 0.583228 2.20847 1.07138 2.69663L6.37359 7.99883L1.06924 13.3032C0.581086 13.7913 0.581086 14.5828 1.06924 15.071C1.5574 15.5591 2.34885 15.5591 2.83701 15.071L8.14136 9.7666L13.4458 15.071C13.9339 15.5592 14.7254 15.5592 15.2135 15.071C15.7017 14.5828 15.7017 13.7914 15.2135 13.3032L9.90912 7.99883L15.2114 2.69658C15.6995 2.20843 15.6995 1.41697 15.2114 0.928816C14.7232 0.44066 13.9318 0.440659 13.4436 0.928816L8.14136 6.23107L2.83915 0.928861C2.35099 0.440706 1.55954 0.440705 1.07138 0.928861Z"
                      fill="#3E5067"/>
              </svg>
            </button>
          </div>
          <div className={s.scrollWrapper}>
            <ul>
              {
                filters.map((filter, i) => <OneFilter
                  key={i}
                  filter={filter}
                  selectedFilters={selectedFilters}
                  setSelectedFilters={setSelectedFilters}
                />)
              }
            </ul>
          </div>
          <Button onClick={handleApply} className={s.applyBtn}>Применить</Button>
        </div>
      )}
    </div>
  )
}

export default ProductCardFilters
