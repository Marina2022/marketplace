import s from './ReviewSort.module.scss';

const ReviewsSort = ({sortColumn, setSortColumn, sortOrder, setSortOrder}) => {
  
  const dateClickHandler = ()=>{
    
    if (sortColumn !== 'date') {
      setSortColumn('date')
      setSortOrder('asc')
            
    } else {
      // если кликаем по активному пункту сортировки
      setSortOrder(prev=>prev === 'asc' ? 'desc' : 'asc' )
    }   
  }

  const ratingClickHandler = ()=>{

    if (sortColumn !== 'rating') {
      setSortColumn('rating')
      setSortOrder('desc')

    } else {
      // если кликаем по активному пункту сортировки
      setSortOrder(prev=>prev === 'asc' ? 'desc' : 'asc' )
    }
  }
  
  return (
    <ul className={s.sortList}>
      <li onClick={dateClickHandler} className={sortColumn === 'date' ? s.activeSortItem : s.sortItem}>По дате</li>
      <li onClick={ratingClickHandler} className={sortColumn === 'rating' ? s.activeSortItem : s.sortItem}>По рейтингу</li>      
    </ul>
  );
};

export default ReviewsSort;