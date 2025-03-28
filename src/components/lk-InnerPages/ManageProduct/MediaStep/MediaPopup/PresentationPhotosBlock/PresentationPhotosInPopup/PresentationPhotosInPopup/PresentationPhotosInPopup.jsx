import s from './PresentationPhotosInPopup.module.scss';
import ProductPhotoPopupContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosBlock/ProductPhotoPopupContainer/ProductPhotoPopupContainer.jsx";
import PresentationPhotosPopupContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/PresentationPhotosBlock/PresentationPhotosPopupContainer/PresentationPhotosPopupContainer.jsx";

const PresentationPhotosInPopup = ({productPhotos, images, emptyPhotoClickHandler}) => {

  const placeholders = Array.from({length: 5})
  return (

    <div className={s.mobileScrollWrapper}>
      <ul className={s.photosWrapper}>
        {
          placeholders.map((placeholder, i) => {
            return <PresentationPhotosPopupContainer
              key={i}
              productPhotos={productPhotos}
              images={images}
              index={i}
              emptyPhotoClickHandler={emptyPhotoClickHandler}
            />
          })
        }
      </ul>
    </div>
  );
};

export default PresentationPhotosInPopup;