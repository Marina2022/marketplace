import s from './ContentLeft.module.scss';
import ContentLeftHeader
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftHeader/ContentLeftHeader.jsx";
import ContentLeftRow
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftRow/ContentLeftRow.jsx";

const ContentLeft = ({products, checkedProducts, setCheckedProducts, collapsedProducts, setCollapsedProducts}) => {
    
  return (
    <div className={s.contentLeft}>
      <ContentLeftHeader />

      {
        products.map(product=><ContentLeftRow 
          product={product} 
          key={product.productVariantId} 
          checkedProducts={checkedProducts} 
          setCheckedProducts={setCheckedProducts}
          collapsedProducts={collapsedProducts}
          setCollapsedProducts={setCollapsedProducts}
        />)
      }
      
    
    </div>
  );
};

export default ContentLeft;