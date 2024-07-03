import s from "@/components/ProductCard/ProductCard.module.scss";

import star from '@/assets/img/star.svg'
import {getReviewsString} from "@/utils/reviews.js";
import Button from "@/components/ui/Button/Button.jsx";
import CartInput from "@/components/ui/CartInput/CartInput.jsx";
import {Link, useNavigate} from "react-router-dom";
import ProductImage from "@/components/ProductCard/ProductImage/ProductImage.jsx";

const ProductCardHorizontal = ({product, quantity, onFavClick, onAddToCartClick}) => {
  
  const isInCart = quantity > 0
  const navigate = useNavigate()
  
  return (
      <div className={s.productCardHorizontal}>
        <div className={s.imgWrapper} onClick={()=>navigate(`/product/${product.productHandle}`)} >
          <ProductImage product={product} orientation="horizontal" />          
        </div>

        <div className={s.desc}>
          <h3 className={s.title}>
            <Link className={s.cardLink} to={`/product/${product.productHandle}`}>
              {product.productName}
            </Link>
          </h3>
          <div className={s.rating}>
            <img className={s.star} src={star} alt="star"/>
            <div className={s.reviews}>
              {product.reviewsRating} ({getReviewsString(product.reviewsCount)})
            </div>
          </div>
          {
              product.features.length > 0 && <ul className={s.features}>
                {
                  product.features.map((feature, i) => (
                      <li className={s.featureItem} key={i}>
                        <span className={s.featureName}>{feature.name}:</span>
                        <span className={s.featureValue}>{feature.value}</span>
                      </li>)
                  )
                }
              </ul>
          }
        </div>


        <div className={s.priceAndCartBlock}>
          <p className={s.priceWrapper}>
            <span className={s.price}>{product.price.toLocaleString()} ₽</span>
            {
                product.regularPrice &&
                <span className={s.regularPrice}>{product.regularPrice.toLocaleString()} ₽</span>
            }
          </p>
          <p className={s.vendor}>{product.vendorName}</p>
          <div className={s.btnWrapper}>
            {
                isInCart && (
                    <CartInput product={product} value={quantity} />
                )
            }

            {
                !isInCart && <Button className={s.toCartBtn}  onClick={()=>onAddToCartClick(product.productVariantId, 1)} >В&nbsp;корзину</Button>
            }
            <button className={s.favBtn} onClick={()=>onFavClick(product.id)}>
             
              {
                  product.isFavourite &&  <svg width="20" height="18" viewBox="0 0 20 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M14.44 0.0996094C12.63 0.0996094 11.01 0.979609 10 2.32961C8.99 0.979609 7.37 0.0996094 5.56 0.0996094C2.49 0.0996094 0 2.59961 0 5.68961C0 6.87961 0.19 7.97961 0.52 8.99961C2.1 13.9996 6.97 16.9896 9.38 17.8096C9.72 17.9296 10.28 17.9296 10.62 17.8096C13.03 16.9896 17.9 13.9996 19.48 8.99961C19.81 7.97961 20 6.87961 20 5.68961C20 2.59961 17.51 0.0996094 14.44 0.0996094Z"
                        fill="#E32636"/>
                  </svg>
              }

              {
                  !product.isFavourite && <svg className={s.favoriteIcon} width="22" height="20" viewBox="0 0 22 20"
                                               xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M11 19.6075C10.69 19.6075 10.39 19.5675 10.14 19.4775C6.32 18.1675 0.25 13.5175 0.25 6.64753C0.25 3.14753 3.08 0.307526 6.56 0.307526C8.25 0.307526 9.83 0.967526 11 2.14753C12.17 0.967526 13.75 0.307526 15.44 0.307526C18.92 0.307526 21.75 3.15753 21.75 6.64753C21.75 13.5275 15.68 18.1675 11.86 19.4775C11.61 19.5675 11.31 19.6075 11 19.6075ZM6.56 1.80753C3.91 1.80753 1.75 3.97753 1.75 6.64753C1.75 13.4775 8.32 17.2775 10.63 18.0675C10.81 18.1275 11.2 18.1275 11.38 18.0675C13.68 17.2775 20.26 13.4875 20.26 6.64753C20.26 3.97753 18.1 1.80753 15.45 1.80753C13.93 1.80753 12.52 2.51753 11.61 3.74753C11.33 4.12753 10.69 4.12753 10.41 3.74753C9.48 2.50753 8.08 1.80753 6.56 1.80753Z"
                    />
                  </svg>
              }
            </button>
          </div>
        </div>
      </div>
  );
};

export default ProductCardHorizontal;