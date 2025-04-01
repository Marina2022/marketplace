import s from './ProductSliderPopup.module.scss';
import closeBtn from '@/assets/img/productSlider/closeBtn.svg'
import {useEffect} from "react";
import ProductSlider from "@/components/ProductPage/ProductPageSlider/ProductSlider/ProductSlider.jsx";

const ProductSliderPopup = ({setSliderPopupIsOpen, images, currentImage}) => {
  useEffect(() => {
    const escHandler = (e) => {
      if (e.keyCode === 27) {
        setSliderPopupIsOpen(false)
      }
    }
    window.addEventListener('keydown', escHandler)    
    document.documentElement.style.overflow = 'hidden'    
    
    return () => {
      window.removeEventListener('keydown', escHandler)

      document.documentElement.style.overflow = 'auto'
    }
  }, []);

  return (
    <div className={s.wrapper}>
      <button className={s.closeBtn}>
        <img src={closeBtn} alt="close button" onClick={() => setSliderPopupIsOpen(false)}/>
      </button>
      <div className={s.slider}>
        <ProductSlider images={images} currentImage={currentImage}/>
      </div>

    </div>
  );
};

export default ProductSliderPopup;