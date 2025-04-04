import s from './ProductPhotosInPopup.module.scss';
import ProductPhotoPopupContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosBlock/ProductPhotoPopupContainer/ProductPhotoPopupContainer.jsx";

const ProductPhotosInPopup = ({productPhotos, images, emptyPhotoClickHandler, product}) => {

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
              product={product}
            />
          })
        }
      </ul>
    </div>


  );
};

export default ProductPhotosInPopup;