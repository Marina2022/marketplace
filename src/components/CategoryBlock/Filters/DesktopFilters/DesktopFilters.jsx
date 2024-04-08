import s from './DesktopFilters.module.scss'
import CheckboxFilter from "@/components/CategoryBlock/Filters/DesktopFilters/CheckboxFilter/CheckboxFilter.jsx";
import IncheckboxFilter
  from "@/components/CategoryBlock/Filters/DesktopFilters/IncheckboxFilter/IncheckboxFilter.jsx";
import PriceFilter from "@/components/CategoryBlock/Filters/DesktopFilters/PriceFilter/PriceFilter.jsx";
import ColorFilter from "@/components/CategoryBlock/Filters/DesktopFilters/ColorFilter/ColorFilter.jsx";
import {useEffect, useRef} from "react";


const DesktopFilters = ({allFilters, rightPartRef}) => {

      useEffect(() => {

            let pageYOffset = window.pageYOffset;
            let isRelative = false

            const scrollHandler = (e) => {
     
              globalWrapper.current.style = 'position: static; top: 0'

              const filterWrapperBottom = filtersWrapper.current.getBoundingClientRect().bottom

              // скроллим вниз
              if (window.pageYOffset > pageYOffset) {

                // если фильтры дошли до низа страницы
                if (filterWrapperBottom <= window.innerHeight) {

                  //если каталог еще не дошел снизу до низа страницы                  
                  if (rightPartRef.current.getBoundingClientRect().bottom - 70 > window.innerHeight) {
                    
                    
                    filtersWrapper.current.style = 'position: fixed; bottom: 20px'
                    isRelative = false

                    // Высота маленькая (фильтры влазят на экран, не скрролим)
                    if (filtersWrapper.current.getBoundingClientRect().height < window.innerHeight -40 ) {  // 40 - Вертикальный отступ у фильтров
                      if (rightPartRef.current.getBoundingClientRect().top <= 0) {
                        filtersWrapper.current.style = 'position: fixed; top: 20px'
                      } else {
                        filtersWrapper.current.style = 'position: static; '
                      }
                    }

                    //если каталог дошел снизу до низа страницы       
                  } else {

                    if (!isRelative) {
                      isRelative = true
                      filtersWrapper.current.style = `position: relative; top: ${window.pageYOffset + filtersWrapper.current.getBoundingClientRect().y - 215}px`
                    }
                  }
                  pageYOffset = window.pageYOffset

                  // если фильтры не дошли до низа страницы:
                } else {
                  if (!isRelative) {
                    isRelative = true
                    filtersWrapper.current.style = `position: relative; top: ${window.pageYOffset + filtersWrapper.current.getBoundingClientRect().y - 215}px`
                  }
                }
              }

              // скроллим вверх
              if (window.pageYOffset < pageYOffset) {

                if (!isRelative) {
                  isRelative = true
                  filtersWrapper.current.style = `position: relative; top: ${window.pageYOffset + filtersWrapper.current.getBoundingClientRect().y - 215}px`
                }

                // Если фильтры доехали до верха экрана
                if (filtersWrapper.current.getBoundingClientRect().top >= 0) {

                  // фиксируем их по верхнему краю: 
                  // если сверху выезжает правый блок
                  if (rightPartRef.current.getBoundingClientRect().top > 0) {
                    filtersWrapper.current.style = 'position: static'
                    // isRelative = false
                  } else {
                    filtersWrapper.current.style = 'position: fixed; top: 20px'
                    isRelative = false
                  }
                }
              }
              pageYOffset = window.pageYOffset
            }
            window.addEventListener('scroll', scrollHandler)

            return () => window.removeEventListener('scroll', scrollHandler)
          }, []
      )

      const filtersWrapper = useRef()
      const globalWrapper = useRef()

      return (
          <div className={s.desktopFilters} ref={globalWrapper}>
            <div className={s.filtersWrapper} ref={filtersWrapper}>
              <ul>
                {
                  allFilters.map((filter, i) => {
                    if (filter.filterType === 'checkbox') {
                      return <li key={i} className={s.filtersItem}><CheckboxFilter filter={filter} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef} /></li>
                    }
                    if (filter.filterType === 'incheckbox') {
                      return <li key={i} className={s.filtersItem}><IncheckboxFilter key={i} filter={filter} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef}/></li>
                    }

                    if (filter.filterType === 'interval') {
                      return <li key={i} className={s.filtersItem}><PriceFilter key={i} filter={filter} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef}/></li>
                    }

                    if (filter.filterType === 'colcheckbox') {
                      return <li key={i} className={s.filtersItem}><ColorFilter key={i} filter={filter} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef}/></li>
                    }
                  })
                }
              </ul>
            </div>
          </div>
      );
    }
;

export default DesktopFilters;