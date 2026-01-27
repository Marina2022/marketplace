import s from "./ViewedProducts.module.scss";
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {viewedProducts} from "@/dev-data/viewedProducts.js";

const ViewedProducts = ({fullSize=false}) => {
  const viewedProductsToShow = viewedProducts.slice(0, 10)
  
  return (
      <div className={s.viewedProducts}>
        <h2 className={s.viewedTitle}>Вы смотрели</h2>
        <div className={fullSize ?  s.viewedProductsListFull : s.viewedProductsList}>
          {
            viewedProductsToShow.map((product, i) => {
              return <ProductCard key={i} isBigScreen={false} product={product}/>
            })
          }
        </div>
      </div>
  );
};

export default ViewedProducts;
