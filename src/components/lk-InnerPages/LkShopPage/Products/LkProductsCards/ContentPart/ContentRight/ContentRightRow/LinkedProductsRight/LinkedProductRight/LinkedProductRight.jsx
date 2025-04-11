import s from './LinkedProductRight.module.scss'
import ProductStatus
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ProductStatus/ProductStatus.jsx";
import ContextMenu
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContextMenu/ContextMenu.jsx";

const LinkedProductRight = ({product, handleMouseOut, handleMouseIn, hoveredProducts}) => {

  const hovered = hoveredProducts.includes(product.productVariantId)

  return (
    <div
      className={`${s.linkedProductRight} ${hovered ? s.hovered : ''}`}
      onMouseOver={() => handleMouseIn(product.productVariantId)}
      onMouseOut={() => handleMouseOut(product.productVariantId)}
    >

      <div className={s.rightRowContent}>
        <ProductStatus product={product}/>
        <ContextMenu product={product} linked={true} />
      </div>


    </div>
  )
    ;
};

export default LinkedProductRight;