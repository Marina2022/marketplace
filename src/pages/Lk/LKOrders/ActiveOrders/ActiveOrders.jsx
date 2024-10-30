import s from './ActiveOrders.module.scss';
import {useSelector} from "react-redux";
import {getActiveOrders, getActiveOrdersLoadingStatus} from "@/store/ordersSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import OneActiveOrder from "@/pages/Lk/LKOrders/ActiveOrders/OneActiveOrder/OneActiveOrder.jsx";

const ActiveOrders = () => {
  const activeOrders = useSelector(getActiveOrders)

  // для теста двух заказов в массиве
  // let duplicatedOrders
  // if (activeOrders) duplicatedOrders = activeOrders.concat(activeOrders);
    
  const activeOrdersLoadingStatus = useSelector(getActiveOrdersLoadingStatus)

  if (activeOrdersLoadingStatus === 'loading') return <Spinner/>

  return (
    <ul>
      {
        activeOrders.map(order => <OneActiveOrder order={order} key={order.orderId} />)
      }
    </ul>
  );
};

export default ActiveOrders;