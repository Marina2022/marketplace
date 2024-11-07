import s from './AdditionalMobile.module.scss';
import ContactInfo from "@/components/OrderPage/MainPartOrderDetails/ContactInfo/ContactInfo.jsx";

const AdditionalMobile = ({order, setAdditionalMobileOpened}) => {
  return (
    <div className={s.mainWrapper}>
      <div onClick={() => setAdditionalMobileOpened(false)} className={s.returnBack}>
        <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 9.5L1 5L5 0.5" stroke="#658092"/>
        </svg>
        <span>Вернуться к заказу</span>
      </div>      
      <ContactInfo order={order} mobile={true} />      
    </div>
  );
};

export default AdditionalMobile;