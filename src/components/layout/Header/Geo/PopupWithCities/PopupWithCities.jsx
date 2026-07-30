import s from './PopupWithCities.module.scss';
import Popup from "@/components/ui/Popup/Popup.jsx";
import {getContext, getRegions, loadGeoContext, setIsPopupWithCitiesOpen} from "@/store/geoSlice.js";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";
import RegionItem from "@/components/layout/Header/Geo/PopupWithCities/RegionItem/RegionItem.jsx";
import closeIcon from "@/assets/img/cart/closeSearch.svg"
import {getIsAuthenticated} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const PopupWithCities = () => {

  const isMobile = useMobileScreen()

  const isAuthenticated = useSelector(getIsAuthenticated);

  const dispatch = useDispatch()

  const setIsPopupOpen = () => {
    dispatch(setIsPopupWithCitiesOpen(false));
  }
  const [inputValue, setInputValue] = useState("")

  const regions = useSelector(getRegions)
  const geoContext = useSelector(getContext)
  const currentRegion = geoContext.savedRegion

  const filteredRegions = regions?.filter(r =>
    r.name.toLowerCase().includes(inputValue.toLowerCase())
  ) || [];

  const defineRegion = async (region) => {

    if (isAuthenticated) {
      try {
        await axiosInstance.put('/geo/region', {regionId: region.regionId})
        dispatch(loadGeoContext())
        dispatch(setIsPopupWithCitiesOpen(false))
      } catch (err) {
        console.error(err)
      }
    }

    if (!isAuthenticated) {
      localStorage.setItem("regionId", region.regionId)
      dispatch(loadGeoContext())
      dispatch(setIsPopupWithCitiesOpen(false))
    }
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && filteredRegions.length > 0) {
      defineRegion(filteredRegions[0])
    }
  }

  return (
    <Popup closeOnClickOutside={!isMobile} setIsPopupOpen={setIsPopupOpen} popupClassName={s.popup} underlay={false}>
      <div className={s.title}>Выберите регион</div>
      <div className={s.inputWrapper}>
        <input
          placeholder="Город или область"
          value={inputValue}
          onChange={(e) => {
            setInputValue(e.target.value);
          }}
          onKeyDown={handleKeyDown}
          className={s.input}
        />
        {
          inputValue === "" ? (
              <svg className={s.searchIcon} width="14" height="14" viewBox="0 0 14 14" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.07722 13.381C3.6003 13.381 0.769531 10.5502 0.769531 7.07331C0.769531 3.59639 3.6003 0.765625 7.07722 0.765625C10.5541 0.765625 13.3849 3.59639 13.3849 7.07331C13.3849 10.5502 10.5541 13.381 7.07722 13.381ZM7.07722 1.6887C4.10491 1.6887 1.69261 4.10716 1.69261 7.07331C1.69261 10.0395 4.10491 12.4579 7.07722 12.4579C10.0495 12.4579 12.4618 10.0395 12.4618 7.07331C12.4618 4.10716 10.0495 1.6887 7.07722 1.6887Z"
                  fill="#658092"/>
                <path
                  d="M13.5384 14.0039C13.4215 14.0039 13.3046 13.9608 13.2123 13.8685L11.9815 12.6377C11.803 12.4593 11.803 12.1639 11.9815 11.9854C12.16 11.8069 12.4553 11.8069 12.6338 11.9854L13.8646 13.2162C14.043 13.3946 14.043 13.69 13.8646 13.8685C13.7723 13.9608 13.6553 14.0039 13.5384 14.0039Z"
                  fill="#658092"/>
              </svg>
            )
            : <img onClick={() => setInputValue("")} className={s.closeIcon} src={closeIcon} alt="close"/>
        }
      </div>
      <ul className={s.regions}>
        {
          filteredRegions.map((region) => (
            <RegionItem
              key={region.regionId}
              defineRegion={defineRegion}
              region={region}
              currentRegion={currentRegion}
            />
          ))
        }
      </ul>
    </Popup>
  )
}

export default PopupWithCities;