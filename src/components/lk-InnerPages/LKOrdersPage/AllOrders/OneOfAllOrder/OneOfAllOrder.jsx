import s from './OneOfAllOrder.module.scss';
import {useState} from "react";
import OrderOfAllMain
  from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/OneOfAllOrder/OrderOfAllMain/OrderOfAllMain.jsx";
import AllOrdersProductCard
  from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/OneOfAllOrder/AllOrdersProductCard/AllOrdersProductCard.jsx";

const OneOfAllOrder = ({order}) => {

  const [productListIsOpen, setProductListIsOpen] = useState(false)

  // const testProductArray = [...order.orderedProducts, ...order.orderedProducts, ...order.orderedProducts]

  return (
    <li className={s.orderWrapper}>
      <OrderOfAllMain order={order} productListIsOpen={productListIsOpen} setProductListIsOpen={setProductListIsOpen}/>
      {
        productListIsOpen && <ul className={s.productList}>
          {
            order.orderedProducts.map(product => <AllOrdersProductCard key={product.productVariantId} product={product}/>)
          }
        </ul>
      }
    </li>
  );
};

export default OneOfAllOrder;