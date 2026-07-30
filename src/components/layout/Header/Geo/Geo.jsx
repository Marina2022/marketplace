import s from './Geo.module.scss';
import {
  getContext,
  getIsFirstGeoPopupOpen, getIsPopupWithCitiesOpen,
  getRegions,
  setIsFirstGeoPopupOpen,
  setIsPopupWithCitiesOpen
} from "@/store/geoSlice.js";
import {useDispatch, useSelector} from "react-redux";


const Geo = () => {

  const isPopupWithCitiesOpen = useSelector(getIsPopupWithCitiesOpen);
  const isFirstGeoPopupOpen = useSelector(getIsFirstGeoPopupOpen);

  const geoContext = useSelector(getContext)

  const dispatch = useDispatch()

  const handleClick = () => {

    // if (isPopupWithCitiesOpen || isFirstGeoPopupOpen) {
    //   setIsPopupWithCitiesOpen(false)
    //   setIsPopupWithCitiesOpen(false)
    //   return
    // }

    if (geoContext.needsConfirmation) {
      dispatch(setIsFirstGeoPopupOpen(true))
    } else {
      dispatch(setIsPopupWithCitiesOpen(true))
    }


  }

  return (
    <div className={(isPopupWithCitiesOpen || isFirstGeoPopupOpen) ? s.geoButtonActive : s.geoButton} onClick={handleClick}>

      <svg className={s.geoIcon} width="14" height="14" viewBox="0 0 14 14" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.99935 12.8307C6.99935 12.8307 11.0827 8.7474 11.0827 5.2474C11.0827 4.71117 10.9771 4.18018 10.7719 3.68477C10.5667 3.18936 10.2659 2.73922 9.8867 2.36004C9.50753 1.98087 9.05739 1.68009 8.56197 1.47489C8.06656 1.26968 7.53558 1.16406 6.99935 1.16406C6.46312 1.16406 5.93214 1.26968 5.43672 1.47489C4.94131 1.68009 4.49117 1.98087 4.112 2.36004C3.73282 2.73922 3.43205 3.18936 3.22684 3.68477C3.02163 4.18018 2.91602 4.71117 2.91602 5.2474C2.91602 8.7474 6.99935 12.8307 6.99935 12.8307Z"
          stroke="#3A3F49" strokeLinecap="round" strokeLinejoin="round"/>
        <path
          d="M6.99935 6.70573C7.80476 6.70573 8.45768 6.05281 8.45768 5.2474C8.45768 4.44198 7.80476 3.78906 6.99935 3.78906C6.19393 3.78906 5.54102 4.44198 5.54102 5.2474C5.54102 6.05281 6.19393 6.70573 6.99935 6.70573Z"
          stroke="#3A3F49" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      {
        geoContext && geoContext.needsConfirmation && <div className={s.selectRegionText}>Укажите регион</div>
      }

      {
        geoContext && !geoContext.needsConfirmation && <div className={s.cityText}>{geoContext.savedRegion.name}</div>
      }

      <svg className={s.arrow} width="10" height="10" viewBox="0 0 10 10" fill="none"
           xmlns="http://www.w3.org/2000/svg">
        <path
          d="M5.00013 6.99635C4.70846 6.99635 4.4168 6.88385 4.19596 6.66302L1.4793 3.94635C1.35846 3.82552 1.35846 3.62552 1.4793 3.50469C1.60013 3.38385 1.80013 3.38385 1.92096 3.50469L4.63763 6.22135C4.83763 6.42135 5.16263 6.42135 5.36263 6.22135L8.0793 3.50469C8.20013 3.38385 8.40013 3.38385 8.52096 3.50469C8.6418 3.62552 8.6418 3.82552 8.52096 3.94635L5.8043 6.66302C5.58346 6.88385 5.2918 6.99635 5.00013 6.99635Z"
          fill="#658092"/>
      </svg>
    </div>
  )
}

export default Geo;