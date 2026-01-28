import s from './ProductSubcategories.module.scss';
import SubCatBlock
  from "@/components/layout/categoryDropdowns/CategoryDropdownDesktop/ProductSubcategories/SubCatBlock/SubCatBlock.jsx";

const ProductSubcategories = ({currentProductCat}) => {

  if (!currentProductCat) return null

  return (
    <div className={s.subCatWrapper}>
      <h2 className={s.title}>{currentProductCat.categoryName}</h2>

      <ul className={s.subCatList}>
        {
          currentProductCat.subCategories.map(subCat => <SubCatBlock key={subCat.subCategoryId} subCat={subCat}/>)
        }
      </ul>
    </div>
  );
};

export default ProductSubcategories;