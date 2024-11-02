import {useSelector} from "react-redux";
import {getActiveOrders, getActiveOrdersLoadingStatus} from "@/store/ordersSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import OneActiveOrder from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/OneActiveOrder/OneActiveOrder.jsx";
import EmptyPageActiveOrders
  from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/EmptyPageActiveOrders/EmptyPageActiveOrders.jsx";

const ActiveOrders = () => {
  const activeOrders = useSelector(getActiveOrders)
  const activeOrdersLoadingStatus = useSelector(getActiveOrdersLoadingStatus)
  if (activeOrdersLoadingStatus === 'loading') return <Spinner/>

  if (activeOrders.length === 0) {
    return <EmptyPageActiveOrders/>
  }

  return (
    <ul>
      {
        activeOrders.map(order => <OneActiveOrder order={order} key={order.orderId} />)
      }
    </ul>
  );
};

export default ActiveOrders;