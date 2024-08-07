import s from './CurrentCart.module.scss';
import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import {useDispatch, useSelector} from "react-redux";
import {checkCartStatus, getCart, getCartStatus} from "@/store/cartSlice.js";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg"
import ChooseDeleteBlock from "@/components/CartPage/CurrentCart/ChooseDeleteBlock/ChooseDeleteBlock.jsx";
import {getIsAuthenticated} from "@/store/userSlice.js";
import CartItem from "@/components/CartPage/CurrentCart/CartItem/CartItem.jsx";
import {getProductQuantityString} from "@/utils/cart.js";
import Checkout from "@/components/CartPage/CurrentCart/Checkout/Checkout.jsx";
import DownloadBlock from "@/components/CartPage/DownloadBlock/DownloadBlock.jsx";
import {useEffect} from "react";

const CurrentCart = () => {

  const dispatch = useDispatch()

  const isAuthenticated = useSelector(getIsAuthenticated)
  const cart = useSelector(getCart)
  const cartStatus = useSelector(getCartStatus)
  
  useEffect(() => {        
    //todo - верни
    // dispatch(checkCartStatus({cartId: cart.cartId}))    
  }, [cart.cartId]);
  
  console.log('cart--', cart)
    
  // todo - если в корзине нет товаров, т.е. сняты галочки у них, выводим сообщение (надо выбрать товары)
  // todo - если нет вообще товаров, в т.ч. не чекнутых - то страница "Здесь пусто"
      
  let productsTotal
  if (cart?.cartItems) {
    productsTotal = cart.cartItems.reduce((sum, item) => sum + item.quantity, 0)
  }


  if (cartStatus === 'success' && cart?.cartItems?.length === 0) {
    return <div>Пустая страница</div> // todo - сделать компонент для страницы пустой корзины 
  }
  return (
    <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Ваша корзина</h1>        
        <p className={s.productsQuantity}>{getProductQuantityString(productsTotal)}</p>
      </div>

      <div className={s.mainWrapper}>
        <div className={s.cartWrapper}>
          {
            isAuthenticated && <div className={s.topBlock}>
              <CartSearch/>
              <button className={s.saveCartBtn}>
                <img src={saveCartIcon} alt="save icon"/>
                <span>Сохранить корзину</span>
              </button>
            </div>
          }

          <ChooseDeleteBlock cartId={cart.cartId} />
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
          <Checkout/>
          {
            cart?.cartItems && <DownloadBlock links={cart.cartLinks}/> 
          }                    
        </div>
      </div>
    </div>
  );
};

export default CurrentCart;