import s from './ProductCategory.module.scss';

const ProductCategory = ({productCategory, lastOne, selectedCatId, setSelectedCatId}) => {

  const selectHandler = () => {
    setSelectedCatId(productCategory.productCategoryId)    
  }
  
  const idSelected = productCategory.productCategoryId === selectedCatId
  
  return (
    <div className={s.outer}>
      {
        lastOne && <div className={s.verticalTickEraser}></div>
      }
      
      <div className={`${s.productCategoryWrapper} ${idSelected ? s.selectedCategory : ''} `} onClick={selectHandler}  >
        <div className={s.horizontalLine}></div>
        <span className={s.categoryName}>
          {productCategory.productCategoryName}
        </span>
      </div>
    </div>
  );
};

export default ProductCategory;