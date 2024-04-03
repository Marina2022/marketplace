import s from "@/components/CategoryPage/Products/ProductCard/ProductCard.module.scss";

import star from '@/assets/img/star.svg'
import {getRightWord} from "@/utils/reviews.js";
import Button from "@/components/ui/Button/Button.jsx";

const base_url = 'https://i-rif.com/'
const ProductCardHorizontal = ({product}) => {

  console.log('product images', product.images)
  console.log('product', product)


  return (
      <div className={s.productCardHorizontal}>
        <div className={s.imgWrapper}>
          <img className={s.imgCardHor} src={`${base_url}${product.images[0]?.imageUrl}`} alt=""/>
        </div>

        <div className={s.desc}>
          <h3 className={s.title}>
            {product.productName}
          </h3>
          <div className={s.rating}>
            <img className={s.star} src={star} alt="star"/>
            <div className={s.reviews}>
              {product.reviewsRating} ({getRightWord(product.reviewsCount)})
            </div>
          </div>

          {
              product.features.length > 0 && <ul className={s.features}>
                {
                  product.features.map((feature, i) => (
                      <li className={s.featureItem} key={i}>
                        <span className={s.featureName}>{feature.name}</span>
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
            <Button>В&nbsp;корзину</Button>
            <button>
              <svg className={s.favoriteIcon} width="22" height="20" viewBox="0 0 22 20"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M11 19.6075C10.69 19.6075 10.39 19.5675 10.14 19.4775C6.32 18.1675 0.25 13.5175 0.25 6.64753C0.25 3.14753 3.08 0.307526 6.56 0.307526C8.25 0.307526 9.83 0.967526 11 2.14753C12.17 0.967526 13.75 0.307526 15.44 0.307526C18.92 0.307526 21.75 3.15753 21.75 6.64753C21.75 13.5275 15.68 18.1675 11.86 19.4775C11.61 19.5675 11.31 19.6075 11 19.6075ZM6.56 1.80753C3.91 1.80753 1.75 3.97753 1.75 6.64753C1.75 13.4775 8.32 17.2775 10.63 18.0675C10.81 18.1275 11.2 18.1275 11.38 18.0675C13.68 17.2775 20.26 13.4875 20.26 6.64753C20.26 3.97753 18.1 1.80753 15.45 1.80753C13.93 1.80753 12.52 2.51753 11.61 3.74753C11.33 4.12753 10.69 4.12753 10.41 3.74753C9.48 2.50753 8.08 1.80753 6.56 1.80753Z"
                />
              </svg>

            </button>
          </div>

        </div>
      </div>
  );
};

export default ProductCardHorizontal;