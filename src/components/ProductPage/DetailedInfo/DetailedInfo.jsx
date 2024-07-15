import s from './DetailedInfo.module.scss';
import TabsMenu from "@/components/ProductPage/DetailedInfo/TabsMenu/TabsMenu.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobileAccordion from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileAccordion.jsx";

const DetailedInfo = ({
                        product, currentTab, setCurrentTab, 
                        mobileAllTabIsOpen, setMobileAllTabisOpen, mobileReviewsTabIsOpen,
                        setMobileReviewsTabIsOpen, mobileQuestionsTabIsOpen, setMobileQuestionsTabIsOpen,
                        reviewsRef, questionsRef
                      }) => {

  const isMobile = useMobileScreen()
  return (
    <div className={s.detailedInfo}>
      {!isMobile &&
        <TabsMenu product={product} currentTab={currentTab} setCurrentTab={setCurrentTab} />}
      
      {isMobile && <MobileAccordion 
        product={product}        
        mobileAllTabIsOpen={mobileAllTabIsOpen}
        setMobileAllTabisOpen={setMobileAllTabisOpen}
        mobileReviewsTabIsOpen={mobileReviewsTabIsOpen}
        setMobileReviewsTabIsOpen={setMobileReviewsTabIsOpen}
        mobileQuestionsTabIsOpen={mobileQuestionsTabIsOpen}
        setMobileQuestionsTabIsOpen={setMobileQuestionsTabIsOpen}
        reviewsRef = {reviewsRef} questionsRef={questionsRef}
      />}
    </div>
  );
};

export default DetailedInfo;