import s from './OrderLineProductCard.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";

const OrderLineProductCard = ({product, status}) => {

  return (
    <li className={s.orderLineProductCardWrapper}>
      <img className={s.productImg} src= {`${BASE_URL}${product.productImageUrl}`} alt={product.productName}/>
      <div>
        <div className={s.productName}>{product.productName}</div>
        <div className={s.sellerName}>{product.sellerName}</div>
      </div>
      
      <div className={s.priceBlock}>
        <div className={s.price}>{product.productLineFullPrice.toLocaleString('ru')}&nbsp;₽</div>
        
        {/*todo верстка кнопки Отзыв +  ссылка на страницу написания Отзыва */}
        {
          status === 'completed' && <button className={s.reviewBtn}>Написать отзыв</button>
        }

      </div>
    </li>
  );
};

export default OrderLineProductCard;