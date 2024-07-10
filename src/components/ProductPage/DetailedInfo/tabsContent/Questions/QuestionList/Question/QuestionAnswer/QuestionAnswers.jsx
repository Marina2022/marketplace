import s from './QuestionAnswers.module.scss';
import checkIcon from "@/assets/img/checkIcon.svg";

const QuestionAnswers = ({answers}) => {
  return (
    <ul className={s.answers}>
      {
        answers.map((answer, i) => {
          return <li key={i} className={s.answer}>
            <div className={s.answerHeader}>
              <div className={s.name}>{answer.answerFrom}</div>
              <img src={checkIcon} alt="company icon"/>
              

              <div className={s.date}>{new Date(answer.createDate).toLocaleDateString()}</div>
            </div>
            <div className={s.text}>{answer.answerText}</div>
          </li>
        })
      }
    </ul>
  );
};

export default QuestionAnswers;