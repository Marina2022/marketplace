import s from './SavedCarts.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import {
  getSavedCarts,
  getSavedCartsStatus,
  loadSavedCarts,
  loadSavedCartsCheckout,
  restoreSaved
} from "@/store/cartSlice.js";
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import SavedCartsCheckout from "@/components/CartPage/SavedCarts/SavedCartsCheckout/SavedCartsCheckout.jsx";
import ChooseDeleteSavedCarts from "@/components/CartPage/SavedCarts/ChooseDeleteSavedCarts/ChooseDeleteSavedCarts.jsx";
import SavedCartItem from "@/components/CartPage/SavedCarts/SavedCartItem/SavedCartItem.jsx";

const SavedCarts = ({setCurrentTab}) => {

  const dispatch = useDispatch()
  const loadSavedCartsStatus = useSelector(getSavedCartsStatus)
  console.log({loadSavedCartsStatus})
  
  const [checkedItems, setCheckedItems] = useState([])
  const cartIds = checkedItems.map(item => ({cartId: item}))


  useEffect(() => {
    dispatch(loadSavedCarts())
  }, []);

  useEffect(() => {    
    dispatch(loadSavedCartsCheckout({cartIds}))
  }, [checkedItems]);

  const savedCarts = useSelector(getSavedCarts)
  console.log('savedCarts', savedCarts)

  const submitHandler = ()=>{    
    dispatch(restoreSaved({cartIds}))
    setCurrentTab("currentCart")
  }

  if (!savedCarts) return <></>

  
  if (loadSavedCartsStatus === 'loading') return 'Loading...'

  if (savedCarts.length === 0 && loadSavedCartsStatus !== 'loading') {
    return <div className={s.emptyPage}>
      <h2 className={s.emptyPageTitle}>Здесь пусто :(</h2>
      <p className={s.emptyPageText}>Вы не сохранили ни одной корзины!</p>     
    </div>
  }

  return (
    savedCarts && savedCarts.length > 0 && <div>
      <div className={s.headerWrapper}>        
          <h1 className={s.mainTitle}>Сохраненные корзины</h1>        
      </div>

      <div className={s.mainWrapper}>
        <div className={s.cartWrapper}>

          <ChooseDeleteSavedCarts checkedItems={checkedItems} setCheckedItems={setCheckedItems}
                                  savedCarts={savedCarts}/>
          <h2 className={s.subtitle}>Ваши товары</h2>
          {
            savedCarts.map(savedCart => <SavedCartItem key={savedCart.cartId} savedCart={savedCart}
                                                       checkedItems={checkedItems} setCheckedItems={setCheckedItems}/>)
          }


        </div>
        <div className={s.rightPartWrapper}>

          <SavedCartsCheckout submitHandler={submitHandler}/>

        </div>
      </div>
    </div>
  );
}

export default SavedCarts;