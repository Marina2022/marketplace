import s from './ProductCatsList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'
import arrowRight from '@/assets/img/arrow-right-menu.svg'

const ProductCatsList = ({
                           categoriesForDropdown,
                           setCurrentProductCat,
                           categoriesForDropdownLoading,
                           currentProductCat,
                           setCurrentProductCatReally,
                           isSubCatsList = false
                         }) => {

  if (categoriesForDropdownLoading) return <Spinner/>

  if (!categoriesForDropdown) return null

  const onTitleClick = () => {
    setCurrentProductCatReally(null)
  }

  return (
    <div>
      {
        isSubCatsList && (
          <h3 className={s.title} onClick={onTitleClick}>
            <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.91406 7.70703L1.41406 4.20703L4.91406 0.707031" stroke="#C0C0C0" strokeWidth="2"/>
            </svg>
            <span>{currentProductCat.categoryName}</span>
          </h3>
        )
      }

      <ul>
        {
          categoriesForDropdown.map((cat, i) => <li
            key={i}
            onClick={() => setCurrentProductCat(cat)}
            className={s.catItem}
          >
            <img src={fallbackPhoto} alt="photo"/>
            <span className={s.categoryName}>{cat.categoryName || cat.subCategoryName}</span>
            <img src={arrowRight} alt="right" className={s.arrow}/>

          </li>)
        }
      </ul>

    </div>

  );
};

export default ProductCatsList;