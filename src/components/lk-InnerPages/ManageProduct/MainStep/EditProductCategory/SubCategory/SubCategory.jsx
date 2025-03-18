import s from './SubCategory.module.scss';
import ProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/ProductCategory/ProductCategory.jsx";

const SubCategory = ({subCat}) => {
  return (
    <div className={s.subCategoryWrapper}>
      <p>{subCat.subCategoryName}</p>
      
      <ul>
        {
          subCat.productCategories.map(productCategory=><ProductCategory key={productCategory.productCategoryId} productCategory={productCategory} />)
        }
      </ul>
    </div>
  );
};

export default SubCategory;