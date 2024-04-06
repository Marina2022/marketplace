import s from './DesktopFilters.module.scss'
import CheckboxFilter from "@/components/CategoryBlock/Filters/DesktopFilters/CheckboxFilter/CheckboxFilter.jsx";
import IncheckboxFilter
  from "@/components/CategoryBlock/Filters/DesktopFilters/IncheckboxFilter/IncheckboxFilter.jsx";
import PriceFilter from "@/components/CategoryBlock/Filters/DesktopFilters/PriceFilter/PriceFilter.jsx";
import ColorFilter from "@/components/CategoryBlock/Filters/DesktopFilters/ColorFilter/ColorFilter.jsx";
import {useEffect, useRef} from "react";


const DesktopFilters = ({allFilters, rightPartRef, globalWrapperRef}) => {


      useEffect(() => {

            let pageYOffset = window.pageYOffset;

            const scrollHandler = (e) => {
              const filterWrapperBottom = filtersWrapper.current.getBoundingClientRect().bottom

              // скроллим вниз
              if (window.pageYOffset > pageYOffset) {
                if (filterWrapperBottom <= window.innerHeight) {


                  //если каталог еще не дошел до низа страницы                  
                  if (rightPartRef.current.getBoundingClientRect().bottom > window.innerHeight) {
                    filtersWrapper.current.style = 'position: fixed; bottom: 20px'
                  } else {
                    filtersWrapper.current.style = 'position: static'
                    globalWrapperRef.current.style = 'align-items: flex-end'
                  }

                  pageYOffset = window.pageYOffset
                }
              }

              // скроллим вверх
              if (window.pageYOffset < pageYOffset) {

                 //filtersWrapper.current.style = `position: static` 
                

                // Если фильтры доехали до верха экрана
                if (filtersWrapper.current.getBoundingClientRect().top >= 0) {

                  console.log('фильтры доехали до верха экрана')

                  console.log('верхний край фильтров = ', filtersWrapper.current.getBoundingClientRect().top )
                  
                  // // фиксируем их по верхнему краю: 
                  

                  // если сверху выезжает правый блок
                  if (rightPartRef.current.getBoundingClientRect().top > 0) {
                    filtersWrapper.current.style = 'position: static'
                    globalWrapperRef.current.style = 'align-items: flex-start'
                  } else {
                    filtersWrapper.current.style = 'position: fixed; top: 20px'  
                  }
                } else {
                  console.log('фильтры не доехали до верха экрана')
                  // если фильтры не доехали до верха экрана:
                  // filtersWrapper.current.style = `position: relative; top:${}`
                  // filtersWrapper.current.style = `position: relative; `
                  // globalWrapperRef.current.style = 'align-items: flex-start'
                }

                pageYOffset = window.pageYOffset

              }

            }


            window.addEventListener('scroll', scrollHandler)

            return () => window.removeEventListener('scroll', scrollHandler)


          }, []
      )
      ;

      const filtersWrapper = useRef()

      return (
          <div className={s.desktopFilters}>
            <div className={s.filtersWrapper} ref={filtersWrapper}>
              <ul>
                {
                  allFilters.map((filter, i) => {
                    if (filter.filterType === 'checkbox') {
                      return <li key={i} className={s.filtersItem}><CheckboxFilter filter={filter}/></li>
                    }
                    if (filter.filterType === 'incheckbox') {
                      return <li key={i} className={s.filtersItem}><IncheckboxFilter key={i} filter={filter}/></li>
                    }

                    if (filter.filterType === 'interval') {
                      return <li key={i} className={s.filtersItem}><PriceFilter key={i} filter={filter}/></li>
                    }

                    if (filter.filterType === 'colcheckbox') {
                      return <li key={i} className={s.filtersItem}><ColorFilter key={i} filter={filter}/></li>
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