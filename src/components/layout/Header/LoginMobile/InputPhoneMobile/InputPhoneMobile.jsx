import axios from "@/api/axiosInstance.js";
import s from './InputPhoneMobile.module.scss';
import logo from "@/assets/img/header/logo.svg"
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

const InputPhoneMobile = ({setIsPopupOpen, setStep, phoneInputValue, setPhoneInputValue}) => {

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

            showErrorToast("Слишком много запросов",
              `Превышен лимит действий. Повторите примерно через  ${formatMinutes(retryAfter)}`, <TimeoutIcon />)

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
      <div className={s.topPart}>
        <img className={s.logo} src={logo} alt="logo"/>
        <button onClick={() => setIsPopupOpen(false)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.330758 0.331352C0.770106 -0.107882 1.48244 -0.107953 1.92175 0.331352L6.69334 5.10294L11.4663 0.329971C11.9056 -0.109326 12.6179 -0.109241 13.0573 0.329971C13.4966 0.769311 13.4966 1.48162 13.0573 1.92096L8.28433 6.69393L13.0587 11.4683C13.498 11.9076 13.4979 12.6199 13.0587 13.0593C12.6193 13.4986 11.907 13.4986 11.4677 13.0593L6.69334 8.28492L1.92037 13.0579C1.48103 13.4972 0.768717 13.4972 0.329377 13.0579C-0.109835 12.6185 -0.10992 11.9062 0.329377 11.4669L5.10235 6.69393L0.330758 1.92234C-0.108582 1.483 -0.108582 0.770692 0.330758 0.331352Z" fill="#3E5067"/>
          </svg>
        </button>
      </div>

      <h3 className={s.title}>Введите ваш номер телефона</h3>
      <p className={s.text}>Введите ваш номер телефона. Мы отправим код в СМС</p>

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

      <form>
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
            <Button type="submit"  className={s.btn} onClick={submitHandler} >
              {
                phoneSending ? <MiniSpinner/> : <span>Войти</span>
              }
            </Button>
          )
        }
      </form>
    </div>
  )
}

export default InputPhoneMobile;

