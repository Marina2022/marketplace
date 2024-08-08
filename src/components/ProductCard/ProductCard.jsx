import {useNavigate} from "react-router-dom";
import ProductCardHorizontal from "@/components/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/ProductCard/ProductCardVertical.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {addToCart, getCart} from "@/store/cartSlice.js";
import {getCartView} from "@/store/catalogSlice.js";

const ProductCard = ({isBigScreen, product}) => {
  const cardView = useSelector(getCartView)
  const isAuthenticated = useSelector(getIsAuthenticated)

  const cart = useSelector(getCart)

  // console.log('cart from category', cart.cartItems)

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

  const dispatch = useDispatch()
  const onAddToCartClick = (productVariantId, quantity) => {    
    dispatch(addToCart({
      productVriantId: productVariantId,
      count: quantity,
      cartId: cart.cartId,    
    }))
    
  }


  const navigate = useNavigate()
  const onFavClick = (id) => {
    if (!isAuthenticated) {
      navigate('/login')
    } else {
      console.log('Поместить в Избранное товар ', id)
    }
  }

  return (
    <>
      {
        (!isBigScreen || cardView === 'vertical') &&
        <ProductCardVertical onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product}
                             quantity={quantity} cartItemId={productInCart?.cartItemId} />
      }

      {
        (isBigScreen && cardView === 'horizontal') &&
        <ProductCardHorizontal onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product}
                               quantity={quantity} cartItemId={productInCart?.cartItemId}/>
      }
    < />
  )
}


export default ProductCard;