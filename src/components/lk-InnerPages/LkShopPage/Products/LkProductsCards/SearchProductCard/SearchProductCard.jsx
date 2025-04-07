import s from './SearchProductCard.module.scss';
import {useState} from "react";
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";

const SearchProductCard = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const searchCancelHandler = () => {
    setSearchTerm('')
  }
  
  // через дебаунс сетать в searchParams

  return (
    <div className={s.searchInputWrapper}>
      <input
        className={s.searchInput}
        value={searchTerm}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Введите SKU или название товара"
      />
      <div className={s.searchIconWrapper}>
        {
          searchTerm ?
            <button onClick={searchCancelHandler}><img src={searchClose} alt="cancel filter button"/></button>
            : <img src={searchGlassIcon} alt="search glass icon"/>
        }
      </div>
    </div>
  )
}

export default SearchProductCard;

