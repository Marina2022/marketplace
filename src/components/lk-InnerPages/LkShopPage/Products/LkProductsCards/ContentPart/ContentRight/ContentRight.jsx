import s from './ContentRight.module.scss';
import ContentRightRow
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRightRow/ContentRightRow.jsx";

const ContentRight = ({
                        products,
                        collapsedProducts,                        
                        handleMouseIn,
                        handleMouseOut,
                        hoveredProducts
                      }) => {
  return (
    <div className={s.contentRight}>
      <div className={s.contentRightHeader}>
        Статус
      </div>

      {
        products.map(product => <ContentRightRow
          key={product.productVariantId}
          product={product}
          handleMouseIn={handleMouseIn}
          handleMouseOut={handleMouseOut}
          hoveredProducts={hoveredProducts}
          collapsedProducts={collapsedProducts}
        />)
      }

    </div>
  );
};

export default ContentRight;