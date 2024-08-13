import s from './Checkout.module.scss';
import {useSelector} from "react-redux";
import {getCheckout} from "@/store/cartSlice.js";
import Button from "@/components/ui/Button/Button.jsx";

const Checkout = ({cart}) => {

  const checkout = useSelector(getCheckout)
  

  let someItemsAreChosen

  if (cart?.cartItems) {
    someItemsAreChosen = cart.cartItems
      .filter(item => item.inventoryLevel !== 0)
      .some(item => item.checked === true);
  }


  return (
    <div className={s.checkout}>

      {
        someItemsAreChosen
          ? <div className={s.topPart}>
            <h3 className={s.title}>Ваш заказ:</h3>
            <div className={s.productsRow}>
              <p className={s.products}>Товары ({checkout?.productCountInCart})</p>
              <p className={s.totalBigPrice}>{checkout?.totalRegularPrice.toLocaleString()}&nbsp;₽</p>
            </div>
            <div className={s.savings}>
              <p>Вы экономите:</p>
              <p className={s.savingsNumber}>{checkout?.savings.toLocaleString()}&nbsp;₽</p>
            </div>
          </div>
          : <div className={s.noProductsMessage}>
            Выберите товары, чтобы перейти к оформлению заказа
          </div>
      }


      <div className={s.bottomPart}>
        {
          someItemsAreChosen && <div className={s.total}>
            <p className={s.totalLabel}>Итого:</p>
            <p className={s.totalNumber}>{checkout?.totalPrice.toLocaleString()}&nbsp;₽</p>
          </div>
        }

        {
          someItemsAreChosen && <input className={s.promocode} type="text" placeholder="Промокод"/>
        }


        <Button className={s.btn} disabled={!someItemsAreChosen} >Перейти&nbsp;к&nbsp;оформлению</Button>
      </div>
    </div>
  );
};

export default Checkout;