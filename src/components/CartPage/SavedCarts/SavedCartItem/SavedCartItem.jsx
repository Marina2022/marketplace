import s from './SavedCartItem.module.scss';
import {useState} from "react";
import dropdown from '@/assets/img/cart/dropdown.svg'
import dropdownOpen from '@/assets/img/cart/dropdownOpen.svg'
import {getProductQuantityString} from "@/utils/cart.js";
import {BASE_URL} from "@/consts/baseURL.js";
import ProductCardInSavedCart from "@/components/CartPage/SavedCarts/ProductCardInSavedCart/ProductCardInSavedCart.jsx";

const SavedCartItem = ({savedCart, checkedItems, setCheckedItems}) => {

  console.log('checkedItems = ', checkedItems)
  const isSelected = checkedItems.find(item=>item === savedCart.cartId)
  const setIsSelected = () => {
    if (isSelected) {
      setCheckedItems(checkedItems.filter(item=>item !==savedCart.cartId))
    } else {
      const newCheckedItems = checkedItems.slice()
      newCheckedItems.push(savedCart.cartId)      
      setCheckedItems(newCheckedItems)
    }
  }
  
  const [isOpen, setIsOpen] = useState(false)

  const date = new Date(savedCart.createDate)
  const formattedDate = `${date.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })}`;

  
  
  return (
    <div className={s.wrapper}>
      <div className={s.savedCartItem}>

        <div className={s.namePriceBlock}>
          <div onClick={() => setIsSelected()} className={s.chooseAll}>
            {
              !isSelected &&
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.6" y="1.1" width="14.8" height="14.8" stroke="#AAB7BF" strokeWidth="1.2"/>
              </svg>
            }

            {
              isSelected &&
              <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="0.5" width="16" height="16" fill="#E32636"/>
                <path
                  d="M6.5775 12.1675C6.3775 12.1675 6.1875 12.0875 6.0475 11.9475L3.2175 9.1175C2.9275 8.8275 2.9275 8.3475 3.2175 8.0575C3.5075 7.7675 3.9875 7.7675 4.2775 8.0575L6.5775 10.3575L11.7175 5.2175C12.0075 4.9275 12.4875 4.9275 12.7775 5.2175C13.0675 5.5075 13.0675 5.9875 12.7775 6.2775L7.1075 11.9475C6.9675 12.0875 6.7775 12.1675 6.5775 12.1675Z"
                  fill="white"/>
              </svg>
            }
          </div>

          <div className={s.nameBlock}>
            <div className={s.name}>Корзина №{savedCart.cartNumber}</div>
            <div className={s.date}>от {formattedDate}</div>
          </div>
          <div className={s.price}>{savedCart.cartPrice.toLocaleString()} ₽</div>
        </div>

        <div className={s.pictureDropdownBlock}>
          <div className={s.picturesAndMore}>

            <ul className={s.pictureList}>
              {
                savedCart.shortCartItemImagesPreview.map((image, i)=> <img key={i} className={s.image} src={`${BASE_URL}${image.imageUrl}`} alt=""/>)
              }
              
            </ul>

            {
              savedCart.hiddenItemImagesCount > 0 && !isOpen && <div onClick={()=>setIsOpen(prev=>!prev)} className={s.oneMore}>еще {getProductQuantityString(savedCart.hiddenItemImagesCount)}</div>
            }

          </div>

          <button onClick={() => setIsOpen(prev => !prev)}>
            <img src={isOpen ? dropdownOpen : dropdown} alt="dropdown"/>
          </button>
        </div>

      </div>
      {
        isOpen && <ul className={s.productList}>
          {
            savedCart.cartItems.map((product)=><ProductCardInSavedCart key={product.cartItemId} product={product} />)
          }
            
        </ul>
      }
    </div>


  );
};

export default SavedCartItem;