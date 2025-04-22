import s from './LinkedProductLeft.module.scss';

const LinkedProductLeft = ({product, index, linkedProducts, handleMouseOut, handleMouseIn, hoveredProducts}) => {

  const hovered = hoveredProducts.includes(product.productVariantId)
  
  return (
    <div 
         className={`${s.linkedProductLeft} ${hovered ? s.hovered : ''}`}
         onMouseOver={() => handleMouseIn(product.productVariantId)}
         onMouseOut={() => handleMouseOut(product.productVariantId)}
    >
      <div className={s.linkedProductLeftPhoto}>
        <div className={`${s.verticalLine} ${index === linkedProducts.length - 1 ? s.lastChild : ''} `}></div>
        <div className={s.horizontalLine}></div>
        <img className={s.photo} src={product.productImgPath} alt="photo"/>
      </div>
      <div className={s.linkedProductLeftArticle}>{product.article}</div>
    </div>
  )
}

export default LinkedProductLeft