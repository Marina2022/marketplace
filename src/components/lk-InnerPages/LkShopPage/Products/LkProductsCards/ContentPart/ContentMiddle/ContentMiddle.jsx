import s from './ContentMiddle.module.scss';
import ContentMiddleHeader
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddleHeader/ContentMiddleHeader.jsx";
import ContentMiddleRow
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddleRow/ContentMiddleRow.jsx";

const ContentMiddle = ({products, handleMouseIn, handleMouseOut, hoveredProducts, collapsedProducts, currentProfile}) => {
  return (

    <div className={`${s.contentMiddleWrapper} `}>
      <div className={s.contentMiddle}>
        <ContentMiddleHeader/>
        {
          currentProfile?.type === 'company' && currentProfile?.isHasShop && products.map(product => <ContentMiddleRow
            key={product.productVariantId}
            product={product}
            handleMouseIn={handleMouseIn}
            handleMouseOut={handleMouseOut}
            hoveredProducts={hoveredProducts}
            collapsedProducts={collapsedProducts}
          />)
        }
      </div>
    </div>
  )
}

export default ContentMiddle