import s from './CurrentCart.module.scss';
import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import {useSelector} from "react-redux";
import {getCart, getCartStatus} from "@/store/cartSlice.js";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg"
import ChooseDeleteBlock from "@/components/CartPage/CurrentCart/ChooseDeleteBlock/ChooseDeleteBlock.jsx";
import {getIsAuthenticated} from "@/store/userSlice.js";
import CartItem from "@/components/CartPage/CurrentCart/CartItem/CartItem.jsx";
import {getProductQuantityString} from "@/utils/cart.js";

const CurrentCart = () => {

  const isAuthenticated = useSelector(getIsAuthenticated)
  const cart = useSelector(getCart)
  const cartStatus = useSelector(getCartStatus)

  console.log('cartStatus = ', cartStatus )
  
  console.log('cart--', cart)
  
  if (cartStatus === 'loading') {
    return <div>Loading...</div>
  }
  
  if (cartStatus === 'success' && cart.cartItems.length === 0) {
    return <div>Пустая страница</div> // todo - сделать компонент для страницы пустой корзины 
  }

  return (
    <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Ваша корзина</h1>
        {/*функцию для падежа товаров потом добавить*/}
        <p className={s.productsQuantity}>{getProductQuantityString(cart.cartItems.length)}</p>
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

          <ChooseDeleteBlock/>
          <h2 className={s.subtitle}>Ваши товары</h2>

          <ul className={s.cartItemsList}>
            {
              cart.cartItems.map((cartItem) => <CartItem cartItem={cartItem} key={cartItem.cartItemId}/>)
            }
          </ul>


        </div>
        <div className={s.checkoutWrapper}>
          checkoutWrapper
        </div>
      </div>


    </div>
  );
};

export default CurrentCart;