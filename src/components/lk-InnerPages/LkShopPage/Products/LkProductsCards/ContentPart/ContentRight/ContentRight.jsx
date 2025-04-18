import s from './ContentRight.module.scss';
import ContentRightRow
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRightRow/ContentRightRow.jsx";

const ContentRight = ({
                        products,
                        collapsedProducts,                        
                        handleMouseIn,
                        handleMouseOut,
                        hoveredProducts,
                        getProducts,
                        currentProfile
                      }) => {
  return (
    <div className={s.contentRight}>
      <div className={s.contentRightHeader}>
        Статус
      </div>

      {
        currentProfile?.type === 'company' && currentProfile?.isHasShop && products.map(product => <ContentRightRow
          key={product.productVariantId}
          product={product}
          handleMouseIn={handleMouseIn}
          handleMouseOut={handleMouseOut}
          hoveredProducts={hoveredProducts}
          collapsedProducts={collapsedProducts}
          getProducts={getProducts}
        />)
      }

    </div>
  );
};

export default ContentRight;