import s from './Products.module.scss';
import {useSearchParams} from "react-router-dom";
import ProductCard from "@/components/CategoryPage/Products/ProductCard/ProductCard.jsx";

const Products = ({products, isBigScreen}) => {
  
  const [searchParams, setSearchParams] = useSearchParams()  
  const cardView = searchParams.get('cardView') || 'horizontal'
  
    
  return (
      
      <div className={`${s.productsWrapper} ${(cardView==='vertical' || !isBigScreen)  && s.verticalViewCardWrapper}`}>
        
        {
          products.map((product, i)=>{
            return <ProductCard key={i} isBigScreen={isBigScreen} product={product} />                          
          })  
        }
        
      </div>
  );
};

export default Products;