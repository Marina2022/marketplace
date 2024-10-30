import s from './OrderPosition.module.scss';

const OrderPosition = ({orderPosition}) => {
  return (
    <li className={s.orderGroupWrapper}>
      
      <div className={s.seller}><span className={s.sellerLabel}>Продавец:</span> <span className={s.sellerValue}>{orderPosition.sellerName}</span></div>
      
      <ul className={s.productList}>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>
        <li>productList</li>       
      </ul>
      
      <div className={s.deliveryInfo}>Доставка</div>
      <div className={s.deliveryStatus}>Статус</div>
      
    </li>
  );
};

export default OrderPosition;