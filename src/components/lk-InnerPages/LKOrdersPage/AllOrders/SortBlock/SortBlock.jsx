import s from './SortBlock.module.scss';
import {useState} from "react";

const SortBlock = ({sortingType, setSortingType, dateSort, setDateSort, sortingData}) => {

  const handleYearClick = (year, sortingType) => {
    console.log('handleYearClick', {year, sortingType})
    setDateSort(year)
    setSortingType(sortingType)
  }

  // если есть заказы в категории товары, то открыт будет список именно с этой категорией 
  const foundItem = sortingData.find(item => item.sortingOrderType === 'product')
  const [openedSortingList, setOpenedSortingList] = useState(foundItem ? 'product' : 'services')

  console.log({
    sortingType, dateSort, openedSortingList
  })

  return (
    <ul className={s.sortBlock}>
      {
        sortingData.map(sortingGroup => {

          return (
            sortingGroup.years.length > 0 && <li className={s.srortingGroupItem} key={sortingGroup.sortingOrderType}>
              <h3
                className={s.sortTitle}
                onClick={() => setOpenedSortingList(sortingGroup.sortingOrderType)}>
                {sortingGroup.sortingOrderTypeDisplay}
              </h3>
              {
                openedSortingList === sortingGroup.sortingOrderType && (
                  <ul>
                    {
                      sortingGroup.years.map(year => {

                        return <li
                          className={(dateSort === year.year && sortingType === sortingGroup.sortingOrderType) ? s.yearItemActive : s.yearItem}
                          onClick={() => handleYearClick(year.year, sortingGroup.sortingOrderType)}
                          key={year.year}
                        >
                          {year.year}
                        </li>
                      })
                    }
                  </ul>
                )
              }
            </li>
          )
        })
      }

    </ul>
  );
};

export default SortBlock;