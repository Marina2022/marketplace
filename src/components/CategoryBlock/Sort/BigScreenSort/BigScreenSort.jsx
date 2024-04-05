import s from './BigScreenSort.module.scss';
import BigScreenSortItem from "@/components/CategoryBlock/Sort/BigScreenSort/BigScreenSortItem/BigScreenSortItem.jsx";
import {sortOptions} from "@/consts/sortOptions.js";


const BigScreenSort = () => {
  return (
      <ul className={s.sortList}>

        {
          sortOptions.map((option, i)=><BigScreenSortItem sortColumn={option.sortColumn} label={option.label}  defaultOrder={option.defaultOrder} />)
        }
        
      </ul>
  );
};

export default BigScreenSort;