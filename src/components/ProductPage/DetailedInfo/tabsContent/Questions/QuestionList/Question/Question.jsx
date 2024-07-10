import s from './Question.module.scss';
import ReviewAnswers
  from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/ReviewAnswers/ReviewAnswers.jsx";
import QuestionAnswers
  from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/QuestionList/Question/QuestionAnswer/QuestionAnswers.jsx";

const Question = ({question, productId}) => {

  //productId - потом для запроса на добавление нового вопроса понадобится

  return (
    <li className={s.questionWrapper}>
      <div className={s.questionHeader}>
        <div className={s.name}>{question.senderName}</div>
        <div className={s.date}>{new Date(question.createDate).toLocaleDateString()}</div>
      </div>      
      <div className={s.text}>{question.questionText}</div>
      {
        question.questionAnswer.length > 0 && <QuestionAnswers answers={question.questionAnswer} />
      }
    </li>
  );
};

export default Question;