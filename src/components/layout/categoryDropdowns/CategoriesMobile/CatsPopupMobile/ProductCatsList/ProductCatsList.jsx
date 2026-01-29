import s from './ProductCatsList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'

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
            className={`${s.catItem}`}

          >
            <img src={fallbackPhoto} alt="photo"/>
            <span className={s.categoryName}>{cat.categoryName || cat.subCategoryName}</span>

            <svg className={s.arrow} width="7" height="13" viewBox="0 0 7 13" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M6.44812 6.50133C6.44812 7.02633 6.24563 7.55133 5.84813 7.94883L0.958125 12.8388C0.740625 13.0563 0.380625 13.0563 0.163125 12.8388C-0.054375 12.6213 -0.054375 12.2613 0.163125 12.0438L5.05312 7.15383C5.41312 6.79383 5.41312 6.20883 5.05312 5.84883L0.163125 0.958829C-0.054375 0.741329 -0.054375 0.381328 0.163125 0.163828C0.380625 -0.0536721 0.740625 -0.0536721 0.958125 0.163828L5.84813 5.05383C6.24563 5.45133 6.44812 5.97633 6.44812 6.50133Z"
                fill="#658092"/>
            </svg>
          </li>)
        }
      </ul>

    </div>

  );
};

export default ProductCatsList;