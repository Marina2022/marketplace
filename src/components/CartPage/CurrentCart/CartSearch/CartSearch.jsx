import s from './CartSearch.module.scss';
import {getCartSearchTerm, setCartSearchTerm} from "@/store/cartSlice.js";
import {useDispatch, useSelector} from "react-redux";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg"
import searchClose from "@/assets/img/cart/closeSearch.svg"

const CartSearch = () => {
  const dispatch = useDispatch()

  const cartSearchTerm = useSelector(getCartSearchTerm)

  console.log('cartSearchTerm = ', cartSearchTerm)
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
        placeholder={window.innerWidth > 960 ? "Быстрый поиск: введите наименование товара или артикул" : "Быстрый поиск"}
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