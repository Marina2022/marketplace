import s from './ProductCard.module.scss';

import {useNavigate, useSearchParams} from "react-router-dom";
import ProductCardHorizontal from "@/components/CategoryPage/Products/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/CategoryPage/Products/ProductCard/ProductCardVertical.jsx";
import {useState} from "react";
import {useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";

const ProductCard = ({isBigScreen, product}) => {


  const isAuthenticated = useSelector(getIsAuthenticated)

  console.log('isAuthenticated', isAuthenticated)

  const [searchParams, setSearchParams] = useSearchParams()
  const cardView = searchParams.get('cardView') || 'horizontal'

  // todo - Это временно, потом надо будет убрать

  const [isInCart, setIsInCart] = useState(true)

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
              <ProductCardVertical onFavClick={onFavClick} product={product} isInCart={isInCart}/>
          }

          {
              (isBigScreen && cardView === 'horizontal') &&
              <ProductCardHorizontal onFavClick={onFavClick} product={product} isInCart={isInCart}/>
          }
        < />
    )
  }


  export default ProductCard;