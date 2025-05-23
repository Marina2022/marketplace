import s from './MediaStep.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import PresentationPhotos
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/PresentationPhotos/PresentationPhotos.jsx";
import ProductPhotos from "@/components/lk-InnerPages/ManageProduct/MediaStep/ProductPhotos/ProductPhotos.jsx";
import MediaPopup from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/MediaPopup.jsx";

const MediaStep = ({
                     productPhotos,
                     setProductPhotos,
                     presentationPhotos,
                     setPresentationPhotos,
                     setStep,
                     product: productToSort,
                     setProduct,
                     trigger,
                     navItems
                   }) => {

    const product = JSON.parse(JSON.stringify(productToSort))
    if (product) {
      product.mediaContent.productImages.sort((a, b) => a.sortOrder - b.sortOrder)
      product.mediaContent.productPresentationImages.sort((a, b) => a.sortOrder - b.sortOrder)
    }

    const [popupOpen, setPopupOpen] = useState(null)  // productPhotos, presentationPhotos
    const goToNextStep = async () => {
      const isValid = await trigger();
      if (!isValid || (productPhotos.length === 0 && product?.mediaContent?.productImages.length === 0)) return
      setStep('preview')
    }
        const goToPreviousStep = ()=>{      
      if (navItems.length > 2 ){
        setStep('characteristics')  
      } else {
        setStep('main')
      }            
    }

    return (
      <div className={s.mediaPage}>
        <h2 className={s.title}>Медиа</h2>

        <ProductPhotos
          productPhotos={productPhotos}
          setProductPhotos={setProductPhotos}
          setPopupOpen={setPopupOpen}
          product={product}
          setProduct={setProduct}/>

        <PresentationPhotos
          presentationPhotos={presentationPhotos}
          setPresentationPhotos={setPresentationPhotos}
          setPopupOpen={setPopupOpen}
          product={product}
          setProduct={setProduct}/>

        <div className={s.buttons}>
          <Button className={s.backButton} type="button" onClick={goToPreviousStep}>Назад</Button>
          <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>
        </div>

        {
          popupOpen && <MediaPopup
            className={s.popup}
            setProductPhotos={setProductPhotos}
            productPhotos={productPhotos}
            presentationPhotos={presentationPhotos}
            setPresentationPhotos={setPresentationPhotos}
            setPopupOpen={setPopupOpen}
            popupOpen={popupOpen}
            product={product}
            setProduct={setProduct}
          />
        }
      </div>
    );
  }
;

export default MediaStep;