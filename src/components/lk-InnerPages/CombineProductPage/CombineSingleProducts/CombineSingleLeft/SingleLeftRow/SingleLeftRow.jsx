import s from './SingleLeftRow.module.scss';
import VariantOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/VariantOption/VariantOption.jsx";
import BrandOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/BrandOption/BrandOption.jsx";
import TypeOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/TypeOption/TypeOption.jsx";

const SingleLeftRow = ({productToMerge, attributes}) => {
  return (
    <div className={s.singleLeftRow}>

      <div className={s.photo}><img className={s.photoImg} src={productToMerge.productImagePath} alt="photo"/></div>

      <div className={s.nameWrapper}>
        <div className={s.name}>{productToMerge.productName}</div>
        <div className={s.article}>Артикул: {productToMerge.article}</div>
        <div className={s.cat}>{productToMerge.categoryOption.categoryName}</div>
      </div>

      {/*<div className={s.brand}>{productToMerge.brand}</div>*/}
      
      <BrandOption productToMerge={productToMerge} attributes={attributes} />
      <TypeOption productToMerge={productToMerge} attributes={attributes} />
      
      
      {/*<div className={s.type}>{productToMerge.productType}</div>*/}

      {
        attributes.attributes.map(attribute => <VariantOption
          key={attribute.optionId}
          attribute={attribute}
          productToMerge={productToMerge}/>)
      }

    </div>

  );
};

export default SingleLeftRow;