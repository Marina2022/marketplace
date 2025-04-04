import s from './ProductPhotosBlock.module.scss';
import cameraIcon from "@/assets/img/lk/lk-shop/camera.svg";
import ProductPhotosInPopup
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosBlock/ProductPhotosInPopup/ProductPhotosInPopup.jsx";
import {useDropzone} from "react-dropzone";
import {useParams} from "react-router-dom";

const ProductPhotosBlock = ({images, setImages, productPhotos, product}) => {

  const {productIdParam} = useParams()
  const isNew = productIdParam === 'new'
  const editProductPhotos = product?.mediaContent.productImages

  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );

    const totalImages = images.length + newImages.length;

    // Ограничиваем общее количество изображений до 15
    
    const lengthToCount = isNew ? productPhotos.length : editProductPhotos.length
    
    // if (totalImages > 15 - productPhotos.length) {
    if (totalImages > 15 - lengthToCount) {
      // const allowedNewImages = newImages.slice(0, 15 - productPhotos.length - images.length);
      const allowedNewImages = newImages.slice(0, 15 - lengthToCount - images.length);
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
  const emptyPhotoClickHandler = () => {
    getInputProps().ref.current.click()
  }
  
  return (
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
        product={product}
      />
    </div>
  );
};

export default ProductPhotosBlock;