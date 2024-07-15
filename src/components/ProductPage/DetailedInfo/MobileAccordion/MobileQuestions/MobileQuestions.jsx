import CollapsableTab from "@/components/ProductPage/DetailedInfo/MobileAccordion/CollapsableTab/CollapsableTab.jsx";
import QuestionsHeaderComponent
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileQuestions/QuestionsHeaderComponent/QuestionsHeaderComponent.jsx";
import Questions from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/Questions.jsx";

const MobileQuestions = ({product, mobileQuestionsTabIsOpen, setMobileQuestionsTabIsOpen, questionsRef}) => {
  return (
    <CollapsableTab ClosedStateComponent={QuestionsHeaderComponent} product={product} tabIsOpen={mobileQuestionsTabIsOpen} setTabIsOpen={setMobileQuestionsTabIsOpen}>
      <Questions product={product} questionsRef={questionsRef}/>
    </CollapsableTab>
  );
};

export default MobileQuestions;