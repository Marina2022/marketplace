import s from './CombineCardLeft.module.scss';
import SingleLeftHeader
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftHeader/SingleLeftHeader.jsx";
import CardLeftRow
  from "@/components/lk-InnerPages/CombineProductPage/CombineWithCard/CombineCardLeft/CardLeftRow/CardLeftRow.jsx";

const CombineCardLeft = ({productsInCard, attributes}) => {
  
  return (
    <div className={s.combineSingleLeftWrapper}>
      <div className={s.combineSingleLeft}>
        <SingleLeftHeader attributes={attributes} />
        {
          productsInCard.map(productToMerge=><CardLeftRow
            key={productToMerge.productVariantId}
            productToMerge={productToMerge}
            attributes={attributes}            
          />)
        }
      </div>
    </div>
  );
};

export default CombineCardLeft;