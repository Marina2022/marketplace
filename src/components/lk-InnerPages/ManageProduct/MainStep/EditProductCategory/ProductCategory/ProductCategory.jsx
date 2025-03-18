import s from './ProductCategory.module.scss';

const ProductCategory = ({productCategory}) => {
  return (
    <div className={s.productCategoryWrapper}>
      {productCategory.productCategoryName}
    </div>
  );
};

export default ProductCategory;