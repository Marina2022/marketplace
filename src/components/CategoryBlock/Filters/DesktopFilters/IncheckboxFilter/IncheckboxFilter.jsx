import s from './IncheckboxFilter.module.scss';
import FiltersDropdown from "@/components/CategoryBlock/Filters/FiltersDropdown/FiltersDropdown.jsx";
import CheckboxFilterItem
  from "@/components/CategoryBlock/Filters/DesktopFilters/CheckboxFilter/CheckboxFilterItem/CheckboxFilterItem.jsx";

const IncheckboxFilter = ({filter, filtersWrapper, rightPartRef}) => {
  const {filterName, filterSettings, filterType, nameHandle} = filter
  
  return (

  <FiltersDropdown title={filterName} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef} filter={nameHandle}>
    <ul className={s.list}>
      {
        filterSettings.map((item, i)=><CheckboxFilterItem key={i} item={item} filterNameHandle={nameHandle} />)
      }
    </ul>
  </FiltersDropdown>
  );
};

export default IncheckboxFilter;