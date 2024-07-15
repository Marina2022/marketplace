import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import Reviews from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/Reviews.jsx";
import ReviewsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileReviews/ReviewsHeaderComponent/ReviewsHeaderComponent.jsx";

const MobileReviews = ({product}) => {
  return (
    <CollapsableTab ClosedStateComponent={ReviewsHeaderComponent} product={product} >
      <Reviews product={product}/>     
    </CollapsableTab>
  );
};

export default MobileReviews;