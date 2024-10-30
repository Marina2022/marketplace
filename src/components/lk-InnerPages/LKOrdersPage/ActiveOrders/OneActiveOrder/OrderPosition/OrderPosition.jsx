import s from './OrderPosition.module.scss';

const OrderPosition = ({orderPosition}) => {

  console.log('orderPosition', orderPosition)

  const deliveryDateArr = orderPosition.deliveryData.deliveryDateDisplay.split(": ")

  return (
    <li className={s.orderGroupWrapper}>

      <div className={s.seller}><span className={s.sellerLabel}>Продавец:</span> <span
        className={s.sellerValue}>{orderPosition.sellerName}</span></div>

      <ul className={s.productList}>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>
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