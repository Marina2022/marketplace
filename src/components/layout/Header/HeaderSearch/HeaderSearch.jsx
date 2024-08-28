import s from './HeaderSearch.module.scss';
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";
import {useState} from "react";
import {setCartSearchTerm} from "@/store/cartSlice.js";


const HeaderSearch = () => {
  
  const [searchTerm, setSearchTerm] = useState('')
  const searchCancelHandler = () => {
    setSearchTerm('')
  }

  return (
    <div className={s.searchInputWrapperDesktop}>
      <input
        className={s.searchInput}
        value={searchTerm}
        type="text"
        onChange={(e)=>setSearchTerm(e.target.value)}
        placeholder={"Название товара, бренда, артикул ..."}
      />
      <div className={s.searchIconWrapper}>
        {
          searchTerm ?
            <button onClick={searchCancelHandler}><img src={searchClose} alt="cancel filter button"/></button>
            : <img src={searchGlassIcon} alt="search glass icon"/>
        }
      </div>
    </div>
  );
};

export default HeaderSearch;