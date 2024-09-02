import s from './InputPhone.module.scss';
import logo from "@/assets/img/header/logo.svg"
import backBtn from "@/assets/img/header/backArrow.svg"
import Button from "@/components/ui/Button/Button.jsx";

const InputPhone = ({setIsPopupOpen}) => {
  return (
    <div className={s.wrapper}>
      <button onClick={()=>setIsPopupOpen(false)} className={s.backBtn}><img src={backBtn} alt=""/></button>
      <img className={s.logo} src={logo} alt="logo"/> 
      <h3 className={s.title}>Введите номер телефона</h3>
      <h3 className={s.text}>Введите номер телефона. Мы отправим код
        в СМС</h3>
      <input className={s.input} type="text" placeholder="Телефон"/>
      <Button className={s.btn}>Войти</Button>
    </div>
  );
};

export default InputPhone;