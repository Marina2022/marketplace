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
  const productsInCart = useSelector(getCart)    
  const productInCart = productsInCart.find(item=>item.id === product.productVariantId)  
  let quantity
  
  if (productInCart) { 
    quantity = productInCart.count
  } else {
    quantity = 0
  }
    
  const dispatch = useDispatch()
  const onAddToCartClick = (id, quantity)=>dispatch(addToCart({id, quantity}))
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
              <ProductCardVertical onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product} quantity={quantity}/>
          }

          {
              (isBigScreen && cardView === 'horizontal') &&
              <ProductCardHorizontal onAddToCartClick={onAddToCartClick} onFavClick={onFavClick} product={product} quantity={quantity}/>
          }
        < />
    )
  }


  export default ProductCard;