import s from './ReviewsList.module.scss';
import Review from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/Review.jsx";

const ReviewsList = ({reviews}) => {
  return (
    <ul>
      {
        reviews.map((review, i) => {
          return <Review key={i} review={review}/>
        })
      }
    </ul>
  );
};

export default ReviewsList;