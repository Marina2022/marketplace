import s from './LinkedProductsLeft.module.scss';
import LinkedProductLeft
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeftRow/LinkedProductsLeft/LinkedProductLeft/LinkedProductLeft.jsx";

const LinkedProductsLeft = ({linkedProducts, handleMouseOut, handleMouseIn, hoveredProducts}) => {
  return (
    <ul>
      {
        linkedProducts.map((product, i) => <LinkedProductLeft
          index={i}
          product={product}
          linkedProducts={linkedProducts}
          key={product.productVariantId}
          handleMouseOut={handleMouseOut}
          handleMouseIn={handleMouseIn}
          hoveredProducts={hoveredProducts}
        />)
      }
    </ul>
  );
};

export default LinkedProductsLeft;