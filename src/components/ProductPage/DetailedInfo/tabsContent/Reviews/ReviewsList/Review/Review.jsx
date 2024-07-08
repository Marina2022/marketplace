import s from './Review.module.scss';
import Rating from "@/components/ui/Rating/Rating.jsx";
import ReviewImages
  from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/ReviewImages/ReviewImages.jsx";
import CollapsableText from "@/components/ui/CollapsableText/CollapsableText.jsx";
import ReviewLikes
  from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/Review/ReviewLikes/ReviewLikes.jsx";

const Review = ({review}) => {
  return (
    <li className={s.reviewWrapper}>
      <div className={s.reviewHeader}>
        <div className={s.reviewerName}>{review.reviewerName}</div>
        <div className={s.rightHeaderPart}>
          <div className={s.reviewDate}>{new Date(review.createDate).toLocaleDateString()}</div>
          <Rating rating={review.reviewRating}/>
        </div>
      </div>

      {
        review.reviewImages.length > 0 && <ReviewImages images={review.reviewImages}/>
      }

      <h3 className={s.subtitle}>Опыт использования</h3>
      <div className={s.text}>{review.experience}</div>

      {
        review.advantages && (
          <>
            <h3 className={s.subtitle}>Достоинства</h3>
            <CollapsableText className={s.collapsableText} text={review.advantages} maxLength={268}/>
          </>
        )
      }
      

      {
        review.disadvantages && (
          <>
            <h3 className={s.subtitle}>Недостатки</h3>
            <CollapsableText className={s.collapsableText} text={review.disadvantages} maxLength={268}/>
          </>
        )
      }


      {
        review.comment && (
          <>
            <h3 className={s.subtitle}>Недостатки</h3>
            <CollapsableText className={s.collapsableText} text={review.comment} maxLength={268}/>
          </>
        )
      }

      <ReviewLikes likes={review.likes} dislikes={review.dislikes} review={review} />

    </li>
  );
};

export default Review;