import s from './InputCode.module.scss';
import backBtn from "@/assets/img/header/backArrow.svg";
import logo from "@/assets/img/header/logo.svg";
import Button from "@/components/ui/Button/Button.jsx";
import {useEffect, useRef, useState} from "react";
import {formatMinutes, formatPhone, formatTime} from "@/utils/authDialog.js";
import axios from "@/api/axiosInstance.js";
import {useDispatch} from "react-redux";
import {getUser} from "@/store/userSlice.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import TimeoutIcon from "@/components/ui/ToastCustom/icons/TimeoutIcon.jsx";


const InputCode = ({setStep, phoneInputValue, setIsPopupOpen}) => {

  const DEFAULT_TIMEOUT = 60
  const [timerValue, setTimerValue] = useState(DEFAULT_TIMEOUT)

  const [value, setValue] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isInvalidOtp, setIsInvalidOtp] = useState(false)
  const [timerTicking, setTimerTicking] = useState(true)
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
    if (timerTicking) return

    const now = Date.now(); // текущий timestamp (мс)

    try {
      await axios.post('auth/send-sms', {phoneNumber: phoneInputValue})

      setTimerValue(DEFAULT_TIMEOUT)

      let timers = [];

      const LSTimers = localStorage.getItem('smsTimer');
      if (LSTimers) {
        timers = JSON.parse(LSTimers);
      }

      const timer = {
        phone: phoneInputValue,
        timerTill: now + DEFAULT_TIMEOUT * 1000
      };

      const index = timers.findIndex(t => t.phone === phoneInputValue);

      if (index !== -1) {
        timers[index] = timer;
      } else {
        timers.push(timer);
      }

      localStorage.setItem('smsTimer', JSON.stringify(timers));

      setTimerTicking(true)
      intervalIdRef.current = setInterval(() => {
        setTimerValue(prev => prev - 1)
      }, 1000)

    } catch (error) {
      if (error.response?.status === 429) {

        const retryAfter = error.response.headers['retry-after'];
        setTimerValue(retryAfter);

        showErrorToast("Слишком много запросов", `Превышен лимит действий. Повторите примерно через ${formatMinutes(retryAfter)}`, <TimeoutIcon />)

        const timerTill = now + retryAfter * 1000;

        let timers = [];

        const LSTimers = localStorage.getItem('smsTimer');
        if (LSTimers) {
          timers = JSON.parse(LSTimers);
        }

        const timer = {
          phone: phoneInputValue,
          timerTill
        };

        const index = timers.findIndex(t => t.phone === phoneInputValue);

        if (index !== -1) {
          timers[index] = timer;
        } else {
          timers.push(timer);
        }

        localStorage.setItem('smsTimer', JSON.stringify(timers));

        setTimerTicking(true)

        clearInterval(intervalIdRef.current);
        intervalIdRef.current = setInterval(() => {
          setTimerValue(prev => prev - 1);
        }, 1000);
      }
      console.log(error)
    }
  }

  const focusHandler = () => {
    setIsInvalidOtp(false)
  }

  const dispatch = useDispatch()

  const sendCode = async () => {

    try {
      setIsSubmitting(true)

      const resp = await axios.post('auth/validate-otp',
        {phoneNumber: phoneInputValue, code: value}
      )

      localStorage.setItem('token', resp.data.accessToken)
      dispatch(getUser())
      setIsPopupOpen(false)

    } catch (err) {

      console.log(err)

      err.response.data.errors.forEach(error => {

        if (error.code === 'Auth.OtpInvalid') {
          setIsInvalidOtp(true)
          setValue("")
        }

        showErrorToast("Ошибка", error.message)
      })

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
        <Button disabled={timerTicking} onClick={repeatCodeHandler} className={s.btn}>
          {
            timerTicking
              ? <span> Повторить через <span className={s.time}>{formatTime(timerValue)}</span></span>
              : <span>Отправить код повторно</span>
          }
        </Button>
      </div>
    </div>
  );
};

export default InputCode;