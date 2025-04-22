import s from './MobileProductCard.module.scss';
import ContextMenu
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContextMenu/ContextMenu.jsx";
import ProductStatus
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ProductStatus/ProductStatus.jsx";
import MobileLinkedProducts
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/MobileProductCards/MobileProductCard/MobileLinkedProducts/MobileLinkedProducts.jsx";

const MobileProductCard = ({product, collapsedProducts, getProducts, setCollapsedProducts}) => {

  const collapsed = collapsedProducts.includes(product.productVariantId)
  const hasLinked = product.linkedProducts?.length > 0
  const handleCollapse = () => {
    const tempCollapsedProducts = [...collapsedProducts]

    if (tempCollapsedProducts.includes(product.productVariantId)) {
      setCollapsedProducts(tempCollapsedProducts.filter(item => item !== product.productVariantId))
    } else {
      tempCollapsedProducts.push(product.productVariantId)
      setCollapsedProducts(tempCollapsedProducts)
    }
  }

  return (
    <div className={s.mobileProductCard}>
      <div className={s.mobileCardHeader}>
        <img className={s.photo} src={product.productImgPath} alt="photo"/>
        <div className={s.centerHeaderPart}>
          <div className={s.mobileCardName}>{product.productName}</div>
          <div className={s.mobileCategoryName}>{product.categoryName}</div>          
        </div>
        <div className={s.menuBlock}>
          <ContextMenu product={product} getProducts={getProducts}/>
        </div>
      </div>
      <div className={s.centralBlock}>
        <div className={s.row}>
          <div className={s.label}>Артикул:</div>
          <div className={s.value}>{product.article}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Бренд:</div>
          <div className={s.value}>{product.brand}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Количество:</div>
          <div className={s.value}>{product.inventoryLevel}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Цена товара:</div>
          <div className={s.value}>{product.price}</div>
        </div>
        <div className={s.row}>
          <div className={s.label}>Статус карточки:</div>
          <ProductStatus product={product} mobile={true}/>
        </div>
      </div>

      {
        hasLinked && <div className={s.unitedBlock} onClick={handleCollapse}>
          <div className={s.unitedText}>Объединено ({product.linkedProducts.length})</div>
          <svg className={collapsed ? s.collapseIconReversed : s.collapseIcon} width="16" height="16"
               viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M8.00292 4.79995C8.46958 4.79995 8.93625 4.97995 9.28958 5.33328L13.6362 9.67995C13.8296 9.87328 13.8296 10.1933 13.6362 10.3866C13.4429 10.5799 13.1229 10.5799 12.9296 10.3866L8.58292 6.03995C8.26292 5.71995 7.74292 5.71995 7.42292 6.03995L3.07625 10.3866C2.88292 10.5799 2.56292 10.5799 2.36958 10.3866C2.17625 10.1933 2.17625 9.87328 2.36958 9.67995L6.71625 5.33328C7.06958 4.97995 7.53625 4.79995 8.00292 4.79995Z"
              fill="#658092"/>
          </svg>
        </div>
      }

      {
        hasLinked && !collapsed &&
        <MobileLinkedProducts linkedProducts={product.linkedProducts} getProducts={getProducts}/>
      }
    </div>
  )
}

export default MobileProductCard;