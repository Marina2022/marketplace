import s from './MobileFilterListBlock.module.scss';
import MobileFilterListBlockItem
  from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilterListBlock/MobileFilterListBlockItem/MobileFilterListBlockItem.jsx";

const MobileFilterListBlock = ({filters, setIsMobileFiltersOpen }) => {
  return (
      <div className={s.globalWrapper}>

        <div className={s.wrapperScreenWidth}>
          {

            filters.map((filter, i)=><MobileFilterListBlockItem key={i} filter={filter} setIsMobileFiltersOpen={setIsMobileFiltersOpen} />)             
            
          }
        </div>
      </div>
  );
};

export default MobileFilterListBlock;