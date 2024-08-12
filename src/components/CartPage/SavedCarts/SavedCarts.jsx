import s from './SavedCarts.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {getSavedCarts, getSavedCartsStatus, loadSavedCarts, loadSavedCartsCheckout} from "@/store/cartSlice.js";
import Button from "@/components/ui/Button/Button.jsx";
import {getProductQuantityString} from "@/utils/cart.js";
import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg";
import ChooseDeleteBlock from "@/components/CartPage/CurrentCart/ChooseDeleteBlock/ChooseDeleteBlock.jsx";
import CartItem from "@/components/CartPage/CurrentCart/CartItem/CartItem.jsx";
import Checkout from "@/components/CartPage/CurrentCart/Checkout/Checkout.jsx";
import DownloadBlock from "@/components/CartPage/DownloadBlock/DownloadBlock.jsx";
import {useNavigate} from "react-router-dom";
import SavedCartsCheckout from "@/components/CartPage/SavedCarts/SavedCartsCheckout/SavedCartsCheckout.jsx";
import ChooseDeleteSavedCarts from "@/components/CartPage/SavedCarts/ChooseDeleteSavedCarts/ChooseDeleteSavedCarts.jsx";
import SavedCartItem from "@/components/CartPage/SavedCarts/SavedCartItem/SavedCartItem.jsx";

const SavedCarts = () => {

  const dispatch = useDispatch()
  const loadSavedCartsStatus = useSelector(getSavedCartsStatus)
  const navigate = useNavigate()

  const [checkedItems, setCheckedItems] = useState([])
  
  
  useEffect(() => {
    dispatch(loadSavedCarts())    
  }, []);

  useEffect(() => {
    
    const cartIds = checkedItems.map(item=>({cartId: item}))       
    dispatch(loadSavedCartsCheckout({cartIds}))
  }, [checkedItems]);
    
  const savedCarts = useSelector(getSavedCarts)
  console.log('savedCarts', savedCarts)
    
  if (!savedCarts) return <></>

  if (loadSavedCartsStatus === 'loading') return 'Loading...'

  if (savedCarts.length === 0 && loadSavedCartsStatus !== 'loading') {
    return <div className={s.emptyPage}>
      <h2 className={s.emptyPageTitle}>Здесь пусто :(</h2>
      <p className={s.emptyPageText}>Ваша корзина пуста!<br/>
        xsksksksksks.</p>
      <Button onClick={() => navigate('/category/smartfoni-781001bc-3a72-4e5b-8d2a-ee22e0ea7b0a')}
              className={s.emptyPageButton}>Начать&nbsp;покупки</Button>
    </div>
  }

  return (
    savedCarts && savedCarts.length > 0 && <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Сохраненные корзины</h1>
      </div>

      <div className={s.mainWrapper}>
        <div className={s.cartWrapper}>

          <ChooseDeleteSavedCarts checkedItems={checkedItems} setCheckedItems={setCheckedItems} savedCarts={savedCarts} />  
          <h2 className={s.subtitle}>Ваши товары</h2>
          {
            savedCarts.map(savedCart=><SavedCartItem key={savedCart.cartId} savedCart={savedCart} checkedItems={checkedItems} setCheckedItems={setCheckedItems}  /> )
          }


        </div>
        <div className={s.rightPartWrapper}>
          
          <SavedCartsCheckout/>
                    
        </div>
      </div>
    </div>
  );
}

export default SavedCarts;