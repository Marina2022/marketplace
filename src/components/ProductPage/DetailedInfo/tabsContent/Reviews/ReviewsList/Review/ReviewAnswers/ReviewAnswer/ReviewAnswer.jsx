import s from './ReviewAnswer.module.scss';
import checkIcon from '@/assets/img/checkIcon.svg'
import ReviewsAnswerLikes
  from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/ReviewAnswers/ReviewAnswer/ReviewsAnswerLikes/ReviewsAnswerLikes.jsx";
const ReviewAnswer = ({answer, productId}) => {
  return (
    <li className={s.answer}>
      <div className={s.answerHeader}>
        <div className={s.name}>{answer.shopName}</div>
        {
          answer.responderType === 'company' && <img src={checkIcon} alt="company icon"/>
        }
        <div className={s.date}>{new Date(answer.createDate).toLocaleDateString()}</div>
      </div>
      <div className={s.text}>{answer.answer}</div>
      <ReviewsAnswerLikes answer={answer} productId={productId} />
    </li>
  );
};

export default ReviewAnswer;