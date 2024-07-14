import s from './ProductHeader.module.scss';
import star from '@/assets/img/star.svg'
import {getQuestionsString, getReviewsString} from "@/utils/reviews.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const ProductHeader = ({product}) => {
  const isMobile = useMobileScreen()

  return (    
      <div className={s.header}>
        <h1 className={s.title}>{product.productName}</h1>
        <div className={s.info}>
          <div className={s.rating}>
            <img className={s.star} src={star} alt="star"/>
            {
              product.reviewsRating
            }
          </div>
          <div>

            {
              isMobile ?
                <span>(
                  {
                    getReviewsString(product.reviewsCount)
                  }
                  )</span>
                :
                getReviewsString(product.reviewsCount)}
          </div>
          <div className={s.questions}>
            {getQuestionsString(product.questionCount)}
          </div>
        </div>
      </div>    
  );
};

export default ProductHeader;