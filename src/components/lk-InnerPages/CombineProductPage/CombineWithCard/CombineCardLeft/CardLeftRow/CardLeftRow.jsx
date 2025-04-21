import s from './CardLeftRow.module.scss';

const CardLeftRow = ({productToMerge, attributes}) => {
  return (
    <div className={s.singleLeftRow}>

      <div className={s.photo}><img className={s.photoImg} src={productToMerge.productImagePath} alt="photo"/></div>

      <div className={s.nameWrapper}>
        <div className={s.name}>{productToMerge.productName}</div>
        <div className={s.article}>Артикул: {productToMerge.article}</div>
        <div className={s.cat}>{productToMerge.categoryName}</div>
      </div>
     
      <div className={s.brand}>{productToMerge.brand}</div>
      <div className={s.type}>{productToMerge.productType}</div>
     
      {
        productToMerge.variantCharacteristicsOptions.length > 0 && attributes.attributes.map((attribute, i) => {
            const productCharacteristicsValue = productToMerge.variantCharacteristicsOptions.find(
              item => item.optionId === attribute.optionId
            )
            return <div key={i} className={s.variantOption}>{productCharacteristicsValue.optionValue}</div>
          }
        )
      }

    </div>

  );
};

export default CardLeftRow;