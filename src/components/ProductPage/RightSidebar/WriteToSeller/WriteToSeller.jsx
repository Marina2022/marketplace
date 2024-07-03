import s from './WriteToSeller.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import Button from "@/components/ui/Button/Button.jsx";

const WriteToSeller = ({seller}) => {
  return (
    <div className={s.writeToSeller}>
      <h3 className={s.title}>Написать продавцу</h3>
      
      <div className={s.sellerDesc}>
        <img className={s.avatar} src={`${BASE_URL}${seller.contactImageUrl}`} alt="seller avatar"/>
        <div>
          <div className={s.name}>{seller.shopContact}</div>
          <div className={s.position}>{seller.contactPersonPosition}</div>          
        </div>        
      </div>
      <Button className={s.btn}>Написать&nbsp;сейчас</Button>
    </div>
  );
};

export default WriteToSeller;