import s from './ProductPhotosInPopup.module.scss';
import ProductPhotoContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/ProductPhotos/ProductPhotoContainer/ProductPhotoContainer.jsx";
import ProductPhotoPopupContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosInPopup/ProductPhotoPopupContainer/ProductPhotoPopupContainer.jsx";

const ProductPhotosInPopup = ({productPhotos, images, emptyPhotoClickHandler}) => {

  const placeholders = Array.from({length: 15})
  return (
    <div>
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


      {/*{*/}
      {/*  images.length > 0 && (*/}
      {/*    <div className={s.previewList}>*/}
      {/*      {images.map((image, index) => (*/}
      {/*        <img*/}
      {/*          key={index}*/}
      {/*          src={image.preview}*/}
      {/*          alt="preview"*/}
      {/*          className={s.previewImg}*/}
      {/*        />*/}
      {/*      ))}*/}
      {/*    </div>*/}
      {/*  )*/}
      {/*}*/}

    </div>
  );
};

export default ProductPhotosInPopup;