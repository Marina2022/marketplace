import s from './SingleLeftRow.module.scss';
import VariantOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/VariantOption/VariantOption.jsx";
import BrandOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/BrandOption/BrandOption.jsx";
import TypeOption
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/TypeOption/TypeOption.jsx";

const SingleLeftRow = ({productToMerge, attributes, getData}) => {
  return (
    <div className={s.singleLeftRow}>

      <div className={s.photo}><img className={s.photoImg} src={productToMerge.productImagePath} alt="photo"/></div>

      <div className={s.nameWrapper}>
        <div className={s.name}>{productToMerge.productName}</div>
        <div className={s.article}>Артикул: {productToMerge.article}</div>
        <div className={s.cat}>{productToMerge.categoryOption.categoryName}</div>
      </div>
            
      <BrandOption productToMerge={productToMerge} attributes={attributes} getData={getData} />
      <TypeOption productToMerge={productToMerge} attributes={attributes} getData={getData} />

      {
        productToMerge.variantCharacteristicsOptions.length > 0 && attributes.attributes.map(attribute => <VariantOption          
          key={attribute.optionId}
          attribute={attribute}
          attributes={attributes}
          productToMerge={productToMerge}
          getData={getData}            
        />)
      }

    </div>

  );
};

export default SingleLeftRow;