import s from './OrderLineProductCard.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import {Link, useNavigate} from "react-router-dom";

const OrderLineProductCard = ({product, status}) => {
  
  const navigate = useNavigate()
  const cardClickHandle = ()=>{
    navigate(`/product/${product.productHandle}?sku=${product.sku}`)
  }

  const handleLinkClick = (e) => {
    e.stopPropagation()
  }
  
  return (
    <li className={s.orderLineProductCardWrapper} onClick={cardClickHandle}>
      {/*<img className={s.productImg} src={`${BASE_URL}${product.productImageUrl}`} alt={product.productName}/>*/}
      <img className={s.productImg} src={product.productImageUrl} alt={product.productName}/>
      <div className={s.rightPart}>
        <div className={s.productName}>{product.productName}</div>
        <div><span className={s.sellerLabel}>Продавец: </span><span className={s.sellerName}>{product.sellerName}</span>
        </div>
      </div>
      <div className={s.priceBlock}>
        <div className={s.price}>{product.productLineFullPrice.toLocaleString('ru')}&nbsp;₽</div>
        {
          status === 'completed' &&
          <Link to={`/product/${product.productHandle}/new-review`} onClick={handleLinkClick} className={s.reviewLink}>Написать отзыв</Link>
        }
      </div>
    </li>
  );
};

export default OrderLineProductCard;