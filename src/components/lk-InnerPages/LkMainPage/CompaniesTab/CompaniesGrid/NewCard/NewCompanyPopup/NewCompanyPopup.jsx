import s from './NewCompanyPopup.module.scss';
import Popup from "@/components/ui/Popup/Popup.jsx";
import {useState} from "react";

const NewCompanyPopup = ({setPopupIsOpen}) => {

  const handleInnChange = (e) => {
    let inputValue = e.target.value.replace(/\D/g, '');
    setInnValue(inputValue)
  }

  const enterHandler = (e) => {
    if (e.key === 'Enter') {
      console.log('Отправляем ', innValue)
    }
  }

  const handleBlur = () => {
    console.log('Отправляем ', innValue)    
  }


  const [innValue, setInnValue] = useState('')

  return (
    <Popup setIsPopupOpen={setPopupIsOpen} popupClassName={s.popup} withCloseBtn={true}>

      <h3 className={s.title}>Добавить организацию</h3>
      <p className={s.label}>ИНН</p>
      <p className={s.miniText}>Введите ИНН организации, остальные данные будут взяты из базы</p>
      <input value={innValue} onBlur={handleBlur} onKeyDown={enterHandler} onChange={handleInnChange} autoFocus
             className={s.input} type="text"/>

    </Popup>
  );
};

export default NewCompanyPopup;