import s from "./Details.module.scss";
import Colors from "@/components/ProductPage/Details/Colors/Colors.jsx";
import ChooseOption from "@/components/ProductPage/Details/ChooseOption/ChooseOption.jsx";
import BriefAbout from "@/components/ProductPage/Details/BriefAbout/BriefAbout.jsx";


const Details = ({product, sku}) => {
  console.log(product)

  const optionsWithoutColor = product.optionTypes.filter(item => item.name !== 'color')

  // console.log('optionsWithoutColor = ', optionsWithoutColor)


  const colorOptionIsPresent = product.optionTypes.find(item => item.name === 'color')

  return (
    <div className={s.details}>
      {
        colorOptionIsPresent && <Colors options={product.options} sku={sku}/>
      }

      {
        optionsWithoutColor.map(option => <ChooseOption key={option.name} options={product.options} sku={sku} optionType={option} />)
      }


      <BriefAbout features={product.features}/>

    </div>
  );
};

export default Details;