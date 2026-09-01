import s from './ChatSearch.module.scss';
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useDebounce} from "@uidotdev/usehooks";
import {getChatSearch, setChatSearch} from "@/store/chatSlice.js";

const ChatSearch = () => {

  const initialSearchValue = useSelector(getChatSearch)

  const [innerSearchValue, setInnerSearchValue] = useState(initialSearchValue)
  const debouncedSearchValue = useDebounce(innerSearchValue, 300);

  const dispatch = useDispatch()

  const handleChange = (e) => {
    setInnerSearchValue(e.target.value)
  }

  const [searchTerm, setSearchTerm] = useState('')
  const searchCancelHandler = () => {
    setSearchTerm('')
  }

  useEffect(() => {
    dispatch(setChatSearch(debouncedSearchValue))
  }, [debouncedSearchValue]);

  return (
    <div className={s.searchInputWrapper}>
      <img src={searchGlassIcon} alt="search glass icon" className={s.searchIcon} />
      <input
        className={s.searchInput}
        value={innerSearchValue}
        type="text"
        onChange={handleChange}
        placeholder={"Поиск контаков"}
      />
      <div className={s.closeIconWrapper}>
        {
          searchTerm &&
          <button onClick={searchCancelHandler}><img src={searchClose} alt="cancel filter button"/></button>
        }
      </div>
    </div>
  )
}

export default ChatSearch;