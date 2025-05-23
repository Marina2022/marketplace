import s from './UniteProductBlock.module.scss';
import useHasVerticalScrollbar from "@/hooks/useHasVerticalScrollbar.js";
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const UniteProductBlock = ({checkedProducts, products}) => {

  let sum = 0

  products.forEach(product => {
    if (checkedProducts.includes(product.productVariantId) && product.linkedProducts && product.linkedProducts.length > 0) sum++
  })

  const hasScrollbar = useHasVerticalScrollbar()
  const navigate = useNavigate()
  const handleUnite = () => {
    const combineWithCard = sum > 0
        
    navigate('/lk/combine-products',
      {
        state: {
          combineWithCard,
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
      <Button onClick={handleUnite} className={s.uniteBtn}
              disabled={checkedProducts.length === 1 || sum > 1}>Объединить</Button>
    </div>
  );
};

export default UniteProductBlock;