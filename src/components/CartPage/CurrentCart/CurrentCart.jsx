import s from './CurrentCart.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {useDebounce} from "@uidotdev/usehooks";
import {useNavigate} from "react-router-dom";
import useMobileScreen from "@/hooks/useMobileScreen.js";

import {
  checkCartStatus,
  getCart,
  getCartSearchTerm,
  getCartStatus,
  getEditingSearchTerm,
  loadCart,
  saveCart
} from "@/store/cartSlice.js";
import {getIsAuthenticated, getUserStatus} from "@/store/userSlice.js";

import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import ChooseDeleteBlock from "@/components/CartPage/CurrentCart/ChooseDeleteBlock/ChooseDeleteBlock.jsx";
import CartItem from "@/components/CartPage/CurrentCart/CartItem/CartItem.jsx";
import {getProductQuantityString} from "@/utils/cart.js";
import Checkout from "@/components/CartPage/CurrentCart/Checkout/Checkout.jsx";
import DownloadBlock from "@/components/CartPage/DownloadBlock/DownloadBlock.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg"
import {getFavsLoadingStatus} from "@/store/favSlice.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const CurrentCart = () => {
  const dispatch = useDispatch()
  const isAuthenticated = useSelector(getIsAuthenticated)
  const cartStatus = useSelector(getCartStatus)
  const favsLoadingStatus = useSelector(getFavsLoadingStatus)
  const cartSearchTerm = useSelector(getCartSearchTerm)
  const debouncedSearchTerm = useDebounce(cartSearchTerm, 500)
  const navigate = useNavigate()
  const cart = useSelector(getCart)
  const editingSearchTerm = useSelector(getEditingSearchTerm)
  const isMobile = useMobileScreen()
  const userLoadingStatus = useSelector(getUserStatus)

  useEffect(() => {
    if (userLoadingStatus !== 'success') return
    dispatch(loadCart())
  }, [debouncedSearchTerm])

  useEffect(() => {
    if (userLoadingStatus !== 'success') return

    if (isAuthenticated && cart?.cartItems?.length > 0) {
      dispatch(checkCartStatus({cartId: cart.cartId}))
    }
  }, [cart?.cartId, userLoadingStatus]);

  const saveCartHandler = () => {
    dispatch(saveCart({cartId: cart.cartId}))
  }


  // todo -- undefined иногда остается..
  let productsTotal

  if (cart?.cartItems) {
    productsTotal = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }
    
  
  if ( productsTotal === 'undefined' || cartStatus === 'loading' || userLoadingStatus === 'loading' || favsLoadingStatus === 'loading') return <Spinner />
  

  if (cart?.cartItems?.length === 0 && !debouncedSearchTerm && !editingSearchTerm && cartStatus !== 'loading' && userLoadingStatus !== 'loading') {

    return <div className={s.emptyPage}>
      <h2 className={s.emptyPageTitle}>Здесь пусто :(</h2>
      <p className={s.emptyPageText}>Ваша корзина пуста!<br/>
        Начните покупки и сложите товары в корзину.</p>
      <Button onClick={() => navigate('/category/smartfoni-781001bc-3a72-4e5b-8d2a-ee22e0ea7b0a')}
              className={s.emptyPageButton}>Начать&nbsp;покупки</Button>
    </div>
  }
  
  
  return (
    !(cart?.cartItems?.length === 0 && !debouncedSearchTerm && favsLoadingStatus !== 'loading' && userLoadingStatus !== 'loading') &&
    <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Ваша корзина</h1>
        <p>productsTotal = {productsTotal}</p>
        <p className={s.productsQuantity}>{getProductQuantityString(productsTotal)}</p>
      </div>

      <div className={s.mainWrapper}>
        <div className={s.cartWrapper}>
          {
            isAuthenticated && <div className={s.topBlock}>
              <CartSearch/>
              <button onClick={saveCartHandler} className={s.saveCartBtn}>
                <img src={saveCartIcon} alt="save icon"/>
                <span>Сохранить корзину</span>
              </button>
            </div>
          }

          <ChooseDeleteBlock/>
          <h2 className={s.subtitle}>Ваши товары</h2>
          {
            cart?.cartItems && <ul className={s.cartItemsList}>
              {
                cart?.cartItems.map((cartItem) => <CartItem cartItem={cartItem} key={cartItem.cartItemId}
                                                            cartId={cart.cartId}/>)
              }
            </ul>
          }
        </div>
        <div className={s.rightPartWrapper}>
          <Checkout cart={cart}/>
          {
            cart?.cartItems && !isMobile && <DownloadBlock links={cart.cartLinks}/>
          }
        </div>
      </div>
    </div>
  );
}

export default CurrentCart;