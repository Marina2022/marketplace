import axios from "@/api/axiosInstance.js";
import s from './InputPhone.module.scss';
import logo from "@/assets/img/header/logo.svg"
import backBtn from "@/assets/img/header/backArrow.svg"
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import InputMask from 'react-input-mask';
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {formatMinutes} from "@/utils/authDialog.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import TimeoutIcon from "@/components/ui/ToastCustom/icons/TimeoutIcon.jsx";

const DEFAULT_TIMEOUT = 60

const sendSmsWithRetry = async (payload) => {
  try {
    return await axios.post('auth/send-sms', payload)
  } catch (error) {
    const code = error?.response?.data?.errors?.[0]?.code
    const status = error?.response?.status

    // условие для тихого ретрая
    if (status === 409 && code === 'Auth.TryAgain') {
      return await axios.post('auth/send-sms', payload)
    }

    throw new Error("error sendSmsWithRetry")
  }
}

const InputPhone = ({setIsPopupOpen, setStep, phoneInputValue, setPhoneInputValue}) => {

  const [placeholder, setPlaceholder] = useState('Телефон');
  const [isFocused, setIsFocused] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [phoneSending, setPhoneSending] = useState(false)

  const [showAccessError, setShowAccessError] = useState(false)
  const [showFailError, setShowFailError] = useState(false)

  const handleFocus = () => {
    setPlaceholder('000 000-00-00');
    setIsFocused(true)
  };

  const handleBlur = () => {
    setPlaceholder('Телефон');
    setIsFocused(false)
  }

  const handleChange = (e) => {

    setShowAccessError(false)
    setShowFailError(false)

    let inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.startsWith('7') || inputValue.startsWith('8')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }
    setPhoneInputValue(inputValue);
    if (phoneInputValue.length === 10 && isInvalid) setIsInvalid(false)
  }

  const supportMessage = () => {
    console.log("Письмо в поддержку")
  }

  const submitHandler = async (e) => {
    e.preventDefault()

    const timeoutFromLS = localStorage.getItem('smsTimer')
    let timeLeft

    if (timeoutFromLS) {
      const timers = JSON.parse(timeoutFromLS)
      const currentTimer = timers.find(timer => timer.phone === phoneInputValue)

      if (currentTimer) {
        const {timerTill} = currentTimer
        const now = Date.now();
        if (timerTill > now) timeLeft = Math.ceil((timerTill - now) / 1000)
      }
    }

    if (timeLeft) {
      showErrorToast("Слишком много запросов", `Превышен лимит действий. Повторите примерно через ${formatMinutes(timeLeft)}`, <TimeoutIcon /> )
      return
    }

    if (phoneInputValue.length < 10) {
      setIsInvalid(true)
    } else {

      try {
        setPhoneSending(true)
        const now = Date.now(); // текущий timestamp (мс)

        try {
          // await axios.post('auth/send-sms', {phoneNumber: phoneInputValue})
          await sendSmsWithRetry({phoneNumber: phoneInputValue})

          let timers = []
          const LSTimers = localStorage.getItem('smsTimer')
          if (LSTimers) {
            timers = JSON.parse(LSTimers)
          }

          const newTimer = {
            phone: phoneInputValue,
            timerTill: now + DEFAULT_TIMEOUT * 1000
          };
          // ищем индекс по телефону
          const index = timers.findIndex(t => t.phone === phoneInputValue);

          if (index !== -1) {
            timers[index] = newTimer;
          } else {
            timers.push(newTimer);
          }

          localStorage.setItem('smsTimer', JSON.stringify(timers))

        } catch (error) {
          if (error.response?.status === 429) {
            const retryAfter = error.response.headers['retry-after'];

            showErrorToast("Слишком много запросов", `Превышен лимит действий. Повторите примерно через  ${formatMinutes(retryAfter)}`, <TimeoutIcon />)
            let timers = [];

            const LSTimers = localStorage.getItem('smsTimer');
            if (LSTimers) {
              timers = JSON.parse(LSTimers);
            }

            const index = timers.findIndex(t => t.phone === phoneInputValue);

            if (index !== -1) {
              timers[index] = {
                phone: phoneInputValue,
                timerTill: now + retryAfter * 1000
              };
            } else {
              timers.push({
                phone: phoneInputValue,
                timerTill: now + retryAfter * 1000
              });
            }
            localStorage.setItem('smsTimer', JSON.stringify(timers));
            return;
          }

          const code = error?.response?.data?.errors?.[0]?.code

          if (code === "Auth.UserBlocked") {
            setShowAccessError(true)
            return
          }
          if (code === "Auth.SmsSendFailed") {
            setShowFailError(true)
            return
          }

          console.log(error)
        }

        setStep(2)
      } catch (error) {
        if (error.response?.status === 429) {
          const retryAfter = error.response.headers['retry-after'];
          showErrorToast("Слишком много запросов", "Превышен лимит действий. Повторите примерно через минуту", <TimeoutIcon />)

          const now = Date.now();
          const timerTill = now + retryAfter * 1000;   // записываем в LS таймстэмп, который будет через <retryAfter> секунд
          localStorage.setItem('smsTimer', JSON.stringify({phone: phoneInputValue, timerTill}))
        }

        console.log(error)
      } finally {
        setPhoneSending(false)
      }
    }
  }

  return (
    <div className={s.wrapper}>
      <button onClick={() => setIsPopupOpen(false)} className={s.backBtn}><img src={backBtn} alt=""/></button>
      <img className={s.logo} src={logo} alt="logo"/>
      <h3 className={s.title}>Введите номер телефона</h3>
      <div className={s.text}>Введите номер телефона. Мы отправим СМС</div>

      {
        showAccessError && (
          <div className={s.noAccessError}>
            <div className={s.noAccessErrorHeader}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99957 6.21875V9.06319M7.99957 11.0187V11.0276M7.99957 2.21875L14.2218 12.8854H1.77734L7.99957 2.21875Z"
                  stroke="#B4472E" strokeWidth="1.42222" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Доступ ограничен</span>
            </div>
            <div>
              Этот номер заблокирован. Обратитесь в поддержку, чтобы восстановить доступ.
            </div>
          </div>
        )
      }

      {
        showFailError && (
          <div className={s.failError}>
            <div className={s.failErrorHeader}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M7.99957 6.21875V9.06319M7.99957 11.0187V11.0276M7.99957 2.21875L14.2218 12.8854H1.77734L7.99957 2.21875Z"
                  stroke="#3D4A66" strokeWidth="1.42222" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Не удалось отправить код</span>
            </div>
            <div>
              Временный сбой. Попробуйте отправить ещё раз.
            </div>
          </div>
        )
      }

      <form onSubmit={submitHandler}>
        <div className={s.inputWrapper}>
          {
            (isFocused || phoneInputValue !== '') && <div className={s.seven}>+ 7 </div>
          }

          <InputMask
            value={phoneInputValue}
            onChange={handleChange}
            mask="999 999 99-999"
            alwaysShowMask={false}
            maskChar={null}
            onFocus={handleFocus}
            onBlur={handleBlur}
            autoFocus
          >
            {(inputProps) => <input
              placeholder={placeholder}
              className={
                `${s.input} 
          ${(isFocused || phoneInputValue !== '') ? '' : s.unfocused}
          ${isInvalid ? s.redBorder : 's.unfocused'}
          `}
              {...inputProps}
              type="text"/>}
          </InputMask>
        </div>

        {
          showAccessError || showFailError && (
            <Button onClick={supportMessage} className={s.btn}>
              {
                <span>Написать в поддержку</span>
              }
            </Button>
          )
        }

        {
          !showAccessError && !showFailError && (
            <Button type="submit"  className={s.btn}>
              {
                phoneSending ? <MiniSpinner/> : <span>Войти</span>
              }
            </Button>
          )
        }
      </form>
    </div>
  );
};

export default InputPhone;

