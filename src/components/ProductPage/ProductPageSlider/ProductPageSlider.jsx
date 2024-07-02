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


// imageName: "6699585044"
// imageUrl"Data/products/5f3778dd-9284-48dc-a8fe-52dc41577373/images/main/6699585053.png"


const ProductPageSlider = ({images}) => {

  const [currentImage, setCurrentImage] = useState(undefined)
  
  const [sliderPopupIsOpen, setSliderPopupIsOpen] = useState(false)

  useEffect(() => {
    if (images) {
      setCurrentImage(0)
    }
  }, [images]);


  const isBigScreen = useBigScreen()
  const isMobile = useMobileScreen()

    
  if(currentImage === undefined) return <Spinner className={s.spinner} />
  
  if (isBigScreen) return (
      <>        
      <div className={s.sliderBlock}>
        <ProductPageThumbs images={images} currentImage={currentImage} setCurrentImage={setCurrentImage} setSliderPopupIsOpen={setSliderPopupIsOpen}  />
        <div className={s.bigPicture} onClick={()=>setSliderPopupIsOpen(true)}>
          <img className={s.image} src={`${BASE_URL}${images[currentImage].imageUrl}`} alt={images[currentImage].imageName}/>
        </div>
      </div>
        {
          sliderPopupIsOpen && <ProductSliderPopup  setSliderPopupIsOpen={setSliderPopupIsOpen} images={images} currentImage={currentImage} />
        }
        
      </>  
  );

  if (!isBigScreen) return (
      <>
        <div className={s.sliderBlock}>
          <div className={s.bigPicture}  >            
            <ProductMobileSlider images={images} setSliderPopupIsOpen={setSliderPopupIsOpen} setCurrentImage={setCurrentImage} />            
          </div>          
        </div>
        {
          !isMobile && sliderPopupIsOpen && <ProductSliderPopup setSliderPopupIsOpen={setSliderPopupIsOpen} images={images} currentImage={currentImage} />          
        } 
      </>
  )
};

export default ProductPageSlider;