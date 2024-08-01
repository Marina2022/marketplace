import s from './CurrentCart.module.scss';
import CartSearch from "@/components/CartPage/CurrentCart/CartSearch/CartSearch.jsx";
import {useSelector} from "react-redux";
import {getCart} from "@/store/cartSlice.js";
import saveCartIcon from "@/assets/img/cart/saveCartIcon.svg"

const CurrentCart = () => {
  
  const cart = useSelector(getCart)
  
  
  return (
    <div>
      <div className={s.headerWrapper}>
        <h1 className={s.mainTitle}>Ваша корзина</h1>
        {/*функцию для падежа товаров потом добавить*/}
        <p className={s.productsQuantity}>2 товара</p>
      </div>
      
      <div className={s.mainWrapper}>
        <div className={s.cartWrapper}>
          <div className={s.topBlock}>
            <CartSearch />
            <button className={s.saveCartBtn}><img src={saveCartIcon} alt="save icon"/> <span>Сохранить  корзину</span></button>
          </div>          
          
        </div>
        <div className={s.checkoutWrapper}>
          checkoutWrapper
        </div>
      </div>
      
      

    </div>
  );
};

export default CurrentCart;