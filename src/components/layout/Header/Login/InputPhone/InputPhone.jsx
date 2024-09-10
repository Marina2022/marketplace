import axios from "@/api/axiosInstance.js";
import s from './InputPhone.module.scss';
import logo from "@/assets/img/header/logo.svg"
import backBtn from "@/assets/img/header/backArrow.svg"
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import InputMask from 'react-input-mask';

const InputPhone = ({setIsPopupOpen, setStep, value, setValue}) => {
  
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
        
    if(inputValue.length > 10) {      
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
      <button onClick={() => setIsPopupOpen(false)} className={s.backBtn}><img src={backBtn} alt=""/></button>
      <img className={s.logo} src={logo} alt="logo"/>
      <h3 className={s.title}>Введите номер телефона</h3>
      <h3 className={s.text}>Введите номер телефона. Мы отправим код
        в СМС</h3>

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

        <Button onClick={submitHandler} className={s.btn}>Войти</Button>
      </form>
    </div>
  );
};

export default InputPhone;

