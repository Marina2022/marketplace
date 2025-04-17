import s from './CombineSingleRight.module.scss';

const CombineSingleRight = ({setCheckedProducts, productsToMerge}) => {
  return (
    <div className={s.combineSingleRight}>
      <div className={s.rightHeader}>Статус</div>

      {
        productsToMerge.map(product=><div className={s.row} key={product.productVariantId}>{product.mergeStatus}</div>)
      }
      
    </div>
  );
};

export default CombineSingleRight;