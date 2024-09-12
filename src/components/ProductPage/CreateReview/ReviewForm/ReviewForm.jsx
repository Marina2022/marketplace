import s from './ReviewForm.module.scss';
import EditRating from "@/components/ProductPage/CreateReview/ReviewForm/EditRating/EditRating.jsx";
import {useState} from "react";
import TimePeriod from "@/components/ProductPage/CreateReview/ReviewForm/TimePeriod/TimePeriod.jsx";
import Button from "@/components/ui/Button/Button.jsx";

const ReviewForm = () => {
  
  const [rating, setRating] = useState(0)
  const [period, setPeriod] = useState(null)
  const [ratingError, setRatingError] = useState(false)
  
  const [advantages, setAdvantages] = useState('')
  const [disadvantages, setDisadvantages] = useState('')
  const [comments, setComments] = useState('')
  const handleSubmit = async(e)=>{
    e.preventDefault()
    if (rating === 0) {
      setRatingError(true)
      return
    }

    const body = {rating, period, advantages, disadvantages, comments}
    console.log(body)
  }
    
  return (
    <form className={s.form} onSubmit={handleSubmit}>

      <div className={s.starRow}>
        <h2 className={s.title}>Общая оценка </h2>
        <EditRating rating={rating} setRating={setRating} ratingError={ratingError} />        
      </div>


      <div className={s.row}>
        <h2 className={s.title}>Дополнительные
          сведения
        </h2>
        <div className={s.periodBlock}>
          <label className={s.subtitle}>Опыт использования</label>
          <TimePeriod period={period} setPeriod={setPeriod}/>
        </div>
      </div>

      <div className={s.row}>
        <h2 className={s.title}>Поделитесь мнением </h2>
        <div>
          <label htmlFor="advantages" className={s.subtitle}>Достоинства</label>
          <textarea
            className={s.textarea}
            placeholder="Укажите что вам понравилось"
            name="advantages"
            id="advantages"
            value={advantages}
            onChange={(e) => setAdvantages(e.target.value)}
          ></textarea>

          <label htmlFor="disadvantages" className={s.subtitle}>Недостатки</label>
          <textarea
            className={s.textarea}
            placeholder="Укажите, что  не понравилось"
            name="disadvantages"
            id="disadvantages"
            value={disadvantages}
            onChange={(e) => setDisadvantages(e.target.value)}
          ></textarea>

          <label htmlFor="comments" className={s.subtitle}>Комментарии</label>
          <textarea
            className={s.textarea}
            placeholder="Расскажите больше"
            name="comments"
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          ></textarea>

          


        </div>
      </div>


      <Button type="sumbit">Отправить&nbsp;отзыв</Button>


    </form>
  );
};

export default ReviewForm;