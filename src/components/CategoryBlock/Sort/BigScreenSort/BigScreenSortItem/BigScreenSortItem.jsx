import s from './BigScreenSortItem.module.scss'
import {useSearchParams} from "react-router-dom";

const BigScreenSortItem = ({label, sortColumn, defaultOrder}) => {

  let status = 'notSelected'  // notSelected, asc, desc

  const [searchParams, setSearchParams] = useSearchParams();

  const valueFromAddressBar = searchParams.get('sortColumn')

  if (valueFromAddressBar === sortColumn) {
    const sortOrderFromAddressBar = searchParams.get('sortOrder')
    if (sortOrderFromAddressBar) {
      status = sortOrderFromAddressBar
    } else {
      status = defaultOrder
    }
  }

  const onItemClick = () => {
    let valueToSet = status === 'asc' ? 'desc' : 'asc'

    if (status === 'notSelected') {
      valueToSet = defaultOrder
    } else if (status === 'asc') {
      valueToSet = 'desc'
    } else if (status === 'desc') {
      valueToSet = 'asc'
    }

    searchParams.set('sortOrder', valueToSet)
    searchParams.set('sortColumn', sortColumn)
    searchParams.set('page', 1)
    setSearchParams(searchParams)
  }

  return (
      <li className={s.item} onClick={onItemClick}>
        <span>
        {label}
        </span>
        {
         status !=='notSelected' && <svg className={ status === "asc" ?  s.ascIcon : s.descIcon} width="13" height="13" viewBox="0 0 13 13" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <rect width="6" height="2" transform="translate(0 2)" fill="#E32636"/>
            <rect width="10" height="2" transform="translate(0 6)" fill="#E32636"/>
            <rect width="13" height="2" transform="translate(0 10)" fill="#E32636"/>
          </svg>

        }
      </li>
  );
};

export default BigScreenSortItem;