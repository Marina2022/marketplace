import s from './ProductCardRating.module.scss';
import Rating from "@/components/ui/Rating/Rating.jsx";
import RatingYellow from "@/components/ui/RatingYellow/RatingYellow.jsx";
import {getMarksString} from "@/utils/reviews.js";

const ProductCardRating = ({rating, reviewsCount}) => {  

  if (!rating) return <div className={s.ratingBlock}>
    <span className={s.noRating}>Нет рейтинга</span>
  </div>

  return (
    <div className={s.ratingBlock}>
      <span className={s.number}>
        {rating}
      </span>
      <RatingYellow rating={rating}/>
      <span className={s.marks}>({getMarksString(reviewsCount)})</span>
    </div>
  );
};

export default ProductCardRating;