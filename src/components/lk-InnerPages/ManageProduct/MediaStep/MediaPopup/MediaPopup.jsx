import s from './MediaPopup.module.scss';
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import Button from "@/components/ui/Button/Button.jsx";
import Requirements from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/Requirements/Requirements.jsx";
import ProductPhotosBlock
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosBlock/ProductPhotosBlock.jsx";
import PresentationPhotosBlock
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/PresentationPhotosBlock/PresentationPhotosBlock.jsx";

const MediaPopup = ({setProductPhotos, productPhotos, setPopupOpen, popupOpen, presentationPhotos, setPresentationPhotos}) => {

  const {productIdParam} = useParams()
  let isNew = true
  if (productIdParam !== 'new') isNew = false

// images - это загруженные из попапа файлы (не сохраненные в Апп еще)  - файлы с фото товаров
  const [images, setImages] = useState([]);
  const [presentationImages, setPresentationImages] = useState([]);

  // productPhotos, presentationPhotos 

  const presentationalPhotosRef = useRef()
  useEffect(() => {
    if (popupOpen === 'presentationPhotos') {
      presentationalPhotosRef.current.scrollIntoView({behavior: 'smooth'})
    }
  }, [popupOpen]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setPopupOpen(false)
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  useEffect(() => {
    if (popupOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [popupOpen])

  const handleAddClick = () => {
    if (images.length === 0 && presentationImages.length === 0 ) return   
    setProductPhotos([...productPhotos, ...images])
    setPresentationPhotos([...presentationPhotos, ...presentationImages])
    setPopupOpen(false)
  }
  const handlePopupClick = (e) => {
    e.stopPropagation();
  }
  

  return (
    <div onClick={() => setPopupOpen(null)} className={s.underlay}>
      <div className={s.popup} onClick={handlePopupClick}>

        <button className={s.closeBtn} onClick={() => setPopupOpen(false)}>
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M17 1L1 17M1.00002 1L17 17" stroke="#3E5067" strokeWidth="1.5" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </button>

        <h2 className={s.mainTitle}>
          <button className={s.backBtn} onClick={() => setPopupOpen(false)} type="button">
            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5 9.5L1 5L5 0.5" stroke="#658092"/>
            </svg>
          </button>
          <span>
            {isNew ? 'Добавление медиа' : 'Обновление медиа'}
          </span>
        </h2>

        <div className={`${s.scrollableContent} lk-scroll-popup`}>
          <div className={s.innerScrollable}>

            <Requirements/>
            
            <ProductPhotosBlock productPhotos={productPhotos} images={images} setImages={setImages} />                      
                                    
            <div ref={presentationalPhotosRef} className={s.bottomDiv}>

              <PresentationPhotosBlock presentationPhotos={presentationPhotos} presentationImages={presentationImages} setPresentationImages={setPresentationImages} />
                            
            </div>
          </div>
        </div>

        <div className={s.buttons}>
          <Button onClick={() => setPopupOpen(false)} className={s.cancelBtn}>Отмена</Button>
          <Button onClick={handleAddClick} className={s.addBtn}>Добавить</Button>
        </div>
      </div>
    </div>
  );
};

export default MediaPopup;