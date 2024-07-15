import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import Reviews from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/Reviews.jsx";
import ReviewsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileReviews/ReviewsHeaderComponent/ReviewsHeaderComponent.jsx";

const MobileReviews = ({product, mobileReviewsTabIsOpen, setMobileReviewsTabIsOpen, reviewsRef}) => {
  return (
    <CollapsableTab 
      ClosedStateComponent={ReviewsHeaderComponent} 
      product={product} 
      tabIsOpen={mobileReviewsTabIsOpen} 
      setTabIsOpen={setMobileReviewsTabIsOpen} >
      <Reviews product={product} reviewsRef={reviewsRef}/>     
    </CollapsableTab>
  );
};

export default MobileReviews;