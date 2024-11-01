import s from './OrderPosition.module.scss';
import OrderProductCard
  from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/OneActiveOrder/OrderPosition/OrderProductCard/OrderProductCard.jsx";

const OrderPosition = ({orderPosition}) => {

  const deliveryDateArr = orderPosition.deliveryData.deliveryDateDisplay.split(": ")

  return (
    <li className={s.orderGroupWrapper}>
      <div className={s.seller}><span className={s.sellerLabel}>Продавец:</span> <span
        className={s.sellerValue}>{orderPosition.sellerName}</span></div>

      <ul className={s.productList}>
        {
          orderPosition.orderPositionDetails.map(product=><OrderProductCard product={product} key={product.productVariantId} />)
        }       
        
      </ul>

      <div className={s.deliveryInfo}>
        <p className={s.deliveryInfoPar}> {orderPosition.deliveryData.deliveryMethod} </p>
        <p className={s.deliveryInfoPar}><span
          className={s.deliveryLabel}>Адрес доставки:</span> <span>{orderPosition.deliveryData.deliveryAddress}</span>
        </p>
        <p><span className={s.deliveryLabel}>{deliveryDateArr[0]}: </span>
          <span>{deliveryDateArr[1]} </span></p>

      </div>
      <div className={s.deliveryStatus}>
        <span>Статус: </span>
        <span className={s.deliveryStatusValue}>{orderPosition.deliveryData.deliveryStatusDisplay}</span>
        
      </div>

    </li>
  );
};

export default OrderPosition;