import s from './OrderSummary.module.scss';
import {getStringFromISO} from "@/utils/fromISO.js";

const OrderSummary = ({order}) => {
  return (
    <div className={s.orderHeader}>
      <div className={s.titleInfo}>
        <p className={s.orderNumber}>Заказ № {order.orderNumber}</p>
        <p className={s.orderDate}>от {getStringFromISO(order.orderingDate)}</p>
      </div>

      <div className={s.sumBlock}>
        <span className={s.sumLabel}>cумма</span>
        <span className={s.sumValue}> {order.orderPrice.toLocaleString('ru')} ₽</span>
      </div>
    </div>
  );
};

export default OrderSummary;