import s from './UniteProductBlock.module.scss';
import useHasVerticalScrollbar from "@/hooks/useHasVerticalScrollbar.js";
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const UniteProductBlock = ({checkedProducts, products}) => {

  const hasCheckedWithLinkedProducts = (products, checkedProducts) => {
    return products.some(product =>
      checkedProducts.includes(product.productVariantId) && product.linkedProducts.length > 0
    );
  };

  const hasScrollbar = useHasVerticalScrollbar()
  
  const navigate = useNavigate()
  const handleUnite = ()=>{
    navigate('/lk/combine-products', 
      {
        state: {
          combineWithCard: hasCheckedWithLinkedProducts(products, checkedProducts),
          checkedProducts
        }
      })
  }

  return (
    <div className={`${s.uniteProductBlock} ${hasScrollbar ? s.withOffset : ''}`}>
      <div className={s.selectedText}>
        Выбрано:
        <span className={s.number}>{checkedProducts.length}</span>
      </div>
      <Button onClick={handleUnite} className={s.uniteBtn} disabled={checkedProducts.length === 1}>Объединить</Button>
    </div>
  );
};

export default UniteProductBlock;