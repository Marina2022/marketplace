import MobileLinkedProduct
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/MobileProductCards/MobileProductCard/MobileLinkedProducts/MobileLinkedProduct/MobileLinkedProduct.jsx";

const MobileLinkedProducts = ({linkedProducts, getProducts}) => {
  return (
    <div>
      {
        linkedProducts.map(product=><MobileLinkedProduct product={product} key={product.productVariantId} getProducts={getProducts} />)
      }
    </div>
  )
}

export default MobileLinkedProducts;