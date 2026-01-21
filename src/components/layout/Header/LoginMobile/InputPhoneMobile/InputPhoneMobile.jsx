import axios from "@/api/axiosInstance.js";
import s from './InputPhoneMobile.module.scss';
import logo from "@/assets/img/header/logo.svg"
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import InputMask from 'react-input-mask';

const InputPhoneMobile = ({setIsPopupOpen, setStep, value, setValue}) => {

  const [placeholder, setPlaceholder] = useState('Телефон');
  const [isFocused, setIsFocused] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const handleFocus = () => {
    setPlaceholder('000 000-00-00');
    setIsFocused(true)
  };

  const handleBlur = () => {
    setPlaceholder('Телефон');
    setIsFocused(false)
  };
  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.startsWith('7') || inputValue.startsWith('8')) {
      inputValue = inputValue.slice(1);
    }

    if (inputValue.length > 10) {
      inputValue = inputValue.slice(0, 10);
    }

    setValue(inputValue);

    if (value.length === 10 && isInvalid) setIsInvalid(false)
  };

  const submitHandler = async (e) => {
    e.preventDefault()
    if (value.length < 10) {
      setIsInvalid(true)
      return
    } else {

      try {
        await axios.post('auth/generate', {phoneNumber: value})
        setStep(2)
      } catch (err) {
        console.log(err)
      }
    }
  }

  return (
    <div className={s.wrapper}>
      {/*<button onClick={() => setIsPopupOpen(false)} className={s.backBtn}><img src={backBtn} alt=""/></button>*/}
      <div className={s.topPart}>
        <img className={s.logo} src={logo} alt="logo"/>
        <button onClick={() => setIsPopupOpen(false)}>
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.330758 0.331352C0.770106 -0.107882 1.48244 -0.107953 1.92175 0.331352L6.69334 5.10294L11.4663 0.329971C11.9056 -0.109326 12.6179 -0.109241 13.0573 0.329971C13.4966 0.769311 13.4966 1.48162 13.0573 1.92096L8.28433 6.69393L13.0587 11.4683C13.498 11.9076 13.4979 12.6199 13.0587 13.0593C12.6193 13.4986 11.907 13.4986 11.4677 13.0593L6.69334 8.28492L1.92037 13.0579C1.48103 13.4972 0.768717 13.4972 0.329377 13.0579C-0.109835 12.6185 -0.10992 11.9062 0.329377 11.4669L5.10235 6.69393L0.330758 1.92234C-0.108582 1.483 -0.108582 0.770692 0.330758 0.331352Z" fill="#3E5067"/>
          </svg>
        </button>
      </div>

      <h3 className={s.title}>Введите ваш номер телефона</h3>
      <p className={s.text}>Введите ваш номер телефона. Мы отправим вам код по СМС</p>

      <form>
        <div className={s.inputWrapper}>
          {
            (isFocused || value !== '') && <div className={s.seven}>+ 7 </div>
          }

          <InputMask
            value={value}
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
          ${(isFocused || value !== '') ? '' : s.unfocused}
          ${isInvalid ? s.redBorder : 's.unfocused'}
          `}
              {...inputProps}
              type="text"/>}
          </InputMask>
        </div>

        <Button onClick={submitHandler} className={s.btn}>Получить код</Button>
      </form>
    </div>
  );
};

export default InputPhoneMobile;

