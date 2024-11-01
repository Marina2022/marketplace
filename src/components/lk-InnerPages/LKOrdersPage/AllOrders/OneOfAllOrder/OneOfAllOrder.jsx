import s from './OneOfAllOrder.module.scss';
import {useState} from "react";
import OrderOfAllMain
  from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/OneOfAllOrder/OrderOfAllMain/OrderOfAllMain.jsx";

const OneOfAllOrder = ({order}) => {

  const [productListIsOpen, setProductListIsOpen] = useState(false)

  return (
    <li className={s.orderWrapper}>
      <OrderOfAllMain order={order} productListIsOpen={productListIsOpen} setProductListIsOpen={setProductListIsOpen}/>

      {
        productListIsOpen && <ul className={s.productList}>product list</ul>
      }
    </li>
  );
};

export default OneOfAllOrder;