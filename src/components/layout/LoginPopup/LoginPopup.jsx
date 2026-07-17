import {useState} from 'react';
import Popup from "@/components/ui/Popup/Popup.jsx";
import s from "@/components/layout/Header/Login/Login.module.scss";
import InputPhone from "@/components/layout/Header/Login/InputPhone/InputPhone.jsx";
import InputCode from "@/components/layout/Header/Login/InputCode/InputCode.jsx";
import {useDispatch} from "react-redux";
import {setIsLoginPopupOpened} from "@/store/userSlice.js";

const LoginPopup = () => {

  const [step, setStep] = useState(1)  // 1,2
  const [phoneInputValue, setPhoneInputValue] = useState('');

  const onPopupClose = () => {
    setStep(1)
    setPhoneInputValue('')
  }

  const dispatch = useDispatch()

  const setIsPopupOpen = (value)=>{
    dispatch(setIsLoginPopupOpened(value))
  }

  return (
    <Popup setIsPopupOpen={setIsPopupOpen} onPopupClose={onPopupClose} popupClassName={s.popupClassName} >
      {
        step === 1 && <InputPhone
          phoneInputValue={phoneInputValue}
          setPhoneInputValue={setPhoneInputValue}
          setIsPopupOpen={setIsPopupOpen}
          setStep={setStep}
        />
      }
      {
        step === 2 && <InputCode
          setStep={setStep}
          phoneInputValue={phoneInputValue}
          setIsPopupOpen={setIsPopupOpen}
        />
      }
    </Popup>
  )
}

export default LoginPopup;