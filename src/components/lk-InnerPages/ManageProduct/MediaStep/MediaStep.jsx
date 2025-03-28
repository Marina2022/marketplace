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
                     setStep
                   }) => {
  
  const [popupOpen, setPopupOpen] = useState(null)  // productPhotos, presentationPhotos

  const goToNextStep = () => {
    setStep('preview')
  }

    return (

      <div className={s.mediaPage}>

        <h2 className={s.title}>Медиа</h2>

        <ProductPhotos productPhotos={productPhotos} setProductPhotos={setProductPhotos} setPopupOpen={setPopupOpen} />

        <PresentationPhotos presentationPhotos={presentationPhotos} setPresentationPhotos={setPresentationPhotos} setPopupOpen={setPopupOpen}/>

        <div className={s.buttons}>
          <Button className={s.backButton} type="button" onClick={() => setStep('characteristics')}>Назад</Button>
          <Button className={s.continueBtn} type="button" onClick={goToNextStep}>Далее</Button>
        </div>

        {
          popupOpen && <MediaPopup 
            className={s.popup} 
            setProductPhotos={setProductPhotos} 
            productPhotos={productPhotos}
            setPopupOpen={setPopupOpen}
            popupOpen={popupOpen}
          /> 
        }
        
          
        
      </div>
    );
  }
;

export default MediaStep;