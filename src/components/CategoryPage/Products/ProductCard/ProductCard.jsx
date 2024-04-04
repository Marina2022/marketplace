import s from './ProductCard.module.scss';

import {useNavigate, useSearchParams} from "react-router-dom";
import ProductCardHorizontal from "@/components/CategoryPage/Products/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/CategoryPage/Products/ProductCard/ProductCardVertical.jsx";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {getCart, addToCart} from "@/store/cartSlice.js";


const ProductCard = ({isBigScreen, product}) => {


  const isAuthenticated = useSelector(getIsAuthenticated)

  const [searchParams, setSearchParams] = useSearchParams()
  const cardView = searchParams.get('cardView') || 'horizontal'

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