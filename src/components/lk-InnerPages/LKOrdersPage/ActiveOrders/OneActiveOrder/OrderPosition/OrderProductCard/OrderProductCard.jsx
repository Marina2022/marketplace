import s from './OrderProductCard.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import {useNavigate} from "react-router-dom";

const OrderProductCard = ({product}) => {
  
  const navigate = useNavigate()
  const handleCardClick = ()=>{
    navigate(`/product/${product.productHandle}?sku=${product.sku}`)
  }
  
  return (
    <li onClick={handleCardClick} className={s.orderProductCard}>
      {/*<img className={s.img} src={`${BASE_URL}${product.productImageUrl}`} alt={product.productName}/>*/}
      <img className={s.img} src={product.productImageUrl} alt={product.productName}/>
      <div>
        <p className={s.productName}>{product.productName}</p>
        <p className={s.productQuantity}>{product.productCount} шт</p>
      </div>
    </li>
  );
};

export default OrderProductCard;