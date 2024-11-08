import s from './OrderLine.module.scss';
import {getProductQuantityString} from "@/utils/cart.js";
import OrderLineProductCard
  from "@/components/OrderPage/MainPartOrderDetails/OrderLine/OrderLineProductCard/OrderLineProductCard.jsx";
import deliveryMethodIcon from '@/assets/img/orderPage/deliveryMethod.svg'

const OrderLine = ({orderLine}) => {

  const dateArr = orderLine.deliveryDateLineDisplay.split(": ")

  return (
    <div>
      <div className={s.orderLineHeader}>
        <div className={s.topWrapper}>
          <div className={s.quantity}>{getProductQuantityString(orderLine.partialCount)}</div>
          <div className={s.rightPart}>
            <div className={s.deliveryStatus}>{orderLine.deliveryStatusDisplay}</div>
            {
              orderLine.deliveryDateLineDisplay !== "" && <div className={s.date}>
                <span className={s.dateLabel}>{dateArr[0]}:</span>
                <span className={s.dateValue}>{dateArr[1]}</span>
              </div>
            }
          </div>
        </div>
        <div className={s.bottomWrapper}>
          <img className={s.icon} src={deliveryMethodIcon} alt="delivery icon"/>
          <div className={s.rowWrapper}>
            <div className={s.row}>
              <div className={s.label}>Способ доставки:</div>
              <div className={s.value}>{orderLine.deliveryData.deliveryMethod}</div>
            </div>
            <div className={s.row}>
              <div className={s.label}>Адрес доставки:</div>
              <div className={s.value}>{orderLine.deliveryData.deliveryAddress}</div>
            </div>
          </div>
        </div>
      </div>
      <ul className={s.groupedProducts}>
        {
          orderLine.groupedProducts.map((product, i) => <OrderLineProductCard
            key={i}
            product={product}
            status={orderLine.deliveryStatus}/>)
        }
      </ul>
    </div>
  );
};

export default OrderLine;