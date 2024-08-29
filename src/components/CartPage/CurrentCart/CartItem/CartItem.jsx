import s from './CartItem.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import heartBtn from '@/assets/img/cart/cart-card/heart.svg'
import heartActiveBtn from '@/assets/img/cart/cart-card/heart-active.svg'
import trashBtn from '@/assets/img/cart/cart-card/trash.svg'
import {useDispatch, useSelector} from "react-redux";
import {addToCart, deleteCartItem, sendCheckbox} from "@/store/cartSlice.js";
import {useEffect, useState} from "react";
import {useDebounce} from '@uidotdev/usehooks';
import {Link} from "react-router-dom";
import {getFavs, updateFavs} from "@/store/favSlice.js";
import {getIsAuthenticated} from "@/store/userSlice.js";

const CartItem = ({cartItem}) => {

  const [currentQuantity, setCurrentQuantity] = useState(cartItem.quantity)
  const [inputValue, setInputValue] = useState(cartItem.quantity)
  const debouncedQuantity = useDebounce(currentQuantity, 400);

  useEffect(() => {
    if (debouncedQuantity !== cartItem.quantity) {
      dispatch(addToCart({
        productVriantId: cartItem.productVariantId,
        count: debouncedQuantity,
        cartItemId: cartItem.cartItemId,        
        item: cartItem
      }))
    }
  }, [debouncedQuantity]);

  useEffect(() => {
    if (currentQuantity < 1) setCurrentQuantity(1)
    setInputValue(currentQuantity)
  }, [currentQuantity])

  useEffect(() => {
    setCurrentQuantity(cartItem.quantity)
  }, [cartItem.quantity])

  const dispatch = useDispatch()
  const chooseItemHandler = () => {
    if (cartItem.inventoryLevel === 0) return
    dispatch(sendCheckbox({cartItemId: cartItem.cartItemId, select: cartItem.checked ? "unselect" : "select"}))
  }

  const isSelected = cartItem.checked
  const plusHandler = () => {
    if (currentQuantity >= 999) return
    setCurrentQuantity(prev => +prev + 1)
  }
  const minusHandler = () => {
    setCurrentQuantity(prev => +prev - 1)
  }
  const inputChangeHandler = (e) => {
    setInputValue(+e.target.value.replace(/\D/g, ''))
  }
  const inputBlurHandler = () => {
    if (cartItem.inventoryLevel <= inputValue) {
      setCurrentQuantity(cartItem.inventoryLevel)
      setInputValue(cartItem.inventoryLevel)
    } else {
      setCurrentQuantity(inputValue)
    }
  }
  const inputEnterHandler = (e) => {
    if (e.key === 'Enter') {
      if (cartItem.inventoryLevel <= inputValue) {
        setCurrentQuantity(cartItem.inventoryLevel)
        setInputValue(cartItem.inventoryLevel)
      } else {
        setCurrentQuantity(inputValue)
      }
    }
  }
  const deleteItemHandler = () => {
    dispatch(deleteCartItem({cartItemId: cartItem.cartItemId}))
  }

  const isAuthenticated = useSelector(getIsAuthenticated)
  const favs = useSelector(getFavs)


  const [isFavourite, setIsFavourite] = useState(false)
  
  useEffect(()=>{
    if (isAuthenticated) {
      setIsFavourite(cartItem.isFavourite)
    } else {
      if (favs) {
        setIsFavourite(favs.find(item => item.productVariantId === cartItem.productVariantId))
      }
    }
    
  }, [isAuthenticated, favs])
  
  
  const onFavClick = () => {
    if (isFavourite) {
      dispatch(updateFavs({updateType: 'remove', productVariantId: cartItem.productVariantId, product: cartItem}))
    } else {
      dispatch(updateFavs({updateType: 'add', productVariantId: cartItem.productVariantId, product: cartItem}))
    }
    setIsFavourite(prev => !prev)
  }

  let linkURL

  if (cartItem.sku) {
    linkURL = `/product/${cartItem.productHandle}?sku=${cartItem.sku}`
  } else {
    linkURL = `/product/${cartItem.productHandle}`
  }

  return (
    <div className={s.cartItem}>
      <div className={s.cartItemCheck} onClick={chooseItemHandler}>
        {
          !isSelected &&
          <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="0.6" y="1.1" width="14.8" height="14.8"
                  stroke={cartItem.inventoryLevel === 0 ? "#DDE2E5" : "#AAB7BF"}
                  strokeWidth="1.2"/>
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
      <img className={s.img} src={`${BASE_URL}${cartItem.productImageUrl}`} alt="product"/>
      <div className={s.cardMainContent}>
        <div className={s.nameBlock}>
          {/*<Link to={`/product/${cartItem.productHandle}?sku=${ cartItem.sku}`} className={s.name}>{cartItem.productName}</Link>*/}
          <Link to={linkURL} className={s.name}>{cartItem.productName}</Link>
          {
            cartItem.inventoryLevel === 0 && <div className={s.noInStock}>Нет в наличии</div>
          }
          <div className={s.seller}>
            <span className={s.sellerLabel}>Продавец:</span>
            <span className={s.sellerValue}>{cartItem.seller}</span>
          </div>
        </div>

        {
          cartItem.inventoryLevel > 0 && cartItem.inventoryLevel < 3 &&
          <div className={s.smallStockDesktop}>Осталось мало</div>
        }

        <div className={s.actionBlock}>
          <div className={s.buttonsBlock}>
            <button onClick={minusHandler} className={s.minusBtn}
                    disabled={currentQuantity <= 1}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="#3E5067" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M11.9199 23.25C5.99992 23.25 1.16992 18.43 1.16992 12.5C1.16992 6.57 5.99992 1.75 11.9199 1.75C17.8399 1.75 22.6699 6.57 22.6699 12.5C22.6699 18.43 17.8499 23.25 11.9199 23.25ZM11.9199 3.25C6.81992 3.25 2.66992 7.4 2.66992 12.5C2.66992 17.6 6.81992 21.75 11.9199 21.75C17.0199 21.75 21.1699 17.6 21.1699 12.5C21.1699 7.4 17.0199 3.25 11.9199 3.25Z"
                />
                <path
                  d="M15.9199 13.25H7.91992C7.50992 13.25 7.16992 12.91 7.16992 12.5C7.16992 12.09 7.50992 11.75 7.91992 11.75H15.9199C16.3299 11.75 16.6699 12.09 16.6699 12.5C16.6699 12.91 16.3399 13.25 15.9199 13.25Z"
                />
              </svg>
            </button>

            <input value={inputValue}
                   onChange={inputChangeHandler}
                   onBlur={inputBlurHandler}
                   onKeyDown={inputEnterHandler}
                   className={s.input}
                   type="text"
                   disabled={cartItem.inventoryLevel === 0}/>

            <button onClick={plusHandler} className={s.plusBtn} disabled={cartItem.inventoryLevel <= cartItem.quantity}>
              <svg width="24" height="25" viewBox="0 0 24 25" fill="#3E5067" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M12 23.25C6.07 23.25 1.25 18.43 1.25 12.5C1.25 6.57 6.07 1.75 12 1.75C17.93 1.75 22.75 6.57 22.75 12.5C22.75 18.43 17.93 23.25 12 23.25ZM12 3.25C6.9 3.25 2.75 7.4 2.75 12.5C2.75 17.6 6.9 21.75 12 21.75C17.1 21.75 21.25 17.6 21.25 12.5C21.25 7.4 17.1 3.25 12 3.25Z"
                />
                <path
                  d="M16 13.25H8C7.59 13.25 7.25 12.91 7.25 12.5C7.25 12.09 7.59 11.75 8 11.75H16C16.41 11.75 16.75 12.09 16.75 12.5C16.75 12.91 16.41 13.25 16 13.25Z"
                  fill="#3E5067"/>
                <path
                  d="M12 17.25C11.59 17.25 11.25 16.91 11.25 16.5V8.5C11.25 8.09 11.59 7.75 12 7.75C12.41 7.75 12.75 8.09 12.75 8.5V16.5C12.75 16.91 12.41 17.25 12 17.25Z"
                />
              </svg>
            </button>
          </div>
          {
            cartItem.inventoryLevel > 0 && cartItem.inventoryLevel < 3 &&
            <div className={s.smallStockMobile}>Осталось мало</div>
          }
          <div className={s.priceBlock}>
            <div
              className={s.oldPrice}>{(cartItem.regularPrice * (cartItem.quantity !== 0 ? cartItem.quantity : 1)).toLocaleString()}&nbsp;₽
            </div>
            <div
              className={s.currentPrice}>{(cartItem.price * (cartItem.quantity !== 0 ? cartItem.quantity : 1)).toLocaleString()}&nbsp;₽
            </div>
          </div>
          <div className={s.iconButtons}>
            <button onClick={onFavClick}><img
              className={s.heartImg}
              src={isFavourite ? heartActiveBtn : heartBtn}
              alt="heart"/>
            </button>
            <button onClick={deleteItemHandler}><img className={s.trashImg} src={trashBtn} alt="trash"/></button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;