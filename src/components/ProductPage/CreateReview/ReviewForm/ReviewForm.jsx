import s from './ReviewForm.module.scss';
import EditRating from "@/components/ProductPage/CreateReview/ReviewForm/EditRating/EditRating.jsx";
import {useState} from "react";
import TimePeriod from "@/components/ProductPage/CreateReview/ReviewForm/TimePeriod/TimePeriod.jsx";

const ReviewForm = () => {
  
  const [rating, setRating] = useState(1)
  const [period, setPeriod] = useState(null)
    
  return (
    <form className={s.form}>

      <div className={s.starRow}>
        <h2 className={s.title}>Общая оценка </h2>
        <EditRating rating={rating} setRating={setRating} />        
      </div>


      <div className={s.row}>
        <h2 className={s.title}>Дополнительные
          сведения
        </h2>
        <div>
          <h3 className={s.subtitle}>Опыт использования</h3>
          <TimePeriod period={period} setPeriod={setPeriod}/>
        </div>
      </div>

      <div className={s.row}>
        <h2 className={s.title}>Поделитесь мнением </h2>

        <div>
          <h3 className={s.subtitle}>Достоинства</h3>
          <p>sssd</p>
        </div>
      </div>


    </form>
  );
};

export default ReviewForm;