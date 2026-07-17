import s from './HeaderSearch.module.scss';
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";
import {useState} from "react";

const HeaderSearch = () => {

  const [searchTerm, setSearchTerm] = useState('')
  const searchCancelHandler = () => {
    setSearchTerm('')
  }

  return (
    <div className={s.searchInputWrapper}>
      <img src={searchGlassIcon} alt="search glass icon" className={s.searchIcon} />
      <input
        className={s.searchInput}
        value={searchTerm}
        type="text"
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder={"Название товара, бренда, артикул ..."}
      />
      <div className={s.closeIconWrapper}>
        {
          searchTerm &&
          <button onClick={searchCancelHandler}><img src={searchClose} alt="cancel filter button"/></button>
        }
      </div>
      <button className={s.keySearchBtn}>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M11.959 7.29427L7.00065 2.33594H2.33398V7.0026L7.29232 11.9609C7.5104 12.1747 7.80361 12.2944 8.10898 12.2944C8.41436 12.2944 8.70757 12.1747 8.92565 11.9609L11.959 8.9276C12.1727 8.70952 12.2925 8.41632 12.2925 8.11094C12.2925 7.80556 12.1727 7.51235 11.959 7.29427Z" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M4.66576 5.60104C5.18122 5.60104 5.59909 5.18317 5.59909 4.66771C5.59909 4.15224 5.18122 3.73438 4.66576 3.73438C4.15029 3.73438 3.73242 4.15224 3.73242 4.66771C3.73242 5.18317 4.15029 5.60104 4.66576 5.60104Z" fill="currentColor"/>
        </svg>
        <span>K</span>
      </button>
    </div>
  )
}

export default HeaderSearch;