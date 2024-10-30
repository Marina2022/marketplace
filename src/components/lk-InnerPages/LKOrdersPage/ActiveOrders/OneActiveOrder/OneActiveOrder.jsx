import s from './OneActiveOrder.module.scss';
import {getStringFromISO} from "@/utils/fromISO.js";
import OrderPosition from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/OneActiveOrder/OrderPosition/OrderPosition.jsx";

const OneActiveOrder = ({order}) => {
  console.log('order', order)
  return (
    <li className={s.ordersListItem}>

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

      <ul className={s.orderPositions}>

        {
          order.orderPositions.map((orderPosition, i) => <OrderPosition key={i} orderPosition={orderPosition}/>)
        }

      </ul>

    </li>
  );
};

export default OneActiveOrder;