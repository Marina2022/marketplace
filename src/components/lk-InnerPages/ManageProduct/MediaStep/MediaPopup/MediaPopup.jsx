import s from './MediaPopup.module.scss';
import {useEffect, useRef, useState} from "react";
import {useParams} from "react-router-dom";
import cameraIcon from "@/assets/img/lk/lk-shop/camera.svg";
import {useDropzone} from "react-dropzone";
import Button from "@/components/ui/Button/Button.jsx";
import ProductPhotoContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/ProductPhotos/ProductPhotoContainer/ProductPhotoContainer.jsx";
import ProductPhotosInPopup
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosInPopup/ProductPhotosInPopup.jsx";
import Requirements from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/Requirements/Requirements.jsx";

const MediaPopup = ({setProductPhotos, productPhotos, setPopupOpen, popupOpen}) => {

  const {productIdParam} = useParams()
  let isNew = true
  if (productIdParam !== 'new') isNew = false

// images - это загруженные из попапа файлы (не сохраненные в Апп еще)  - файлы с фото товаров
  const [images, setImages] = useState([]);

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
    if (images.length === 0) return   // todo - проверь, может презентац. фото загружены были, т.е. надо чтобы что-то одно хотя бы было
    setProductPhotos([...productPhotos, ...images])
    setPopupOpen(false)
  }
  const handlePopupClick = (e) => {
    e.stopPropagation();
  }
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const totalImages = images.length + newImages.length;

    // Ограничиваем общее количество изображений до 15
    if (totalImages > 15 - productPhotos.length) {
      const allowedNewImages = newImages.slice(0, 15 - productPhotos.length - images.length);
      setImages([...images, ...allowedNewImages]);
    } else {
      setImages([...images, ...newImages]);
    }
  };

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,

    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true,
  });

  // передать этот хендлер на клик фото-контейнеру
  const emptyPhotoClickHandler = () => {
    getInputProps().ref.current.click()
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

            <div className={s.productPhotosBlock}>
              <h2 className={`${s.title} mobile-hidden`}>Загрузка фото</h2>

              <div>
                <label
                  className={s.filesInput}
                  {...getRootProps()}
                >
                  <img className={s.cameraIcon} src={cameraIcon} alt="icon"/>
                  <div className={s.filesInputText}>
                    Выберите или перетащите изображения в эту область
                  </div>
                </label>
                <input
                  {...getInputProps()}
                  className={s.fileInput}
                  type="file"
                />
              </div>
              <h2 className={s.title}>Добавленные фото</h2>

              <ProductPhotosInPopup
                productPhotos={productPhotos}
                images={images}
                emptyPhotoClickHandler={emptyPhotoClickHandler}
              />
            </div>

            {/*presentationalPhotos будут тут,  не снеси случайно, настроен скролл к нему  */}
            <div ref={presentationalPhotosRef} className={s.bottomDiv}>
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