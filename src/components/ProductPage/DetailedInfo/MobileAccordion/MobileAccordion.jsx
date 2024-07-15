import s from './MobileAccordion.module.scss';
import AllCharacteristics
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/AllCharacteristics/AllCharacteristics.jsx";

const MobileAccordion = ({product, mobileAllTabIsOpen, setMobileAllTabisOpen, mobileReviewsTabIsOpen,
                           setMobileReviewsTabIsOpen, mobileQuestionsTabIsOpen, setMobileQuestionsTabIsOpen,
                           reviewsRef, questionsRef
  }) => {
  
  return (
    <div className={s.acc}>
      <AllCharacteristics 
        product={product}
        mobileAllTabIsOpen={mobileAllTabIsOpen}
        setMobileAllTabisOpen={setMobileAllTabisOpen}
        mobileReviewsTabIsOpen={mobileReviewsTabIsOpen}
        setMobileReviewsTabIsOpen={setMobileReviewsTabIsOpen}
        mobileQuestionsTabIsOpen={mobileQuestionsTabIsOpen}
        setMobileQuestionsTabIsOpen={setMobileQuestionsTabIsOpen}
        reviewsRef = {reviewsRef} questionsRef={questionsRef}
      />
    </div>
  );
};

export default MobileAccordion;