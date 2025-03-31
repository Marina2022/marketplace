import s from './ProductPhotosBlock.module.scss';
import cameraIcon from "@/assets/img/lk/lk-shop/camera.svg";
import ProductPhotosInPopup
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/ProductPhotosBlock/ProductPhotosInPopup/ProductPhotosInPopup.jsx";
import {useDropzone} from "react-dropzone";

const ProductPhotosBlock = ({images, setImages, productPhotos}) => {

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
      />
    </div>
  );
};

export default ProductPhotosBlock;