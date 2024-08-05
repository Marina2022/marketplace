import s from './Checkout.module.scss';
import {useSelector} from "react-redux";
import {getCheckout, getCheckoutStatus} from "@/store/cartSlice.js";
import Button from "@/components/ui/Button/Button.jsx";

const Checkout = () => {

  const checkout = useSelector(getCheckout)
  console.log(checkout)
  const checkoutStatus = useSelector(getCheckoutStatus)

  if (checkoutStatus === 'loading') return <div>Loading...</div>

  return (
    <div className={s.checkout}>
      <div className={s.topPart}>
        <h3 className={s.title}>Ваш заказ:</h3>
        <div className={s.productsRow}>
          <p className={s.products}>Товары ({checkout.productCountInCart})</p>
          <p className={s.totalBigPrice}>{checkout.totalRegularPrice.toLocaleString()}&nbsp;₽</p>
        </div>
        <div className={s.savings}>
          <p>Вы экономите:</p>
          <p className={s.savingsNumber}>{checkout.savings.toLocaleString()}&nbsp;₽</p>
        </div>
      </div>

      <div className={s.bottomPart}>
        <div className={s.total}>
          <p className={s.totalLabel}>Итого:</p>
          <p className={s.totalNumber}>{checkout.totalPrice.toLocaleString()}&nbsp;₽</p>
        </div>
        <input className={s.promocode} type="text" placeholder="Промокод"/>
        <Button className={s.btn}>Перейти&nbsp;к&nbsp;оформлению</Button>
      </div>
    </div>
  );
};

export default Checkout;