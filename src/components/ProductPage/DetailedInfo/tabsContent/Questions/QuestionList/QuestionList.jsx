import Review from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/Review.jsx";
import Question from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/QuestionList/Question/Question.jsx";

const QuestionList = ({questions, productId }) => {
  return (
    <ul>
      {
        questions.map((question, i) => {
          return <Question key={i} question={question} productId={productId}/>
        })
      }
    </ul>
  );
};

export default QuestionList;