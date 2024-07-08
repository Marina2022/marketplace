import s from './ReviewSort.module.scss';

const ReviewsSort = ({sort, setSort}) => {
  return (
    <ul className={s.sortList}>
      <li onClick={()=>setSort('date')} className={sort === 'date' ? s.activeSortItem : s.sortItem}>По дате</li>
      <li onClick={()=>setSort('rating')} className={sort === 'rating' ? s.activeSortItem : s.sortItem}>По рейтингу</li>      
    </ul>
  );
};

export default ReviewsSort;