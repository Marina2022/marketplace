import s from "./Details.module.scss";
import Colors from "@/components/ProductPage/Details/Colors/Colors.jsx";
import ChooseOption from "@/components/ProductPage/Details/ChooseOption/ChooseOption.jsx";
import BriefAbout from "@/components/ProductPage/Details/BriefAbout/BriefAbout.jsx";

const Details = ({product, sku, handleOptionClick}) => {
  const optionsWithoutColor = product.optionTypes.filter(item => item.name !== 'color') 
  const colorOptionIsPresent = product.optionTypes.find(item => item.name === 'color')
  
  return (
    <div className={s.details}>
      {
        colorOptionIsPresent && <Colors options={[...product.options]} sku={sku} handleOptionClick={handleOptionClick} />
      }

      {
        optionsWithoutColor.map(option => <ChooseOption key={option.name} options={[...product.options]} sku={sku} optionType={option} handleOptionClick={handleOptionClick} />)
      }
      <BriefAbout features={product.features}/>
    </div>
  );
};

export default Details;