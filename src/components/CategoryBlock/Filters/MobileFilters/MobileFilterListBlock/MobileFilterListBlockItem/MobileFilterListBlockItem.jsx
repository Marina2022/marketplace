import s from './MobileFilterListBlockItem.module.scss';
import {useSearchParams} from "react-router-dom";

const MobileFilterListBlockItem = ({filter, setIsMobileFiltersOpen}) => {  
  const  {filterName, nameHandle} = filter  
  const [searchParams] = useSearchParams();  
  let isActive = false
  if (searchParams.get(nameHandle)) isActive = true
  if ((searchParams.get('minPrice') || searchParams.get('maxPrice')) && nameHandle === 'priceRange' ) isActive = true
      
  return (
      <div className={isActive ? s.filterBadgeActive : s.filterBadge} onClick={()=>setIsMobileFiltersOpen(true)} >
        {filterName}
      </div>
  );
};

export default MobileFilterListBlockItem;