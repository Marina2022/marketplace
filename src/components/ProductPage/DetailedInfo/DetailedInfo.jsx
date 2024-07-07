import s from './DetailedInfo.module.scss';
import TabsMenu from "@/components/ProductPage/DetailedInfo/TabsMenu/TabsMenu.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobileAccordion from "@/components/ProductPage/DetailedInfo/MobileAccordion/MobileAccordion.jsx";

const DetailedInfo = ({product}) => {

  const isMobile = useMobileScreen()
  return (
    <div className={s.detailedInfo}>
      {!isMobile && <TabsMenu product={product}/>}
      {isMobile && <MobileAccordion product={product}/>}
    </div>
  );
};

export default DetailedInfo;