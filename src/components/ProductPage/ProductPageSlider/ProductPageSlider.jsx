import s from './ProductPageSlider.module.scss';
import ProductPageThumbs from "@/components/ProductPage/ProductPageSlider/ProductPageThumbs/ProductPageThumbs.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useEffect, useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import ProductSliderPopup from "@/components/ProductPage/ProductPageSlider/ProductSliderPopup/ProductSliderPopup.jsx";
import ProductMobileSlider
  from "@/components/ProductPage/ProductPageSlider/ProductMobileSlider/ProductMobileSlider.jsx";
import FavButton from "@/components/ui/FavButton/FavButton.jsx";

const ProductPageSlider = ({images, productId, isFavourite, onFavClick}) => {

  const [currentImage, setCurrentImage] = useState(0)
  const [sliderPopupIsOpen, setSliderPopupIsOpen] = useState(false)

  const isBigScreen = useBigScreen()
  const isMobile = useMobileScreen()


  
  
  if (currentImage === undefined) return <Spinner className={s.spinner}/>

  if (isBigScreen) return (
    <>
      <div className={s.sliderBlock}>
        <ProductPageThumbs
          images={images}
          currentImage={currentImage}
          setCurrentImage={setCurrentImage}
          setSliderPopupIsOpen={setSliderPopupIsOpen}/>
        
        <div
          className={s.bigPicture}
          onClick={() => setSliderPopupIsOpen(true)}>
          
          <FavButton
            onClick={onFavClick}
            className={s.favBtn}
            productId={productId}
            isFavourite={isFavourite}/>
          <img className={s.image} src={`${BASE_URL}${images[currentImage].imageUrl}`}
               alt={images[currentImage].imageName}
          />
          
        </div>
      </div>
      
      
      {
        sliderPopupIsOpen &&
        <ProductSliderPopup setSliderPopupIsOpen={setSliderPopupIsOpen} images={images} currentImage={currentImage}/>
      }
    </>
  );

  if (!isBigScreen) return (
    <>
      <div className={s.sliderBlock}>
        <div className={s.bigPicture}>
          <ProductMobileSlider
            images={images}
            setSliderPopupIsOpen={setSliderPopupIsOpen}
            setCurrentImage={setCurrentImage}/>
        </div>
        <FavButton
          onClick={onFavClick}
          className={s.favBtnMobile}
          productId={productId}
          isFavourite={isFavourite}/>
      </div>
      {
        !isMobile && sliderPopupIsOpen &&
        <ProductSliderPopup
          setSliderPopupIsOpen={setSliderPopupIsOpen}
          images={images}
          currentImage={currentImage}/>
      }
    </>
  )
};

export default ProductPageSlider;