import s from './IncheckboxFilter.module.scss';
import FiltersDropdown from "@/components/CategoryBlock/Filters/FiltersDropdown/FiltersDropdown.jsx";
import IncheckboxFilterItem
  from "@/components/CategoryBlock/Filters/DesktopFilters/IncheckboxFilter/IncheckboxFilterItem/IncheckboxFilterItem.jsx";
import {useState} from "react";


const IncheckboxFilter = ({filter, filtersWrapper, rightPartRef}) => {
  const {filterName, filterSettings, nameHandle} = filter

  const [isShowAll, setIsShowAll] = useState(false)
  const newFilterSettings = isShowAll || filterSettings.length <=5 ? [...filterSettings] : filterSettings.slice(0, 5)

  
  return (
  <FiltersDropdown title={filterName} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef} filter={nameHandle}>
    <ul className={s.list}>
      {
        newFilterSettings.map((item, i)=><IncheckboxFilterItem key={i} item={item} filterNameHandle={nameHandle} />)    
      }
    </ul>
    {
        !(isShowAll || filterSettings.length <=5) && <button onClick={() => setIsShowAll(true)} className={s.showAllBtn}>Показать все</button>
    }
  </FiltersDropdown>
  );
};

export default IncheckboxFilter;