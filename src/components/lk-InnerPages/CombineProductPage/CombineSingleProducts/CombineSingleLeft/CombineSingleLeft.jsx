import s from './CombineSingleLeft.module.scss';
import SingleLeftRow
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftRow/SingleLeftRow.jsx";
import SingleLeftHeader
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleLeft/SingleLeftHeader/SingleLeftHeader.jsx";

const CombineSingleLeft = ({productsToMerge, attributes}) => {
  return (
    <div className={s.combineSingleLeftWrapper}>
      <div className={s.combineSingleLeft}>
        <SingleLeftHeader attributes={attributes} />
        {
          productsToMerge.map(productToMerge=><SingleLeftRow 
            key={productToMerge.productVariantId} 
            productToMerge={productToMerge}
            attributes={attributes}
          />)
        }       
      </div>
    </div>
  );
};

export default CombineSingleLeft;