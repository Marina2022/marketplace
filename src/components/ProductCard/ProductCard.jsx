import ProductCardHorizontal from "@/components/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/ProductCard/ProductCardVertical.jsx";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {addToCart, getCart, getCartUpdatingStatus} from "@/store/cartSlice.js";
import {getCartView} from "@/store/catalogSlice.js";
import {getFavs, updateFavs} from "@/store/favSlice.js";
import {useState} from "react";

const ProductCard = ({isBigScreen, product}) => {
  
  const cardView = useSelector(getCartView)
  const isAuthenticated = useSelector(getIsAuthenticated)

  const cart = useSelector(getCart)
  const cartUpdatingStatus = useSelector(getCartUpdatingStatus)
  const favs = useSelector(getFavs)
  
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

    if (cartUpdatingStatus === 'loading') return
    
    dispatch(addToCart({
      productVriantId: productVariantId,
      count: quantity,
      cartId: cart.cartId,
      item: product
    }))    
  }
  
  const [isFavourite, setIsFavourite] = useState(isAuthenticated 
    ? product.isFavourite 
    : favs.find(item=>item.productVariantId === product.productVariantId) )  // todo - не тестила 
  

  const onFavClick = () => {    
    if (isFavourite) {      
      dispatch(updateFavs({updateType:'remove', productVariantId: product.productVariantId, product}))      
    } else {
      dispatch(updateFavs({updateType:'add', productVariantId: product.productVariantId, product}))
    }
    setIsFavourite(prev=>!prev)
  }

  return (
    <>      
      {
        (!isBigScreen || cardView === 'vertical') &&
        <ProductCardVertical onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product}
                             quantity={quantity} cartItemId={productInCart?.cartItemId} isFavourite={isFavourite} />
      }

      {
        (isBigScreen && cardView === 'horizontal') &&
        <ProductCardHorizontal onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product}
                               quantity={quantity} cartItemId={productInCart?.cartItemId} isFavourite={isFavourite} />
      }
    < />
  )
}


export default ProductCard;