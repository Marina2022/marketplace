import s from './ProductCardInSavedCart.module.scss';
import {Bars} from "react-loader-spinner";
import {BASE_URL} from "@/consts/baseURL.js";

const ProductCardInSavedCart = ({product}) => {
  console.log('product = ', product)
  return (
    <div className={s.product}>
      <img className={s.productImage} src={`${BASE_URL}${product.productImageUrl}`} alt="product.productName"/>
      <div className={s.content}>
        <div className={s.nameBlock}>
          <div className={s.name}>{product.productName}</div>
          <div><span className={s.sellerLabel}>Продавец: </span> <span
            className={s.sellerValue}>  {product.seller}</span></div>
        </div>
        <div className={s.priceBlock}>
          <div className={s.quantity}> {product.quantity} шт</div>
          <div className={s.price}>{product.price.toLocaleString()} ₽</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCardInSavedCart;