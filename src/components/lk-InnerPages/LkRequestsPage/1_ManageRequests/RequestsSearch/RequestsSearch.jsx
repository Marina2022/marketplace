import s from './RequestsSearch.module.scss';
import searchClose from "@/assets/img/cart/closeSearch.svg";
import searchGlassIcon from "@/assets/img/cart/seachGlass.svg";
import {useDebounce} from "@uidotdev/usehooks";
import {useEffect, useState} from "react";


const RequestsSearch = ({searchTerm, setSearchTerm}) => {


  const searchCancelHandler = () => {
    setSearchTerm('')
  }


  const [inputValue, setInputValue] = useState(searchTerm)

  const debouncedValue = useDebounce(inputValue, 500);


  useEffect(() => {
    setSearchTerm(debouncedValue)
    console.log(debouncedValue)
  }, [debouncedValue]);



  return (
    <div className={s.searchInputWrapper}>
      <input
        className={s.searchInput}
        value={inputValue}
        type="text"
        onChange={(e) => setInputValue(e.target.value)}
        placeholder={"Введите SKU или название товара"}
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

export default RequestsSearch;