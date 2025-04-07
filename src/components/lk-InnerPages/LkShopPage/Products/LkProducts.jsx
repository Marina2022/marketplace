import s from './LkProducts.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getSecondFromTopTab, setSecondFromTopTab} from "@/store/lkShopSlice.js";
import LkProductsCards from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/LkProductsCards.jsx";

const LkProducts = () => {

  const secondFromTopTab = useSelector(getSecondFromTopTab)
  const dispatch = useDispatch()

  return (
    <>
      
    <div className={s.secondFromTopTabs}>      
      <div onClick={() => dispatch(setSecondFromTopTab(1))}
           className={secondFromTopTab === 1 ? s.activeSecondFromTopTab : s.secondFromTopTab}>Карточки товаров
      </div>
      <div
        onClick={() => dispatch(setSecondFromTopTab(2))}
        className={secondFromTopTab === 2 ? s.activeSecondFromTopTab : s.secondFromTopTab}>
        Управление товарами
      </div>

      <div
        onClick={() => dispatch(setSecondFromTopTab(3))}
        className={secondFromTopTab === 3 ? s.activeSecondFromTopTab : s.secondFromTopTab}>
        Доставка
      </div>
    </div>

      {
        secondFromTopTab === 1 && <LkProductsCards />
      }

      {
        secondFromTopTab === 2 && <div>Управление товарами</div>
      }

      {
        secondFromTopTab === 3 && <div>Доставка</div>
      }
    </>
    
  )
}

export default LkProducts;