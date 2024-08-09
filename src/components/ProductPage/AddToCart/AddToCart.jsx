import s from './AddToCart.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getCart, getCartUpdatingStatus} from "@/store/cartSlice.js";
 import CartInput from "@/components/ui/CartInput/CartInput.jsx";
import Button from "@/components/ui/Button/Button.jsx";
const AddToCart = ({product}) => {
  
  
  const dispatch = useDispatch()
    
  const cart = useSelector(getCart)
  const cartUpdatingStatus = useSelector(getCartUpdatingStatus)
  
  let productInCart = false

  if (cart?.cartItems) {
    productInCart = cart.cartItems.find(item => {
      return item.productVariantId === product.productVariantId
    })
  }

  let quantity

  if (productInCart) {
    quantity = productInCart.quantity
  } else {
    quantity = 0
  }

  //const onAddToCartClick = (id, quantity) => dispatch(addToCart({id, quantity}))
  const onAddToCartClick = (productVariantId, quantity) => {
    
    if (cartUpdatingStatus === 'loading') return
    
    dispatch(addToCart({
      productVriantId: productVariantId,
      count: quantity,
      cartId: cart.cartId,
      item: product
    }))
  }

  const isInCart = quantity > 0

  return (
    <div className={s.addToCart}>
      <div className={s.priceWrapper}>
        <div className={s.regularPrice}>
          {product.regularPrice}{' '}₽
        </div>
        <div className={s.price}>
          {product.price}{' '}₽
        </div>
      </div>
            
      <div className={s.btnWrapper}>
        {
          isInCart && (
            <CartInput product={product} quantity={quantity} className={s.cartInput} cartItemId={productInCart.cartItemId} />
          )
        }
      
        {
          !isInCart && <Button className={s.toCartBtn} disabled={product.inventoryQuantity === 0 }
                               onClick={() => onAddToCartClick(product.productVariantId, 1)}>
            
            Добавить&nbsp;в&nbsp;корзину
          
          </Button>
        }
      
      </div>
    </div>
  );
};
s
export default AddToCart;