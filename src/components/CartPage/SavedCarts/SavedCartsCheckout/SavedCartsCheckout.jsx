import s from "./SavedCartsCheckout.module.scss";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getSavedCartsCheckout} from "@/store/cartSlice.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import {login} from "@/store/userSlice.js";


const SavedCartsCheckout = ({submitHandler}) => {
  
  const savedCartsCheckout = useSelector(getSavedCartsCheckout)  

  const isMobile = useMobileScreen()
  const [isMiniCheckoutVisible, setIsMiniCheckoutVisible] = useState(null)
  const savedCheckoutRef = useRef(null);
  //
  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     ([entry]) => {
  //       if (entry.isIntersecting) {
  //         console.log('Checkout вошел во вьюпорт');
  //         setIsMiniCheckoutVisible(false)
  //
  //       } else {
  //         console.log('Checkout вышел из вьюпорта');
  //         setIsMiniCheckoutVisible(true)
  //       }
  //     },
  //     {
  //       root: null, 
  //       rootMargin: '0px',
  //       threshold: 0, 
  //     }
  //   );
  //
  //   if (savedCheckoutRef.current) {
  //     observer.observe(savedCheckoutRef.current);
  //   }
  //  
  //   return () => {
  //     if (savedCheckoutRef.current) {
  //       observer.unobserve(savedCheckoutRef.current);
  //     }
  //   };
  // }, []);


  // useEffect(() => {
  //
  //   console.log('step 1')
  //  
  //  
  //   if (typeof window !== 'undefined') {
  //     console.log('step 2')
  //     console.log('ref = ', savedCheckoutRef.current)
  //     const observer = new IntersectionObserver(
  //       ([entry]) => {
  //         if (entry.isIntersecting) {
  //           console.log('Checkout вошел во вьюпорт');
  //           setIsMiniCheckoutVisible(false);
  //         } else {
  //           console.log('Checkout вышел из вьюпорта');
  //           setIsMiniCheckoutVisible(true);
  //         }
  //       },
  //       {
  //         root: null,
  //         rootMargin: '0px',
  //         threshold: 0.35,
  //       }
  //     );
  //
  //     if (savedCheckoutRef.current) {
  //       observer.observe(savedCheckoutRef.current);
  //     }
  //
  //     return () => {
  //       if (savedCheckoutRef.current) {
  //         observer.unobserve(savedCheckoutRef.current);
  //       }
  //     };
  //   }
  // }, []);


  useLayoutEffect(() => {
    const ref = savedCheckoutRef.current;
    if (ref) {
      console.log('ref = ', ref);
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
        if (ref) {
          observer.unobserve(ref);
        }
      };
    }
  }, []); // Теперь без зависимости от ref
  
  
  if (!savedCartsCheckout) return <></>
  
  return (
    <>
      <div className={s.checkout} ref={savedCheckoutRef} >
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
              <div>Товары({savedCartsCheckout.totalProductCount}): </div>
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