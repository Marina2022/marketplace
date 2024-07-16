import s from './ReviewAnswers.module.scss';
import ReviewAnswer
  from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/ReviewAnswers/ReviewAnswer/ReviewAnswer.jsx";
const ReviewAnswers = ({answers, productId}) => {
  return (
    <ul className={s.answers}>
      {
        answers.map((answer, i)=><ReviewAnswer key={i} answer={answer} productId={productId} />)        
      }
    </ul>
  );
};
export default ReviewAnswers;