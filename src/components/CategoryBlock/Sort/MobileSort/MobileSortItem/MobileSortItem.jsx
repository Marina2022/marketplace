import s from './MobileSortItem.module.scss';
import {useSearchParams} from "react-router-dom";

const MobileSortItem = ({item}) => {
  const {sortColumn, label, sortOrder, defaultOrder} = item

  const [searchParams, setSearchParams] = useSearchParams();

  let isActive = false;

  const valueFromAddressBar = searchParams.get('sortColumn')


  if (valueFromAddressBar === sortColumn) {
    const sortOrderFromAddressBar = searchParams.get('sortOrder')

    // если порядокСортировки в адресной строке указан
    if (sortOrderFromAddressBar) {
      if (sortOrderFromAddressBar === sortOrder) isActive = true
    }
    // если порядокСортировки в адресной строке не указан
    if (!sortOrderFromAddressBar) {
      if (defaultOrder === sortOrder) isActive = true
    }
  }
  
  const onItemClick = (e)=>{
    searchParams.set('sortColumn', sortColumn)
    searchParams.set('sortOrder', sortOrder)
    setSearchParams(searchParams)
  }


  return (
      <li onClick={onItemClick} className={s.mobileSortItem}>
        <span className={isActive ? s.circleActive : s.circle}></span>
        {label}
      </li>
  );
};

export default MobileSortItem;