import s from './OneActiveOrder.module.scss';
import OrderPosition
  from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/OneActiveOrder/OrderPosition/OrderPosition.jsx";
import OrderSummary
  from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/OneActiveOrder/OrderSummary/OrderSummary.jsx";

const OneActiveOrder = ({order}) => {

  
  return (
    <li className={s.ordersListItem}>
      <OrderSummary order={order}/>
      <ul className={s.orderPositions}>
        {
          order.orderPositions.map((orderPosition, i) => <OrderPosition key={i} orderPosition={orderPosition}/>)
          //testOrderPositions.map((orderPosition, i) => <OrderPosition key={i} orderPosition={orderPosition}/>)
        }
      </ul>
      <OrderSummary order={order}/>
    </li>
  );
};

export default OneActiveOrder;