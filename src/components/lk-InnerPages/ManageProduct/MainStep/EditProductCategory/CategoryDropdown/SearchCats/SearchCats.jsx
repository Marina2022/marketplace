import s from './SearchCats.module.scss';
import {useEffect, useState} from "react";
import {useDebounce} from "@uidotdev/usehooks";

const SearchCats = ({searchCats, setSearchCats}) => {

  const [showIcon, setShowIcon] = useState(searchCats === '')
  const [innerSearchValue, setInnerSearchValue] = useState(searchCats)
  const debouncedSearchValue = useDebounce(innerSearchValue, 300);

  useEffect(() => {
    setSearchCats(debouncedSearchValue)
  }, [debouncedSearchValue]);
  const handleFocus = () => {
    setShowIcon(false)
  }
  const handleBlur = () => {
    setShowIcon(searchCats === '' ? true : false)
  }
  const handleChange = (e) => {
    setInnerSearchValue(e.target.value)
  }

  return (
    <div className={s.wrapper}>
      {
        showIcon && <svg className={s.searchIcon} width="14" height="14" viewBox="0 0 14 14" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.08113 13.3845C3.60421 13.3845 0.773438 10.5538 0.773438 7.07685C0.773438 3.59993 3.60421 0.769165 7.08113 0.769165C10.558 0.769165 13.3888 3.59993 13.3888 7.07685C13.3888 10.5538 10.558 13.3845 7.08113 13.3845ZM7.08113 1.69224C4.10882 1.69224 1.69651 4.1107 1.69651 7.07685C1.69651 10.043 4.10882 12.4615 7.08113 12.4615C10.0534 12.4615 12.4657 10.043 12.4657 7.07685C12.4657 4.1107 10.0534 1.69224 7.08113 1.69224Z"
            fill="#658092"/>
          <path
            d="M13.5423 14.0001C13.4254 14.0001 13.3085 13.957 13.2162 13.8647L11.9854 12.6339C11.8069 12.4555 11.8069 12.1601 11.9854 11.9816C12.1639 11.8032 12.4593 11.8032 12.6377 11.9816L13.8685 13.2124C14.0469 13.3909 14.0469 13.6862 13.8685 13.8647C13.7762 13.957 13.6593 14.0001 13.5423 14.0001Z"
            fill="#658092"/>
        </svg>
      }
      <input
        className={s.searchBlock}
        placeholder="Название категории"
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={innerSearchValue}
        onChange={handleChange}
      ></input>
    </div>
  )
}

export default SearchCats;