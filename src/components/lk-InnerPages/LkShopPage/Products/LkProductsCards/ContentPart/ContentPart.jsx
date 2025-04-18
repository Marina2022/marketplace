import s from './ContentPart.module.scss';
import ContentLeft
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentLeft/ContentLeft.jsx";
import ContentMiddle
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentMiddle/ContentMiddle.jsx";
import ContentRight
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentRight/ContentRight.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useState} from "react";
import {flushSync} from 'react-dom';
import useMobileScreen from "@/hooks/useMobileScreen.js";
import MobileProductCards
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/MobileProductCards/MobileProductCards.jsx";
import NoProducts
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/NoProducts/NoProducts.jsx";
import UniteProductBlock
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/UniteProductBlock/UniteProductBlock.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";

const ContentPart = ({products, getProducts, productsLoading}) => {

  const profiles = useSelector(getUserProfilesData)
  const activeProfileId = useSelector(getActiveProfileId)
  const currentProfile = profiles?.find(profile => profile.profileId === activeProfileId)

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

  if (!products ) return <Spinner/>

  return (
    <>
      {
        !isMobile && (
          <div className={s.contentPartWrapper}>
            {
              currentProfile && currentProfile.type === 'company' && !productsLoading && products && products.length === 0 && <NoProducts/>
            }
            {
              currentProfile && currentProfile.type !== 'company' && <NoProducts noCompany={true}/>
            }
            
            <ContentLeft
              currentProfile={currentProfile}
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
              currentProfile={currentProfile}
              products={products}
              handleMouseIn={handleMouseIn}
              handleMouseOut={handleMouseOut}
              hoveredProducts={hoveredProducts}
              collapsedProducts={collapsedProducts}
            />


            <ContentRight
              currentProfile={currentProfile}
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
            products?.length === 0 && <NoProducts/>
          }
          {
            currentProfile?.type !== 'company' && <NoProducts noCompany={true}/>
          }
                
          <MobileProductCards
            products={products}
            collapsedProducts={collapsedProducts}
            getProducts={getProducts}
            setCollapsedProducts={setCollapsedProducts}
            currentProfile={currentProfile}
          />
        </div>
      }
      {
        checkedProducts.length > 0 && <UniteProductBlock checkedProducts={checkedProducts} products={products}/>
      }
    </>

  );
};

export default ContentPart;