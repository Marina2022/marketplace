import s from './CartPage.module.scss'
import {useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {useEffect, useState} from "react";
import CurrentCart from "@/components/CartPage/CurrentCart/CurrentCart.jsx";
import SavedCarts from "@/components/CartPage/SavedCarts/SavedCarts.jsx";
import ViewedProducts from "@/components/common/ViewedProducts/ViewedProducts.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {getCartStatus, getSavedCartsStatus} from "@/store/cartSlice.js";

const CartPage = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const [currentTab, setCurrentTab] = useState('currentCart')
  
  const isMobile = useMobileScreen()
  const cartStatus = useSelector(getCartStatus)
  const savedCartStatus = useSelector(getSavedCartsStatus)
  
    
  useEffect(() => {
    if (!isAuthenticated) setCurrentTab('currentCart')
  }, [isAuthenticated]);
    
  
  return (
    <div className={s.cartPage}>
      <div className="containerCart">
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
          currentTab === 'savedCarts' && <SavedCarts setCurrentTab={setCurrentTab}/>
        }

      </div>
      
      <div className='container'>
        {
          !isMobile
          && (currentTab === "currentCart" && cartStatus !== 'loading' || currentTab === "savedCarts" && savedCartStatus !== 'loading')
          && <ViewedProducts fullSize={true}/>
        }
      </div>      
    </div>
  );
};

export default CartPage;