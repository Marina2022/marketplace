import s from './CheckboxFilter.module.scss';
import FiltersDropdown from "@/components/CategoryBlock/Filters/FiltersDropdown/FiltersDropdown.jsx";
import CheckboxFilterItem
  from "@/components/CategoryBlock/Filters/DesktopFilters/CheckboxFilter/CheckboxFilterItem/CheckboxFilterItem.jsx";

const CheckboxFilter = ({filter, filtersWrapper, rightPartRef}) => {
  const {filterName, filterSettings, filterType, nameHandle} = filter


  return (
      <FiltersDropdown title={filterName} filtersWrapper={filtersWrapper} rightPartRef={rightPartRef} >
        <ul className={s.list}>
          {
            filterSettings.map((item, i)=><CheckboxFilterItem key={i} item={item} />)
          }          
        </ul>
        
      </FiltersDropdown>
  );
};

export default CheckboxFilter;