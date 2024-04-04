import s from './Products.module.scss';
import ProductCard from "@/components/CategoryBlock/Products/ProductCard/ProductCard.jsx";
import {useSelector} from "react-redux";
import {getCartView} from "@/store/catalogSlice.js";

const Products = ({products, isBigScreen}) => {
  
  const cardView = useSelector(getCartView)

  return (    
      <div className={`${s.productsWrapper} ${(cardView==='vertical' || !isBigScreen)  && s.verticalViewCardWrapper}`}>
        
        {
          products.map((product, i)=>{
            return <ProductCard key={i} isBigScreen={isBigScreen} product={product}  />                          
          })  
        }        
      </div>
  );
};

export default Products;