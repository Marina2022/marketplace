import s from './ProductCard.module.scss';

import {useSearchParams} from "react-router-dom";
import ProductCardHorizontal from "@/components/CategoryPage/Products/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/CategoryPage/Products/ProductCard/ProductCardVertical.jsx";
import {useState} from "react";

const ProductCard = ({isBigScreen, product}) => {

  const [searchParams, setSearchParams] = useSearchParams()
  const cardView = searchParams.get('cardView') || 'horizontal'
  
  // todo - Это временно, потом надо будет убрать
  
  const [isInCart, setIsInCart] = useState(true)
    

  return (

      <>
        {
            (!isBigScreen || cardView === 'vertical') && <ProductCardVertical product={product} isInCart={isInCart} />
        }

        {
          (isBigScreen && cardView === 'horizontal') && <ProductCardHorizontal product={product} isInCart={isInCart} />
        }
      < />
  )
}


export default ProductCard;