import s from './FirstGeoPopup.module.scss';
import Popup from "@/components/ui/Popup/Popup.jsx";
import {
  getContext,
  getContextStatus,
  getIsFirstGeoPopupOpen,
  getIsPopupWithCitiesOpen,
  setIsFirstGeoPopupOpen
} from "@/store/geoSlice.js";
import {useDispatch, useSelector} from "react-redux";
import ChooseRegionPopupContent
  from "@/components/layout/Header/Geo/FirstGeoPopup/ChooseRegionPopupContent/ChooseRegionPopupContent.jsx";
import ConfirmRegionPopupContent
  from "@/components/layout/Header/Geo/FirstGeoPopup/ConfirmRegionPopupContent/ConfirmRegionPopupContent.jsx";
import {useEffect} from "react";
import {setShowCloseBtn} from "@/store/mobileMenuSlice.js";

const FirstGeoPopup = () => {




  const geoContext = useSelector(getContext)
  const contextStatus = useSelector(getContextStatus)

  const regionIsDetected = (geoContext && geoContext.detectedRegion?.code !== 'ALL') || !geoContext.detectedRegion

  const dispatch = useDispatch()


  const isFirstGeoPopupOpen = useSelector(getIsFirstGeoPopupOpen)

  useEffect(() => {
    return () => {
      dispatch(setShowCloseBtn(false))
    }
  }, []);

  useEffect(() => {

    if (isFirstGeoPopupOpen) {
      dispatch(setShowCloseBtn(true))
    } else {
      dispatch(setShowCloseBtn(false))
    }
  }, [isFirstGeoPopupOpen]);


  if (contextStatus !== "succeeded") return null

  const setIsPopupOpen = () => {
    dispatch(setIsFirstGeoPopupOpen(false));
  }


  return (
    <Popup popupClassName={s.popup} underlay={false} setIsPopupOpen={setIsPopupOpen} >

      {
        !regionIsDetected && <ChooseRegionPopupContent />
      }

      {
        regionIsDetected && <ConfirmRegionPopupContent />
      }

    </Popup>
  )
}

export default FirstGeoPopup;