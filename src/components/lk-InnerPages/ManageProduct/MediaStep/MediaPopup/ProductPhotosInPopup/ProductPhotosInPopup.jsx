import s from './ProductPhotosInPopup.module.scss';
import ProductPhotoPopupContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosInPopup/ProductPhotoPopupContainer/ProductPhotoPopupContainer.jsx";

const ProductPhotosInPopup = ({productPhotos, images, emptyPhotoClickHandler}) => {

  const placeholders = Array.from({length: 15})
  return (

    <div className={s.mobileScrollWrapper}>
      <ul className={s.photosWrapper}>
        {
          placeholders.map((placeholder, i) => {
            return <ProductPhotoPopupContainer
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

export default ProductPhotosInPopup;