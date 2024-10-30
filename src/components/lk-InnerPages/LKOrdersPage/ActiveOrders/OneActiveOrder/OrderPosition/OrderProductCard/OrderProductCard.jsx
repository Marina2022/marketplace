import s from './OrderProductCard.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";

const OrderProductCard = ({product}) => {
  return (
    <li className={s.orderProductCard}>
      <img className={s.img} src={`${BASE_URL}${product.productImageUrl}`} alt=""/>
      
      <div>
        <p className={s.productName}>{product.productName}</p>
        <p className={s.productQuantity}>{product.productCount} шт</p>
      </div>
    </li>
  );
};

export default OrderProductCard;