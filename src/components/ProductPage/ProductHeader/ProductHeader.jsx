import s from './ProductHeader.module.scss';
import star from '@/assets/img/star.svg'
import {getQuestionsString, getReviewsString} from "@/utils/reviews.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const ProductHeader = ({
                         product,
                         setCurrentTab,
                         setMobileAllTabisOpen,
                         setMobileReviewsTabIsOpen,
                         setMobileQuestionsTabIsOpen,
                         reviewsRef, questionsRef  
                       }) => {
  const isMobile = useMobileScreen()
  const noRatingClickHandler = () => {
    if (window.innerWidth > 960) {
      window.scrollTo({
        top: 400,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      setMobileAllTabisOpen(true)
      setMobileReviewsTabIsOpen(true)     
      
      if (reviewsRef.current) {
        reviewsRef.current.scrollIntoView({behavior: "smooth"})
      }
    }
    setCurrentTab(2)
  }
  const noQuestionsClickHandler = () => {
    if (window.innerWidth > 960) {
      window.scrollTo({
        top: 400,
        left: 0,
        behavior: 'smooth'
      });
    } else {
      setMobileAllTabisOpen(true)
      setMobileQuestionsTabIsOpen(true)

      if (questionsRef.current) {
        questionsRef.current.scrollIntoView({behavior: "smooth"})
      }      
    }
    setCurrentTab(3)
  }

  return (
    <div className={s.header}>
      <h1 className={s.title}>{product.productName}</h1>
      <div className={s.info}>
        {
          product.reviewsCount > 0 && <div className={s.rating}>
            <img className={s.star} src={star} alt="star"/>
            {
              product.reviewsRating
            }
          </div>
        }
        {
          product.reviewsCount > 0 && <div>
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
        }

        {/*нет рейтинга*/}
        {
          product.reviewsCount == 0 && <div onClick={noRatingClickHandler} className={s.noRating}>Нет рейтинга</div>
        }

        {
          product.questionCount && <div className={s.questions}>
            {getQuestionsString(product.questionCount)}
          </div>
        }

        {
          !product.questionCount && <div onClick={noQuestionsClickHandler} className={s.noRating}>Задать вопрос</div>
        }
      </div>
    </div>
  );
};

export default ProductHeader;