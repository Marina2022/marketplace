import s from './OrderSummary.module.scss';
import {getStringFromISO} from "@/utils/fromISO.js";
import {useNavigate} from "react-router-dom";

const OrderSummary = ({order}) => {
  const navigate = useNavigate()
  const handleOrderClick = () => {
    navigate(`/lk/orders/${order.orderId}`)
  }

  return (
    <div className={s.orderHeader} onClick={handleOrderClick}>
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