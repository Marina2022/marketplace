import s from './ProductCardInSavedCart.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import {Link} from "react-router-dom";

const ProductCardInSavedCart = ({product}) => {
  console.log('product = ', product)
  return (
    <div className={s.product}>
      <img className={s.productImage} src={`${BASE_URL}${product.productImageUrl}`} alt="product.productName"/>
      <div className={s.content}>
        <div className={s.nameBlock}>
          <Link to={`/product/${product.productHandle}?sku=${product.sku}`} className={s.name}>{product.productName}</Link>
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