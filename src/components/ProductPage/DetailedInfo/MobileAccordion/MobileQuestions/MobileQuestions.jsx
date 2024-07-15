import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import QuestionsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileQuestions/QuestionsHeaderComponent/QuestionsHeaderComponent.jsx";
import Questions from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/Questions.jsx";

const MobileQuestions = ({product}) => {
  return (
    <CollapsableTab ClosedStateComponent={QuestionsHeaderComponent} product={product}>
      <Questions product={product}/>
    </CollapsableTab>
  );
};

export default MobileQuestions;