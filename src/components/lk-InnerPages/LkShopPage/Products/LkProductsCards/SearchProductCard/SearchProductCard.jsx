import s from './SearchProductCard.module.scss';
import {useEffect, useState} from "react";
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";
import {useDebounce} from "@uidotdev/usehooks";
import {useSearchParams} from "react-router-dom";

const SearchProductCard = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchTerm, setSearchTerm] = useState(searchParams.get('searchTerms') || '')
  const debouncedSearchTerm = useDebounce(searchTerm, 300); // 300мс задержка

  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    if (!debouncedSearchTerm) {      
      params.delete('searchTerms')
      setSearchParams(params);
    } else {      
      params.set("searchTerms", debouncedSearchTerm);
      setSearchParams(params);
    }
  }, [debouncedSearchTerm]);

  const searchCancelHandler = () => {
    setSearchTerm('')
  }

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

