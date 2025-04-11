import LinkedProductRight
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRightRow/LinkedProductsRight/LinkedProductRight/LinkedProductRight.jsx";

const LinkedProductsRight = ({linkedProducts, handleMouseOut, handleMouseIn, hoveredProducts}) => {
  return (
    <ul >
      {
        linkedProducts.map((product, i) => <LinkedProductRight
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

export default LinkedProductsRight;