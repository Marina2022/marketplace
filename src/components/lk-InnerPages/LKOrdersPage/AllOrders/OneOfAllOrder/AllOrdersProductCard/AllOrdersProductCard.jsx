import s from './AllOrdersProductCard.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import {useNavigate} from "react-router-dom";

const AllOrdersProductCard = ({product}) => {
  const navigate = useNavigate()
  const handleCardClick = () => {
    navigate(`/product/${product.productHandle}?sku=${product.sku}`)
  }
  
  return (
    <li onClick={handleCardClick} className={s.productWrapper}>
      {/*<img className={s.img} src={`${BASE_URL}${product.productImageUrl}`} alt={product.productName}/>*/}
      <img className={s.img} src={product.productImageUrl} alt={product.productName}/>
      
      <div className={s.cardRightPart}>
        <div className={s.mainInfo}>
          <div className={s.productName}>
            {product.productName}
          </div>
          <div className={s.seller}>
            <span className={s.sellerLabel}>Продавец: </span>
            <span className={s.sellerValue}>{product.seller}</span>
          </div>
        </div>
        
        <div className={s.quantity}>
          {product.orderLineQuantity}шт
        </div>
        
        <div className={s.price}>
          <span className={s.priceLabel}>сумма</span>
          <span>{product.orderLinePrice.toLocaleString('ru')}&nbsp;₽</span>
        </div>        
      </div>
    </li>
  );
};

export default AllOrdersProductCard;