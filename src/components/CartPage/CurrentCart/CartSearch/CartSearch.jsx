import s from './CartSearch.module.scss';
import {getCartSearchTerm, setCartSearchTerm} from "@/store/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg"
import searchClose from "@/assets/img/cart/closeSearch.svg"
import useMobileScreen from "@/hooks/useMobileScreen.js";

const CartSearch = () => {
  
  const isMobile = useMobileScreen()
  
  const dispatch = useDispatch()

  const cartSearchTerm = useSelector(getCartSearchTerm)
  const inputChangeHandler = (e) => {
    dispatch(setCartSearchTerm(e.target.value))
  }
  
  const searchCancelHandler = () => {
    dispatch(setCartSearchTerm(''))
  }


  return (
    <div className={s.searchInputWrapper}>
      <input
        className={s.searchInput}
        value={cartSearchTerm}
        type="text"
        onChange={inputChangeHandler}
        placeholder={isMobile ? "Быстрый поиск" : "Быстрый поиск: введите наименование товара или артикул" }
      />

      <div className={s.searchIconWrapper}>
      {
        cartSearchTerm ? <button onClick={searchCancelHandler}><img src={searchClose} alt="cancel filter button"/></button>
          : <img src={searchGlassIcon} alt="search glass icon"/>
      }
      </div>

    </div>
  );
};

export default CartSearch;