import s from './NewCard.module.scss';
import bigPlus from '@/assets/img/lk/lk-main/big-plus.svg'
import {useState} from "react";
import NewCompanyPopup
  from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/NewCard/NewCompanyPopup/NewCompanyPopup.jsx";

const NewCard = () => {

  const [popupIsOpen, setPopupIsOpen] = useState(false)

  return (

    <>
      <li onClick={() => setPopupIsOpen(true)} className={s.newCard}>
        <img src={bigPlus} alt=""/>
        <div className={s.cornerOne}></div>
        <div className={s.cornerTwo}></div>
        <div className={s.cornerThree}></div>
        <div className={s.cornerFour}></div>
      </li>

      {
        popupIsOpen && <NewCompanyPopup setPopupIsOpen={setPopupIsOpen} />
      }
      

    </>
  );
};

export default NewCard;