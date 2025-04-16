import s from './SingleLeftRow.module.scss';
import VariantOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/VariantOption/VariantOption.jsx";

const SingleLeftRow = ({productToMerge, attributes}) => {
  return (
    <div className={s.singleLeftRow}>
      
      <div className={s.photo}><img className={s.photoImg} src={productToMerge.productImagePath} alt="photo"/></div>
      
      <div className={s.nameWrapper}>        
        <div className={s.name}>{productToMerge.productName}</div>        
        <div className={s.article}>Артикул: {productToMerge.article}</div>
        <div className={s.cat}>{productToMerge.categoryOption.categoryName}</div>        
      </div>
      
      <div className={s.brand}>{productToMerge.brand}</div>
      <div className={s.type}>{productToMerge.productType}</div>

      {
        attributes.attributes.map(attribute=><VariantOption key={attribute.optionId} attribute={attribute} productToMerge={productToMerge} />)
      }
      {
        attributes.attributes.map(attribute=><VariantOption key={attribute.optionId} attribute={attribute} productToMerge={productToMerge} />)
      }
    </div>
    
     
  );
};

export default SingleLeftRow;