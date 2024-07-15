import s from './AllCharacteristics.module.scss';
import CharsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/AllCharacteristics/CharsHeaderComponent/CharsHeaderComponent.jsx";
import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import Overview from "@/components/ProductPage/DetailedInfo/tabsContent/Overview/Overview.jsx";
import Characteristics from "@/components/ProductPage/DetailedInfo/tabsContent/Characteristics/Characteristics.jsx";
import MobileReviews from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileReviews/MobileReviews.jsx";
import MobileQuestions from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileQuestions/MobileQuestions.jsx";
import About from "@/components/ProductPage/DetailedInfo/tabsContent/About/About.jsx";

const AllCharacteristics = ({product}) => {
  return (
    <CollapsableTab ClosedStateComponent={CharsHeaderComponent} >      
      <Overview product={product} textSize={554} />
      <Characteristics product={product} />

      <MobileReviews product={product} />
      <MobileQuestions product={product} />

      {
        product.productVendor.isCompanyAboutShown && <About product={product}/>
      }
      
    </CollapsableTab>
  );
};

export default AllCharacteristics;