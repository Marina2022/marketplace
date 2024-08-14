import s from './FavCategoriesMobile.module.scss';

const FavCategoriesMobile = ({cats, productCategoryId, setProductCategoryId}) => {
  return (
    <div className={s.catsMobile}>
      <ul className={s.inside}>
        <li className={s.item} onClick={()=>setProductCategoryId(null)}>Все категории</li>

        {
          cats.map((cat, i) => <li onClick={()=>setProductCategoryId(cat.categoryId)} key={i} className={s.item}>{cat.categoryName}</li>)
        }
        
      </ul>
    </div>
  );
};

export default FavCategoriesMobile;