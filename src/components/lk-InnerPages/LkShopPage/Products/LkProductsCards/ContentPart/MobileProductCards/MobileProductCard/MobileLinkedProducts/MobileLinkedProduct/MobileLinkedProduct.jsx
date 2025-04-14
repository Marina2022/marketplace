import s from './MobileLinkedProduct.module.scss';
import ContextMenu
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContextMenu/ContextMenu.jsx";
import ProductStatus
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ProductStatus/ProductStatus.jsx";

const MobileLinkedProduct = ({product, getProducts}) => {
  return (
    <div className={s.mobileLinkedProduct}>
      <div className={s.mobileCardHeader}>
        <img className={s.photo} src={product.productImgPath} alt="photo"/>
        <div className={s.centerHeaderPart}>
          <div className={s.mobileCardName}>{product.productName}</div>
          <div className={s.articleRow}>
            <div className={s.articleLabel}>Артикул:</div>
            <div className={s.value}>{product.article}</div>
          </div>
        </div>
        <div className={s.menuBlock}>
          <ContextMenu product={product} getProducts={getProducts}/>
        </div>
      </div>
      <div className={s.centralBlock}>     
        {/*<div className={s.row}>*/}
        {/*  <div className={s.label}>Бренд:</div>*/}
        {/*  <div className={s.value}>{product.brand}</div>*/}
        {/*</div>*/}
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
    </div>
  );
};

export default MobileLinkedProduct;