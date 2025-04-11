import s from './ContentRightRow.module.scss'
import LinkedProductsRight
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRightRow/LinkedProductsRight/LinkedProductsRight.jsx";
import ContextMenu
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContextMenu/ContextMenu.jsx";
import ProductStatus
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ProductStatus/ProductStatus.jsx";

const ContentRightRow = ({
                           product,
                           handleMouseIn,
                           handleMouseOut,
                           hoveredProducts,
                           collapsedProducts                           
                         }
) => {

  const hasLinked = product.linkedProducts?.length > 0
  const hovered = hoveredProducts.includes(product.productVariantId)
  const collapsed = collapsedProducts.includes(product.productVariantId)


  return (
    <div className={s.outerWrapper}>
      <div className={hovered ? s.hovered : ''}>
        <div
          className={`${s.rightRow} `}
          onMouseOver={() => handleMouseIn(product.productVariantId)}
          onMouseOut={() => handleMouseOut(product.productVariantId)}
        >
          <div className={s.rightRowContent}>
            <ProductStatus />
            <ContextMenu />           
          </div>
        </div>

      </div>
      {
        hasLinked && !collapsed && <LinkedProductsRight
          linkedProducts={product.linkedProducts}
          handleMouseOut={handleMouseOut}
          handleMouseIn={handleMouseIn}
          hoveredProducts={hoveredProducts}
        />
      }
    </div>
  );
};

export default ContentRightRow;