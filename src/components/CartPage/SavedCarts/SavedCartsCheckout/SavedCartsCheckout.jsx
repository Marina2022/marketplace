import s from "./SavedCartsCheckout.module.scss";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getSavedCarts, getSavedCartsCheckout} from "@/store/cartSlice.js";

const SavedCartsCheckout = () => {

  const savedCartsCheckout = useSelector(getSavedCartsCheckout)
  
  if (!savedCartsCheckout) return <></>
  
  return (
  
      <div className={s.checkout}>
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
              Корзины не выбраны
            </div>
        }

        <div className={s.bottomPart}>
          {/*{*/}
          {/*  savedCartsCheckout?.totalProductCount > 0 && <div className={s.total}>*/}
          {/*    <p className={s.totalLabel}>Итого:</p>*/}
          {/*    <p className={s.totalNumber}>{savedCartsCheckout?.totalPrice.toLocaleString()}&nbsp;₽</p>*/}
          {/*  </div>*/}
          {/*}*/}

          

          <Button className={s.btn} disabled={savedCartsCheckout.totalProductCount === 0}>Перейти&nbsp;к&nbsp;редактированию</Button>
        </div>
      </div>
    
  );
};

export default SavedCartsCheckout;