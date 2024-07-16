import s from './ReviewsHeaderComponent.module.scss';
import Rating from "@/components/ui/Rating/Rating.jsx";
import {getReviewsString} from "@/utils/reviews.js";
const ReviewsHeaderComponent = ({product}) => {
  return (
    <div className={s.wrapper}>
      <div className={s.title}>Отзывы</div>      
      <div className={s.headerDetails}>
        <div className={s.averageRating}>{product.reviewsRating}</div>        
        <div className={s.ratingWrapper}>
          <Rating rating={product.reviewsRating} gap={10} />
          <div>{getReviewsString(product.reviewsCount)}</div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsHeaderComponent;