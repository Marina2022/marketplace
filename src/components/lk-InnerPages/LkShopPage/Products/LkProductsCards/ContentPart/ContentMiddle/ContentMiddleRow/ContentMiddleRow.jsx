import s from './ContentMiddleRow.module.scss';
import {formatDateToDDMMYYYY} from "@/utils/fromISO.js";
import LinkedProductsMiddle
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddleRow/LinkedProductsMiddle/LinkedProductsMiddle.jsx";

const ContentMiddleRow = ({
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
      <div className={`${s.middleRowWrapper} ${hovered ? s.hovered : ''}`}>
        <div
          className={`${s.middleRow} `}
          onMouseOver={() => handleMouseIn(product.productVariantId)}
          onMouseOut={() => handleMouseOut(product.productVariantId)}
        >
          <div className={s.nameWrapper}>
            <div className={s.name}>
              {product.productName}
            </div>
            {
              hasLinked && <div className={s.catName}>{product.categoryName}</div>
            }
          </div>
          <div className={s.barcode}>{product.barcode}</div>
          <div className={s.brand}>{product.brand}</div>
          <div className={s.price}>{product.price.toLocaleString('ru')}&nbsp;₽</div>

          <div className={s.rating}>{product.rating ? product.rating : 'Без рейтинга' }</div>
          
          <div className={s.reviews}>{product.reviewCount}</div>
          <div className={s.inStock}>{product.inventoryLevel}</div>
          <div className={s.createDate}>{formatDateToDDMMYYYY(product.createDate)}</div>
          <div className={s.updateDate}>{formatDateToDDMMYYYY(product.updateDate)}</div>
        </div>

      </div>
      {
        hasLinked && !collapsed && <LinkedProductsMiddle
          linkedProducts={product.linkedProducts}
          handleMouseOut={handleMouseOut}
          handleMouseIn={handleMouseIn}
          hoveredProducts={hoveredProducts}          
        />
      }
    </div>
  );
};

export default ContentMiddleRow;