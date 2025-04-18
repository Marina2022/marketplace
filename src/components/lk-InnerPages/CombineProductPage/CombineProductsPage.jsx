import s from './CombineProductsPage.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import CombineWithCard from "@/components/lk-InnerPages/CombineProductPage/CombineWithCard/CombineWithCard.jsx";
import CombineSingleProducts
  from "@/components/lk-InnerPages/CombineProductPage/CombineSingleProducts/CombineSingleProducts.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const CombineProductsPage = () => {

  const location = useLocation();  
  const navigate = useNavigate()
  
  const [checkedProducts, setCheckedProducts] = useState(null)
  const [combineWithCard, setCombineWithCard] = useState(false)

  useEffect(() => {
    
  
    if (!location.state) {
      navigate('/lk/shop')      
    } else {
      const {combineWithCard, checkedProducts} = location.state;
      setCheckedProducts(checkedProducts)      
      setCombineWithCard(combineWithCard)
    }

    // для теста:
    // setCheckedProducts(["0dc76b67-165c-4491-8637-11ab5ae2a80c", "ae936814-0b64-4fff-9042-d618a11f6d8c"])
    // setCombineWithCard(false)
  }, []);
    
  const handleCancel = () => {
    navigate('/lk/shop')
  }
  
  if (!checkedProducts) return <Spinner />
  
  return (
    <div className={s.combineWrapper}>
      <button type="button" className={s.backLink} onClick={handleCancel}>
        <svg className={s.backArrow} width="6" height="11" viewBox="0 0 6 11" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path d="M5 10L1 5.5L5 1" stroke="#658092"/>
        </svg>
        <span className={s.backLinkText}>Назад к списку товаров</span>
      </button>

      {
        !combineWithCard && <CombineSingleProducts checkedProducts={checkedProducts} setCheckedProducts={setCheckedProducts} />
      }

      {
        combineWithCard && <CombineWithCard/>
      }


    </div>
  );
};

export default CombineProductsPage;