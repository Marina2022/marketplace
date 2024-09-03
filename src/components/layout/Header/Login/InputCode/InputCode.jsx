import s from './InputCode.module.scss';
import backBtn from "@/assets/img/header/backArrow.svg";
import logo from "@/assets/img/header/logo.svg";
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import {formatPhone} from "@/utils/authDialog.js";
import axios from "@/api/axiosInstance.js";


const InputCode = ({setStep, phoneInputValue}) => {

  const [value, setValue] = useState('')

  const handleChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    if (inputValue.length > 4) return
    setValue(inputValue)
  }
  const submitHandler = async() => {
    console.log('code is', +value, ', phone is', phoneInputValue)
    
    try {
      const resp = await axios.post('auth/validate', {phoneNumber: phoneInputValue, code: value})

      console.log(resp.data)
      
    } catch(err) {
      console.log(err)
    }   
  }

  return (
    <div className={s.wrapper}>
      <button onClick={() => setStep(1)} className={s.backBtn}><img src={backBtn} alt=""/></button>
      <img className={s.logo} src={logo} alt="logo"/>
      <h3 className={s.title}>Введите код</h3>
      <h3 className={s.text}>Отправили код подтверждения на номер <br/> +7 {formatPhone(phoneInputValue)}</h3>

      <input
        type="password"
        value={value}
        onChange={handleChange}
        placeholder='Код'
        className={s.input}
      />
      

      <Button onClick={submitHandler} className={s.btn}>Войти</Button>
    </div>
  );
};

export default InputCode;