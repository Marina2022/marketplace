import s from './LoginMobile.module.scss';
import {useState} from "react";
import Popup from "@/components/ui/Popup/Popup.jsx";
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import InputPhoneMobile from "@/components/layout/Header/LoginMobile/InputPhoneMobile/InputPhoneMobile.jsx";
import InputCodeMobile from "@/components/layout/Header/LoginMobile/InputCodeMobile/InputCodeMobile.jsx";
import {getIsLoginPopupShown, setIsLoginPopupOpened} from "@/store/userSlice.js";

const LoginMobile = () => {

  // const [isPopupOpen, setIsPopupOpen] = useState(false)
  const [step, setStep] = useState(1)  // 1,2
  const [phoneInputValue, setPhoneInputValue] = useState('');


  const dispatch = useDispatch()

  const setIsPopupOpen = (value) => {
    dispatch(setIsLoginPopupOpened(value))
  }

  const onPopupClose = () => {
    setStep(1)
    setPhoneInputValue('')
  }

  return (

    <Popup setIsPopupOpen={setIsPopupOpen} popupClassName={s.popup} onPopupClose={onPopupClose}>
      {
        step === 1 &&
        <InputPhoneMobile
          phoneInputValue={phoneInputValue}
          setPhoneInputValue={setPhoneInputValue}
          setIsPopupOpen={setIsPopupOpen}
          setStep={setStep}
        />
      }
      {
        step === 2 &&
        <InputCodeMobile
          setStep={setStep}
          phoneInputValue={phoneInputValue}
          setIsPopupOpen={setIsPopupOpen}
        />
      }
    </Popup>
  )
}

export default LoginMobile;