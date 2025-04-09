import s from './ContentPart.module.scss';
import {linkedProducts} from "@/dev-data/linkedProducts.js";
import ContentLeft
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeft.jsx";
import ContentMiddle
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddle.jsx";
import ContentRight
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRight.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";

const ContentPart = ({ products}) => {

  console.log(products)

  // todo - для теста linkedProducts  
  const [searchParams, setSearchParams] = useSearchParams();
  const statusTab = searchParams.get('statusTab')


  // todo - для теста linkedProducts  
  if (products && products[1] && (!statusTab || statusTab === 'all')) {    
    products[1].linkedProducts = linkedProducts
    console.log(products)  
  }
  
  const [checkedProducts, setCheckedProducts] = useState([])
  const [collapsedProducts, setCollapsedProducts] = useState([])
  
  if (!products) return <Spinner />
  
  return (
    <div className={s.contentPartWrapper}>
      <ContentLeft 
        products={products} 
        checkedProducts={checkedProducts} 
        setCheckedProducts={setCheckedProducts}
        collapsedProducts={collapsedProducts}
        setCollapsedProducts={setCollapsedProducts}      
      />
      <ContentMiddle products={products} />
      <ContentRight products={products} />
    </div>
  );
};

export default ContentPart;