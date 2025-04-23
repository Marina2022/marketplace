import s from './ProductCardForMessage.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import ProductCardRating from "@/components/ProductPage/CreateMessage/ProductCardRating/ProductCardRating.jsx";
import {Link} from "react-router-dom";

const ProductCardForMessage = ({product, sku}) => {
  return (
    <Link to={`/product/${product.productHandle}?sku=${sku}`} className={s.wrapper}>
      <img
        className={s.image}
        // src={BASE_URL + product.productImages[0].imageUrl}
        src={product.productImages[0].imageUrl}
        // alt={BASE_URL + product.productImages[0].imgName}
        alt={product.productImages[0].imgName}
      />
      <div className={s.content}>
        <div className={s.productName}>
          {product.productName}
        </div>
        <ProductCardRating rating={product.reviewsRating} reviewsCount={product.reviewsCount}/>
      </div>
    </Link>
  );
};

export default ProductCardForMessage;