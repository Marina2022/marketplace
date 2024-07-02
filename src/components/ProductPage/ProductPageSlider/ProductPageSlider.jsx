import s from './ProductPageSlider.module.scss';
import ProductPageThumbs from "@/components/ProductPage/ProductPageSlider/ProductPageThumbs/ProductPageThumbs.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useEffect, useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";


// imageName: "6699585044"
// imageUrl"Data/products/5f3778dd-9284-48dc-a8fe-52dc41577373/images/main/6699585053.png"


const ProductPageSlider = ({images}) => {

  const [currentImage, setCurrentImage] = useState(undefined)

  useEffect(() => {
    if (images) {
      setCurrentImage(0)
    }
  }, [images]);


  const isBigScreen = useBigScreen()
  // const isMobile = useMobileScreen()

    
  if(currentImage === undefined) return <Spinner className={s.spinner} />
  
  if (isBigScreen) return (
      <div className={s.sliderBlock}>
        <ProductPageThumbs images={images} currentImage={currentImage} setCurrentImage={setCurrentImage}  />
        <div className={s.bigPicture}>
          <img className={s.image} src={`${BASE_URL}${images[currentImage].imageUrl}`} alt={images[currentImage].imageName}/>
        </div>
      </div>
  );

  if (!isBigScreen) return (
      <div className={s.sliderBlock}>
        <div className={s.bigPicture}>Slider - для планшета и мобайла</div>
      </div>
  )
};

export default ProductPageSlider;