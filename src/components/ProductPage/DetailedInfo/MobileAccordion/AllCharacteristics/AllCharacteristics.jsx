import CharsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/AllCharacteristics/CharsHeaderComponent/CharsHeaderComponent.jsx";
import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import Overview from "@/components/ProductPage/DetailedInfo/tabsContent/Overview/Overview.jsx";
import Characteristics from "@/components/ProductPage/DetailedInfo/tabsContent/Characteristics/Characteristics.jsx";
import MobileReviews from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileReviews/MobileReviews.jsx";
import MobileQuestions from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileQuestions/MobileQuestions.jsx";
import About from "@/components/ProductPage/DetailedInfo/tabsContent/About/About.jsx";

const AllCharacteristics = ({product, mobileAllTabIsOpen, setMobileAllTabisOpen, mobileReviewsTabIsOpen,
                              setMobileReviewsTabIsOpen, mobileQuestionsTabIsOpen, setMobileQuestionsTabIsOpen,
                              reviewsRef, questionsRef
                            }) => {

  return (
    <CollapsableTab 
      ClosedStateComponent={CharsHeaderComponent} 
                    setTabIsOpen={setMobileAllTabisOpen} tabIsOpen={mobileAllTabIsOpen} ifAllTab={true}
      setMobileReviewsTabIsOpen={setMobileReviewsTabIsOpen} setMobileQuestionsTabIsOpen={setMobileQuestionsTabIsOpen}
    >      
      <Overview product={product} textSize={554} />
      <Characteristics product={product} />

      <MobileReviews product={product} mobileReviewsTabIsOpen={mobileReviewsTabIsOpen} setMobileReviewsTabIsOpen={setMobileReviewsTabIsOpen} reviewsRef={reviewsRef} />
      <MobileQuestions product={product} mobileQuestionsTabIsOpen={mobileQuestionsTabIsOpen} setMobileQuestionsTabIsOpen={setMobileQuestionsTabIsOpen} questionsRef={questionsRef} />

      {
        product.productVendor.isCompanyAboutShown && <About product={product}/>
      }
      
    </CollapsableTab>
  );
};

export default AllCharacteristics;