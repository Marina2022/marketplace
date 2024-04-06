import s from './Filters.module.scss'
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";
import CheckboxFilter from "@/components/CategoryBlock/Filters/DesktopFilters/CheckboxFilter/CheckboxFilter.jsx";
import IncheckboxFilter
  from "@/components/CategoryBlock/Filters/DesktopFilters/IncheckboxFilter/IncheckboxFilter.jsx";
import PriceFilter from "@/components/CategoryBlock/Filters/DesktopFilters/PriceFilter/PriceFilter.jsx";
import * as PropTypes from "prop-types";

function ColorFilter(props) {
  return null;
}

ColorFilter.propTypes = {};
const Filters = ({allFilters}) => {
  return (      
      <div className={s.filtersWrapper}>
        <ul>
          {
            allFilters.map((filter, i)=>{
              if (filter.filterType === 'checkbox') {
                return <CheckboxFilter key={i} filter={filter} />
              }
              if (filter.filterType === 'incheckbox') {
                return <IncheckboxFilter key={i} filter={filter} />
              }

              if (filter.filterType === 'interval') {
                return <PriceFilter key={i} filter={filter} />
              }

              if (filter.filterType === 'colcheckbox') {
                return <ColorFilter key={i} filter={filter} />
              }
            })
          }
          
          
        </ul>
      </div>
  );
};

export default Filters;