import s from './ChooseRegionPopupContent.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {setIsFirstGeoPopupOpen, setIsPopupWithCitiesOpen} from "@/store/geoSlice.js";
import {useDispatch} from "react-redux";

const ChooseRegionPopupContent = () => {

  const dispatch = useDispatch();

  const handleNotNow = () => {
    dispatch(setIsFirstGeoPopupOpen(false))
  }

  const handleSelectRegion = () => {
    dispatch(setIsFirstGeoPopupOpen(false))
    dispatch(setIsPopupWithCitiesOpen(true))
  }

  return (
    <div>
      <div className={s.header}>
        <div className={s.icon}>
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.99935 18.3307C9.99935 18.3307 15.8327 12.4974 15.8327 7.4974C15.8327 6.73135 15.6818 5.97281 15.3886 5.26508C15.0955 4.55734 14.6658 3.91428 14.1241 3.37261C13.5825 2.83093 12.9394 2.40125 12.2317 2.1081C11.5239 1.81495 10.7654 1.66406 9.99935 1.66406C9.2333 1.66406 8.47476 1.81495 7.76703 2.1081C7.0593 2.40125 6.41623 2.83093 5.87456 3.37261C5.33288 3.91428 4.9032 4.55734 4.61005 5.26508C4.3169 5.97281 4.16602 6.73135 4.16602 7.4974C4.16602 12.4974 9.99935 18.3307 9.99935 18.3307Z"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M9.99935 9.58073C11.1499 9.58073 12.0827 8.64799 12.0827 7.4974C12.0827 6.3468 11.1499 5.41406 9.99935 5.41406C8.84876 5.41406 7.91602 6.3468 7.91602 7.4974C7.91602 8.64799 8.84876 9.58073 9.99935 9.58073Z"
              stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <div className={s.title}>Выберите ваш регион</div>
      </div>
      <div className={s.buttons}>
        <Button black className={s.blackBtn} onClick={handleSelectRegion}>Выбрать регион</Button>
        <Button grey className={s.grayBtn} onClick={handleNotNow}>Не сейчас</Button>
      </div>
    </div>
  )
}

export default ChooseRegionPopupContent;