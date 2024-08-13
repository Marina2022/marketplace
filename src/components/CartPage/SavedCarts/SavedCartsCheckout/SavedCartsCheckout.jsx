import s from "./SavedCartsCheckout.module.scss";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getSavedCartsCheckout} from "@/store/cartSlice.js";


const SavedCartsCheckout = ({submitHandler}) => {
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

  );
};

export default SavedCartsCheckout;