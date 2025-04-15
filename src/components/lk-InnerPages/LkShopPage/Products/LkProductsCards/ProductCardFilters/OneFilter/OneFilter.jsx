import s from './OneFilter.module.scss';
import OneFilterValue
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ProductCardFilters/OneFilter/OneFilterValue/OneFilterValue.jsx";
import {useState} from "react";

const russianNameMapping = {
  status: 'Статус',
  brand: 'Бренд',
  category: 'Категория',
  rating: 'Рейтинг'
}
const OneFilter = ({filter, selectedFilters, setSelectedFilters}) => {

  const [showAll, setShowAll] = useState(false)

  let valuesToShow = filter.filterValues

  if (filter.filterName !== 'rating' && filter.filterValues.length > 4 && !showAll) {
    valuesToShow = filter.filterValues.slice(0, 4)
  }

  // todo Не забыть потом убрать
  if (filter.filterName === 'status') {
    filter.filterValues = [
      {
        filterDisplay: "Продается",
        filterValue: "active"
      },
      {
        filterDisplay: "Ожидает действия",
        filterValue: "approved"
      },
      {
        filterDisplay: "На модерации",
        filterValue: "pendingApproval"
      },
      {
        filterDisplay: "Снят с продажи",
        filterValue: "removed"
      },
      {
        filterDisplay: "Снова в продаже",
        filterValue: "again"
      },
      {
        filterDisplay: "Никак не продается",
        filterValue: "never"
      },


    ]
  }

  if (filter.filterName === 'rating') return <div className={s.oneFilter}>

    <div className={s.filterHeader}>
      <div className={s.filterTitle}>{russianNameMapping[filter.filterName]}</div>

      {/*{*/}
      {/*  filter.filterValues.length > 4 && !showAll &&*/}
      {/*  <button onClick={() => setShowAll(prev => !prev)} className={s.showMoreBtn}>Показать все</button>*/}
      {/*}*/}
    </div>

    <ul className={s.valuesListRating}>
      {
        valuesToShow.map(filterValue => {
          return <OneFilterValue
            filterName={filter.filterName}
            key={filterValue.filterValue}
            filterValue={filterValue}
            selectedFilters={selectedFilters} 
            setSelectedFilters={setSelectedFilters}
            ratingValue={true}
          />
        })
      }
    </ul>
  </div>


  return (
    <div className={s.oneFilter}>
      <div className={s.filterHeader}>
        <div className={s.filterTitle}>{russianNameMapping[filter.filterName]}</div>

        {
          filter.filterValues.length > 4 && !showAll &&
          <button onClick={() => setShowAll(prev => !prev)} className={s.showMoreBtn}>Показать все</button>
        }
      </div>

      <ul className={s.valuesList}>
        {
          valuesToShow.map(filterValue => {
            return <OneFilterValue filterName={filter.filterName} key={filterValue.filterValue}
                                   filterValue={filterValue} selectedFilters={selectedFilters}
                                   setSelectedFilters={setSelectedFilters}/>
          })
        }
      </ul>
    </div>
  );
};

export default OneFilter;