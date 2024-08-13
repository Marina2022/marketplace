import s from './CurrentCart.module.scss';
import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import {useDispatch, useSelector} from "react-redux";
import {
  checkCartStatus,
  getCart,
  getCartSearchTerm,
  getCartStatus,
  getEditingSearchTerm, getSavedCarts,
  loadCart, saveCart
} from "@/store/cartSlice.js";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg"
import ChooseDeleteBlock from "@/components/CartPage/CurrentCart/ChooseDeleteBlock/ChooseDeleteBlock.jsx";
import {getIsAuthenticated} from "@/store/userSlice.js";
import CartItem from "@/components/CartPage/CurrentCart/CartItem/CartItem.jsx";
import {getProductQuantityString} from "@/utils/cart.js";
import Checkout from "@/components/CartPage/CurrentCart/Checkout/Checkout.jsx";
import DownloadBlock from "@/components/CartPage/DownloadBlock/DownloadBlock.jsx";
import {useEffect} from "react";
import {useDebounce} from "@uidotdev/usehooks";
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const CurrentCart = () => {

  const dispatch = useDispatch()

  const isAuthenticated = useSelector(getIsAuthenticated)
  const cartStatus = useSelector(getCartStatus)
  const cartSearchTerm = useSelector(getCartSearchTerm)

  const debouncedSearchTerm = useDebounce(cartSearchTerm, 500)

  const navigate = useNavigate()
  const cart = useSelector(getCart)
  const editingSearchTerm = useSelector(getEditingSearchTerm)
  
  console.log('cart--', cart)
  

  useEffect(() => {
    dispatch(loadCart())
  }, [debouncedSearchTerm])

  useEffect(() => {
    
    if (isAuthenticated) {
      dispatch(checkCartStatus({cartId: cart.cartId})) 
    }    
  }, [cart?.cartId]);
  
    
  const saveCartHandler = () => {
    dispatch(saveCart({cartId: cart.cartId}))
  }

  let productsTotal
  if (cart?.cartItems) {
    productsTotal = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }
  
  if (cart?.cartItems?.length ===0 && !debouncedSearchTerm  && !editingSearchTerm && cartStatus !== 'loading'  ) {
    return <div className={s.emptyPage}>
      <h2 className={s.emptyPageTitle}>Здесь пусто :(</h2>
      <p className={s.emptyPageText}>Ваша корзина пуста!<br/>
        Начните покупки и сложите товары в корзину.</p>
      <Button onClick={() => navigate('/category/smartfoni-781001bc-3a72-4e5b-8d2a-ee22e0ea7b0a')}
              className={s.emptyPageButton}>Начать&nbsp;покупки</Button>
    </div>
  }

  return (
    !(cart?.cartItems.length  <= 0 && !debouncedSearchTerm) && <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Ваша корзина</h1>
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
            cart?.cartItems && <DownloadBlock links={cart.cartLinks}/>
          }
        </div>
      </div>
    </div>
  );
}


export default CurrentCart;