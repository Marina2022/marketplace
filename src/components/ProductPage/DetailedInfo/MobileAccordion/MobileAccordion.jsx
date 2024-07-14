import s from './MobileAccordion.module.scss';
import AllCharacteristics
  from "@/components/ProductPage/DetailedInfo/MobileAccordion/AllCharacteristics/AllCharacteristics.jsx";


const MobileAccordion = ({product}) => {
 
  
  return (
    <div className={s.acc}>
      <AllCharacteristics product={product} />
    </div>
  );
};

export default MobileAccordion;