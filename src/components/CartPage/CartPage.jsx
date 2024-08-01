import s from './CartPage.module.scss'
import {useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {useState} from "react";
import CurrentCart from "@/components/CartPage/CurrentCart/CurrentCart.jsx";
import SavedCarts from "@/components/CartPage/SavedCarts/SavedCarts.jsx";

const CartPage = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const [currentTab, setCurrentTab] = useState('currentCart')


  return (
    <div className={s.cartPage}>
      <div className="container">
        {
          isAuthenticated && <div className={s.tabButtons}>
            <button
              onClick={() => setCurrentTab('currentCart')}
              className={`${s.tabBtn} ${currentTab === 'currentCart' ? s.activeTabBtn : ''}`}>Текущая корзина
            </button>
            <button
              onClick={() => setCurrentTab('savedCarts')}
              className={`${s.tabBtn} ${currentTab === 'savedCarts' ? s.activeTabBtn : ''}`}>Сохраненные
              корзины
            </button>
          </div>
        }

        {
          currentTab === 'currentCart' && <CurrentCart/>
        }
        {
          currentTab === 'savedCarts' && <SavedCarts/>
        }


      </div>
    </div>
  );
};

export default CartPage;