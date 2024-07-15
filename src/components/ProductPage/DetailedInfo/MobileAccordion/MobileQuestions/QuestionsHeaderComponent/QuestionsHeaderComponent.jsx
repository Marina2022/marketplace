import s from './QuestionsHeaderComponent.module.scss';
import {getQuestionsString} from "@/utils/reviews.js";

const QuestionsHeaderComponent = ({product}) => {
  return (
    <div className={s.wrapper}>
      <span className={s.title}>Вопросы</span>
      <span className={s.quantity}>({getQuestionsString(product.questionCount)})</span>      
    </div>
  );
};

export default QuestionsHeaderComponent;