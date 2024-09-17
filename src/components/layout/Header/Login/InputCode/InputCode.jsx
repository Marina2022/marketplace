import s from './InputCode.module.scss';
import backBtn from "@/assets/img/header/backArrow.svg";
import logo from "@/assets/img/header/logo.svg";
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {formatPhone, formatTime} from "@/utils/authDialog.js";
import axios from "@/api/axiosInstance.js";
import {useDispatch} from "react-redux";
import {getUser, setToken} from "@/store/userSlice.js";

const INITIAL_TIME = 120
const InputCode = ({setStep, phoneInputValue, setIsPopupOpen}) => {

  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInvalidOtp, setIsInvalidOtp] = useState(false)
  const [timerTicking, setTimerTicking] = useState(true)
  const [timerValue, setTimerValue] = useState(INITIAL_TIME)
  const intervalIdRef = useRef(null)

  useEffect(() => {
    setTimerTicking(true)

    intervalIdRef.current = setInterval(() => {
      setTimerValue(prev => prev - 1)
    }, 1000)

    return () => clearInterval(intervalIdRef.current)
  }, []);
 

  useEffect(() => {

    if (timerValue === 0) {
      clearInterval(intervalIdRef.current)
      setTimerTicking(false)
    }

  }, [timerValue]);

  useEffect(() => {
    if (value.length === 4) {
      sendCode()
    }
  }, [value]);

  const handleChange = (e) => {

    let inputValue = e.target.value.replace(/\D/g, '');

    if (value.length > 4) {
      return
    } else {
      setValue(inputValue)
    }
  }

  const repeatCodeHandler = async ()=>{
    try {
      await axios.post('auth/generate', {phoneNumber: value})
      setTimerValue(INITIAL_TIME)
      setTimerTicking(true)
      intervalIdRef.current = setInterval(() => {
        setTimerValue(prev => prev - 1)
      }, 1000)

    } catch (err) {
      console.log(err)
    }
  }
  const focusHandler = () => {
    setIsInvalidOtp(false)
  }

  const dispatch = useDispatch()
  const sendCode = async () => {

    try {
      setIsSubmitting(true)
      const resp = await axios.post('auth/validate', {phoneNumber: phoneInputValue, code: value})
      localStorage.setItem('token', resp.data.token)
      dispatch(setToken(resp.data.token))      
      dispatch(getUser())
      setIsPopupOpen(false)     

    } catch (err) {
      if (err.response.data.description === 'Invalid otp') {
        setIsInvalidOtp(true)
        setValue("")
      } else {
        console.log(err.response.data)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={s.wrapper}>
      <button onClick={() => setStep(1)} className={s.backBtn}><img src={backBtn} alt=""/></button>
      <img className={s.logo} src={logo} alt="logo"/>
      <h3 className={s.title}>Введите код</h3>
      <h3 className={s.text}>Отправили код подтверждения на номер <br/> +7 {formatPhone(phoneInputValue)}</h3>

      <input
        disabled={isSubmitting}
        onFocus={focusHandler}
        type="password"
        value={value}
        onChange={handleChange}
        placeholder='Код'
        className={s.input}
        autoFocus
      />

      {
        isInvalidOtp && <div className={s.invalidCode}>Неверный код, попробуйте еще раз</div>
      }

      <div>
        {
          timerTicking
            ? <div className={s.timerString}>Запросить новый код через: {formatTime(timerValue)}</div>
            : <Button onClick={repeatCodeHandler} className={s.btn}>Отправить код повторно</Button>
        }
      </div>
    </div>
  );
};

export default InputCode;