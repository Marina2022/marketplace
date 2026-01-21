import s from './InputCodeMobile.module.scss';
import backBtn from "@/assets/img/header/backArrow.svg";
import logo from "@/assets/img/header/logo.svg";
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {formatPhone, formatTime} from "@/utils/authDialog.js";
import axios from "@/api/axiosInstance.js";
import {useDispatch} from "react-redux";
import {getUser, setToken} from "@/store/userSlice.js";

const INITIAL_TIME = 120
const InputCodeMobile = ({setStep, phoneInputValue, setIsPopupOpen}) => {

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

  const repeatCodeHandler = async () => {
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
      <div className={s.topPart}>

        <button onClick={() => setStep(1)} className={s.backBtn}><img src={backBtn} alt=""/></button>

          <button className={s.closeBtn} onClick={() => setIsPopupOpen(false)}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M0.330758 0.331352C0.770106 -0.107882 1.48244 -0.107953 1.92175 0.331352L6.69334 5.10294L11.4663 0.329971C11.9056 -0.109326 12.6179 -0.109241 13.0573 0.329971C13.4966 0.769311 13.4966 1.48162 13.0573 1.92096L8.28433 6.69393L13.0587 11.4683C13.498 11.9076 13.4979 12.6199 13.0587 13.0593C12.6193 13.4986 11.907 13.4986 11.4677 13.0593L6.69334 8.28492L1.92037 13.0579C1.48103 13.4972 0.768717 13.4972 0.329377 13.0579C-0.109835 12.6185 -0.10992 11.9062 0.329377 11.4669L5.10235 6.69393L0.330758 1.92234C-0.108582 1.483 -0.108582 0.770692 0.330758 0.331352Z"
                fill="#3E5067"/>
            </svg>
          </button>
        </div>

      <h3 className={s.title}>Введите код</h3>
      <p className={s.text}>Отправили код подтверждения на номер <br/> +7 {formatPhone(phoneInputValue)}</p>

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

export default InputCodeMobile;