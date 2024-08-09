import s from './CartPage.module.scss'
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {useEffect, useState} from "react";
import CurrentCart from "@/components/CartPage/CurrentCart/CurrentCart.jsx";
import SavedCarts from "@/components/CartPage/SavedCarts/SavedCarts.jsx";
import {loadSavedCarts} from "@/store/cartSlice.js";

const CartPage = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const [currentTab, setCurrentTab] = useState('currentCart')
  
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(loadSavedCarts())
  }, []);

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