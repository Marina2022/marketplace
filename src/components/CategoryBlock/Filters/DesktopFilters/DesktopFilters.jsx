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

      console.log('filtersWrapper.current - top', filtersWrapper.current.getBoundingClientRect().top)
      
      //

      // if (filterWrapperBottom > window.innerHeight) console.log('жди')

      // console.log('filterWrapperBottom', filterWrapperBottom)
      // console.log('window.innerHeight', window.innerHeight)

      

      if (filterWrapperBottom <= window.innerHeight) {

        if (window.pageYOffset > pageYOffset) {
          console.log('down')

          //если каталог еще не дошел до низа страницы
          console.log('rightPartRef - bottom)', rightPartRef.current.getBoundingClientRect().bottom)
          if (rightPartRef.current.getBoundingClientRect().bottom > window.innerHeight) {
            filtersWrapper.current.style = 'position: fixed; bottom: 20px'            
          } else {
            filtersWrapper.current.style = 'position: static'
            globalWrapperRef.current.style = 'align-items: flex-end'
          }
          

          pageYOffset = window.pageYOffset
        } else {
          console.log('up')
          filtersWrapper.current.style = 'position: static; '
          pageYOffset = window.pageYOffset


          if (rightPartRef.current.getBoundingClientRect().top < window.innerHeight) {
            filtersWrapper.current.style = 'position: fixed; bottom: 20px'
          } else {
            filtersWrapper.current.style = 'position: static'
            globalWrapperRef.current.style = 'align-items: flex-end'
          }
          
        }
      }
    }


    window.addEventListener('scroll', scrollHandler)

    return () => window.removeEventListener('scroll', scrollHandler)


  }, []);

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
};

export default DesktopFilters;