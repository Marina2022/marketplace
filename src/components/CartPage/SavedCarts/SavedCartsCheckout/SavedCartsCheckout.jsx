import s from "./SavedCartsCheckout.module.scss";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getSavedCartsCheckout, getSavedCartsCheckoutStatus} from "@/store/cartSlice.js";
import {useEffect, useRef, useState} from "react";
import useBigScreen from "@/hooks/useBigScreen.js";

const SavedCartsCheckout = ({submitHandler}) => {
  const savedCartsCheckout = useSelector(getSavedCartsCheckout)
  const isBigScreen = useBigScreen()
  
  const [isMiniCheckoutVisible, setIsMiniCheckoutVisible] = useState(null)
  const savedCheckoutRef = useRef(null);
  const savedCheckoutLoadingStatus = useSelector(getSavedCartsCheckoutStatus)

  
  useEffect(() => {

    if (savedCheckoutLoadingStatus === 'success') {
      const ref = savedCheckoutRef.current;

      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {              
              setIsMiniCheckoutVisible(false);
            } else {
              setIsMiniCheckoutVisible(true);
            }
          },
          {
            root: null,
            rootMargin: '0px',
            threshold: 0.35,
          }
        );

        observer.observe(ref);

        return () => {
          observer.unobserve(ref);
        };
      }
    }
  }, [savedCheckoutLoadingStatus]);

  
  if (savedCheckoutLoadingStatus === 'loading') return <></>

  return (
    <>
      <div className={s.checkout} ref={savedCheckoutRef}>
        {
          savedCartsCheckout.totalProductCount > 0
            ? <div className={s.topPart}>
              <h3 className={s.title}>Ваша корзина:</h3>
              <div className={s.productsRow}>
                <p className={s.products}>Товары ({savedCartsCheckout?.totalProductCount})</p>
                <p className={s.totalPrice}>{savedCartsCheckout?.totalPrice.toLocaleString()}&nbsp;₽</p>
              </div>
            </div>
            : <div className={s.noProductsMessage}>
              <h3 className={s.title}>Ваша корзина:</h3>
              Корзины не выбраны
            </div>
        }

        <div className={s.bottomPart}>
          <Button
            className={s.btn}
            onClick={submitHandler}
            disabled={savedCartsCheckout.totalProductCount === 0}>
            Перейти&nbsp;к&nbsp;редактированию
          </Button>
        </div>
      </div>

      {
        isMiniCheckoutVisible && !isBigScreen && <div className={s.miniCheckout}>

          <div>
            <div className={s.miniCheckoutSummary}>
              <div>Товары({savedCartsCheckout.totalProductCount}):</div>
              <div className={s.miniCheckoutSummaryValue}>{savedCartsCheckout.totalPrice.toLocaleString()}&nbsp;₽</div>
            </div>
          </div>
          <Button onClick={submitHandler} className={s.miniCheckoutBtn}>Перейти&nbsp;к&nbsp;редактированию</Button>
        </div>
      }
    </>
  );
};

export default SavedCartsCheckout;