import s from './MobileProductCards.module.scss';
import MobileProductCard
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/MobileProductCards/MobileProductCard/MobileProductCard.jsx";

const MobileProductCards = ({products, collapsedProducts, getProducts, setCollapsedProducts}) => {
  return (
    <div className={s.mobileProductCardsWrapper}>
      {
        products.map(product=><MobileProductCard 
          key={product.productVariantId} 
          product={product} 
          collapsedProducts={collapsedProducts} 
          getProducts={getProducts}
          setCollapsedProducts={setCollapsedProducts}
        />)
      }
    </div>
  );
};

export default MobileProductCards;