import {useState} from "react";
import ActiveOrders from "@/components/lk-InnerPages/LKOrdersPage/ActiveOrders/ActiveOrders.jsx";
import s from './LkOrdersPage.module.scss'
import AllOrders from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/AllOrders.jsx";


const LkOrdersPage = () => {
  const [topTabs, setTopTab] = useState(1)
  const [ordersTab, setOrdersTab] = useState(2)

  return (
    <div className={s.lkOrdersWrapper}>
      <div className={s.topTabs}>
        <div onClick={() => setTopTab(1)} className={topTabs === 1 ? s.activeTopTab : s.topTab}>Покупки</div>
        <div onClick={() => setTopTab(2)} className={topTabs === 2 ? s.activeTopTab : s.topTab}>Возвраты</div>
      </div>

      {
        topTabs === 1 && <div className={s.ordersTabs}>
          <div onClick={() => setOrdersTab(1)} className={ordersTab === 1 ? s.activeOrderTab : s.orderTab}>Активные
            заказы
          </div>
          <div onClick={() => setOrdersTab(2)} className={ordersTab === 2 ? s.activeOrderTab : s.orderTab}>Все заказы
          </div>
        </div>
      }

      {
        topTabs === 1 && ordersTab === 1 && <ActiveOrders/>
      }

      {
        topTabs === 1 && ordersTab === 2 && <AllOrders/>
      }
      
    </div>
  )
};

export default LkOrdersPage;

