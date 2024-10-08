import s from './Checkout.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {checkCartStatus, getCheckout} from "@/store/cartSlice.js";
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {getIsAuthenticated} from "@/store/userSlice.js";
import useBigScreen from "@/hooks/useBigScreen.js";

const Checkout = ({cart}) => {

  const isBigScreen = useBigScreen()
  const [isMiniCheckoutVisible, setIsMiniCheckoutVisible] = useState(null)
  const checkoutRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMiniCheckoutVisible(false)

        } else {
          setIsMiniCheckoutVisible(true)
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.35,
      }
    );

    if (checkoutRef.current) {
      observer.observe(checkoutRef.current);
    }

    return () => {
      if (checkoutRef.current) {
        observer.unobserve(checkoutRef.current);
      }
    };
  }, []);

  const checkout = useSelector(getCheckout)
  const isAuthenticated = useSelector(getIsAuthenticated)
  const dispatch = useDispatch()
  const checkoutHandler = () => {
    if (isAuthenticated) {
      dispatch(checkCartStatus({cartId: cart.cartId}))
    }
  }

  let someItemsAreChosen

  if (cart?.cartItems) {
    someItemsAreChosen = cart.cartItems
      .filter(item => item.inventoryLevel !== 0)
      .some(item => item.checked === true);
  }

  return (
    <>
      <div className={s.checkout} ref={checkoutRef}>
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
          <Button onClick={checkoutHandler} className={s.btn}
                  disabled={!someItemsAreChosen}>Перейти&nbsp;к&nbsp;оформлению</Button>
        </div>
      </div>
      {
        isMiniCheckoutVisible && !isBigScreen && <div className={s.miniCheckout}>
          <div>
            <div className={s.miniCheckoutSavings}>
              <span className={s.miniCheckoutSavingLabel}>Вы экономите:</span>
              <span className={s.miniCheckoutSavingValue}>{checkout?.savings.toLocaleString()}&nbsp;₽</span>
            </div>
            <div className={s.miniCheckoutSavingSummary}>
              <div>Итого:</div>
              <div>{checkout?.totalPrice.toLocaleString()}&nbsp;₽</div>
            </div>
          </div>
          <Button onClick={checkoutHandler} className={s.miniCheckoutBtn}>Перейти&nbsp;к&nbsp;оформлению</Button>
        </div>
      }
    </>
  );
};

export default Checkout;