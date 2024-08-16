import s from "./SavedCartsCheckout.module.scss";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getSavedCartsCheckout, getSavedCartsCheckoutStatus} from "@/store/cartSlice.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useEffect, useRef, useState} from "react";


const SavedCartsCheckout = ({submitHandler}) => {
  const savedCartsCheckout = useSelector(getSavedCartsCheckout)
  const isMobile = useMobileScreen()
  const [isMiniCheckoutVisible, setIsMiniCheckoutVisible] = useState(null)
  const savedCheckoutRef = useRef(null);
  const savedCheckoutLoadingStatus = useSelector(getSavedCartsCheckoutStatus)

  // useEffect(() => {
  //      
  //   const timeoutId = setTimeout(() => {
  //     const ref = savedCheckoutRef.current;
  //    
  //     if (ref) {
  //       const observer = new IntersectionObserver(
  //         ([entry]) => {
  //           if (entry.isIntersecting) {
  //             console.log('Checkout вошел во вьюпорт');
  //             setIsMiniCheckoutVisible(false);
  //           } else {
  //             console.log('Checkout вышел из вьюпорта');
  //             setIsMiniCheckoutVisible(true);
  //           }
  //         },
  //         {
  //           root: null,
  //           rootMargin: '0px',
  //           threshold: 0.35,
  //         }
  //       );
  //
  //       observer.observe(ref);
  //
  //       return () => {
  //         observer.unobserve(ref);
  //       };
  //     }
  //    
  //   }, 100); // 100 мс задержка
  //
  //   return () => clearTimeout(timeoutId);
  // }, [checkoutLoadingStatus]);
  //

  useEffect(() => {

    if (savedCheckoutLoadingStatus === 'success') {
      const ref = savedCheckoutRef.current;

      if (ref) {
        const observer = new IntersectionObserver(
          ([entry]) => {
            if (entry.isIntersecting) {
              console.log('Checkout вошел во вьюпорт');
              setIsMiniCheckoutVisible(false);
            } else {
              console.log('Checkout вышел из вьюпорта');
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


  console.log({savedCheckoutLoadingStatus})
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
        isMiniCheckoutVisible && isMobile && <div className={s.miniCheckout}>

          <div>
            <div className={s.miniCheckoutSummary}>
              <div>Товары({savedCartsCheckout.totalProductCount}):</div>
              <div className={s.miniCheckoutSummaryValue}>{savedCartsCheckout.totalPrice.toLocaleString()}&nbsp;₽</div>
            </div>
          </div>
          <Button className={s.miniCheckoutBtn}>Перейти&nbsp;к&nbsp;редактированию</Button>
        </div>
      }
    </>
  );
};

export default SavedCartsCheckout;