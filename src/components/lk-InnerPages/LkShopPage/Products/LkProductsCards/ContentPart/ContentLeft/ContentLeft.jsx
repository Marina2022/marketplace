import s from './ContentLeft.module.scss';
import ContentLeftHeader
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftHeader/ContentLeftHeader.jsx";
import ContentLeftRow
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftRow/ContentLeftRow.jsx";

const ContentLeft = ({
                       products, 
                       checkedProducts, 
                       setCheckedProducts, 
                       collapsedProducts, 
                       setCollapsedProducts, 
                       handleMouseIn, 
                       handleMouseOut,
                       hoveredProducts,
                       currentProfile
}) => {
    
  return (
    <div className={s.contentLeft}>
      <ContentLeftHeader />
      
      {
        currentProfile?.type === 'company' && currentProfile?.isHasShop &&  products.map(product=><ContentLeftRow 
          product={product} 
          key={product.productVariantId} 
          checkedProducts={checkedProducts} 
          setCheckedProducts={setCheckedProducts}
          collapsedProducts={collapsedProducts}
          setCollapsedProducts={setCollapsedProducts}
          handleMouseIn={handleMouseIn}
          handleMouseOut={handleMouseOut}
          hoveredProducts={hoveredProducts}
        />)
      }          
    </div>
  );
};

export default ContentLeft;