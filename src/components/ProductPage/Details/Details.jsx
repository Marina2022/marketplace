import s from "./Details.module.scss";
import Colors from "@/components/ProductPage/Details/Colors/Colors.jsx";
import ChooseOption from "@/components/ProductPage/Details/ChooseOption/ChooseOption.jsx";
import BriefAbout from "@/components/ProductPage/Details/BriefAbout/BriefAbout.jsx";

const Details = ({product}) => {
  return (
    <div className={s.details}>
      <Colors />      
      <ChooseOption />
      <BriefAbout features={product.features} />     
      
    </div>
  );
};

export default Details;