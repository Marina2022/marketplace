import s from './LinkedProductMiddle.module.scss';
import {formatDateToDDMMYYYY} from "@/utils/fromISO.js";

const LinkedProductMiddle = ({product, handleMouseOut, handleMouseIn, hoveredProducts}) => {

  const hovered = hoveredProducts.includes(product.productVariantId)

  return (
    <div
      className={`${s.linkedProductMiddle} ${hovered ? s.hovered : ''}`}
      onMouseOver={() => handleMouseIn(product.productVariantId)}
      onMouseOut={() => handleMouseOut(product.productVariantId)}
    >
      <div className={s.nameWrapper}>
        <div className={s.name}>
          {product.productName}
        </div>        
      </div>
      <div className={s.barcode}>{product.barcode}</div>
      <div className={s.brand}>{product.brand}</div>
      <div className={s.price}>{product.price.toLocaleString('ru')}&nbsp;₽</div>
      <div className={s.rating}>{product.rating ? product.rating : 'Без рейтинга'}</div>
      <div className={s.reviews}>{product.reviewCount}</div>
      <div className={s.inStock}>{product.inventoryLevel}</div>
      <div className={s.createDate}>{formatDateToDDMMYYYY(product.createDate)}</div>
      <div className={s.updateDate}>{formatDateToDDMMYYYY(product.updateDate)}</div>  
    </div>
  )    
}

export default LinkedProductMiddle;