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
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobileProductCards
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/MobileProductCards/MobileProductCards.jsx";
import {linkedProducts} from "@/dev-data/linkedProducts.js";
import NoProducts
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/NoProducts/NoProducts.jsx";
import UniteProductBlock
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/UniteProductBlock/UniteProductBlock.jsx";

const ContentPart = ({products, getProducts}) => {

  //для теста linkedProducts  
  //const [searchParams, setSearchParams] = useSearchParams();
  // const statusTab = searchParams.get('statusTab')
  // if (products && products[1] && (!statusTab || statusTab === 'all')) {
  //   products[1].linkedProducts = linkedProducts
  // }

  const isMobile = useMobileScreen()

  const [checkedProducts, setCheckedProducts] = useState([])
  const [collapsedProducts, setCollapsedProducts] = useState([])
  const [hoveredProducts, setHoveredProducts] = useState([])

  const handleMouseIn = (productVariantId) => {
    const tempHoveredProducts = [...hoveredProducts]
    if (!tempHoveredProducts.includes(productVariantId)) {
      tempHoveredProducts.push(productVariantId)

      flushSync(() => {
        setHoveredProducts(tempHoveredProducts)
      })
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
    <>
      {
        !isMobile && (
          <div className={s.contentPartWrapper}>
            {
              products.length === 0 && <NoProducts/>
            }
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
        )
      }

      {
        isMobile && <div className={s.mobileWrapper}>
          {
            products.length === 0 && <NoProducts/>
          }
          <MobileProductCards
            products={products}
            collapsedProducts={collapsedProducts}
            getProducts={getProducts}
            setCollapsedProducts={setCollapsedProducts}
          />
        </div>
      }
      {
        checkedProducts.length > 0 && <UniteProductBlock checkedProducts={checkedProducts} products={products} />
      }
    </>

  );
};

export default ContentPart;