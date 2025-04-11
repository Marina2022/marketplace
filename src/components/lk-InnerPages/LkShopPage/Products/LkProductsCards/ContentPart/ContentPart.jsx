import s from './ContentPart.module.scss';
import ContentLeft
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeft.jsx";
import ContentMiddle
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddle.jsx";
import ContentRight
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRight.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSearchParams} from "react-router-dom";
import {useState} from "react";

import {flushSync} from 'react-dom';

const ContentPart = ({products, getProducts}) => {

  // const [searchParams, setSearchParams] = useSearchParams();

  // для теста linkedProducts  
  //const statusTab = searchParams.get('statusTab')
  // if (products && products[1] && (!statusTab || statusTab === 'all')) {
  //   products[1].linkedProducts = linkedProducts
  // }

  const [checkedProducts, setCheckedProducts] = useState([])
  const [collapsedProducts, setCollapsedProducts] = useState([])
  const [hoveredProducts, setHoveredProducts] = useState([])

  const handleMouseIn = (productVariantId) => {
    const tempHoveredProducts = [...hoveredProducts]
    if (!tempHoveredProducts.includes(productVariantId)) {
      tempHoveredProducts.push(productVariantId)

      flushSync(() => {
        setHoveredProducts(tempHoveredProducts)
      });

    }
  }
  const handleMouseOut = (productVariantId) => {
    const tempHoveredProducts = [...hoveredProducts]
    if (tempHoveredProducts.includes(productVariantId))
      flushSync(() => {
        setHoveredProducts(tempHoveredProducts.filter(item => item !== productVariantId))
      });
  }


  if (!products) return <Spinner/>

  return (
    <div className={s.contentPartWrapper}>
      <ContentLeft
        products={products}
        checkedProducts={checkedProducts}
        setCheckedProducts={setCheckedProducts}
        collapsedProducts={collapsedProducts}
        setCollapsedProducts={setCollapsedProducts}
        handleMouseIn={handleMouseIn}
        handleMouseOut={handleMouseOut}
        hoveredProducts={hoveredProducts}

      />
      <ContentMiddle
        products={products}
        handleMouseIn={handleMouseIn}
        handleMouseOut={handleMouseOut}
        hoveredProducts={hoveredProducts}
        collapsedProducts={collapsedProducts}
      />

      <ContentRight
        products={products}
        handleMouseIn={handleMouseIn}
        handleMouseOut={handleMouseOut}
        hoveredProducts={hoveredProducts}
        collapsedProducts={collapsedProducts}
        getProducts={getProducts}
      />
    </div>
  );
};

export default ContentPart;