import s from './ProductCard.module.scss';

import {useSearchParams} from "react-router-dom";
import ProductCardHorizontal from "@/components/CategoryPage/Products/ProductCard/ProductCardHorizontal.jsx";
import ProductCardVertical from "@/components/CategoryPage/Products/ProductCard/ProductCardVertical.jsx";

const ProductCard = ({isBigScreen, product}) => {


  const [searchParams, setSearchParams] = useSearchParams()
  const cardView = searchParams.get('cardView') || 'horizontal'

  return (

      <>
        {
            (!isBigScreen || cardView === 'vertical') && <ProductCardVertical product={product} />
        }

        {
          (isBigScreen && cardView === 'horizontal') && <ProductCardHorizontal product={product} />
        }
      < />
  )
}


export default ProductCard;