import s from './ProductCardForMessage.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import ProductCardRating from "@/components/ProductPage/CreateMessage/ProductCardRating/ProductCardRating.jsx";

const ProductCardForMessage = ({product}) => {
  return (
    <div className={s.wrapper}>
      <img className={s.image} src={BASE_URL + product.productImages[0].imageUrl}
           alt={BASE_URL + product.productImages[0].imgName}/>
      <div className={s.content}>
        <div className={s.productName}>
          {product.productName}
        </div>
        <ProductCardRating rating={product.reviewsRating} reviewsCount={product.reviewsCount}/>
      </div>


    </div>
  );
};

export default ProductCardForMessage;