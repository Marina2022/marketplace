import s from './FavCategoriesDesktop.module.scss';
import arrow from '@/assets/img/cart/fav-category-arrow.svg'
const FavCategoriesDesktop = ({cats, setProductCategoryId, productCategoryId}) => {

  if (!cats) return <></> 
  return (
    <ul className={s.wrapper}>
      <li
        className={`${s.firstCategoryItem} ${!productCategoryId ? s.activeItem : ''}`}
        onClick={() => setProductCategoryId(null)}
      >
        <span>Все категории</span>
        <img className={s.arrow} src={arrow} alt="arrow"/></li>
      {
        cats.map((cat, i) => {
          return (
            <li
              className={`${s.categoryItem} ${productCategoryId === cat.categoryId ? s.activeItem : ''}`}
              onClick={() => setProductCategoryId(cat.categoryId)}
              key={i}>{cat.categoryName}</li>
          )
        })
      }
    </ul>
  );
};

export default FavCategoriesDesktop;