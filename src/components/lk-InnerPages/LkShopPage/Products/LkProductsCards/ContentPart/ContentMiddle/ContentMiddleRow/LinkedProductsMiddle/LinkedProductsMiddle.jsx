import LinkedProductMiddle
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddleRow/LinkedProductsMiddle/LinkedProductMiddle/LinkedProductMiddle.jsx";

const LinkedProductsMiddle = ({linkedProducts, handleMouseOut, handleMouseIn, hoveredProducts}) => {
  return (
    <ul>
      {
        linkedProducts.map((product, i) => <LinkedProductMiddle
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

export default LinkedProductsMiddle;