import s from './PresentationPhotosBlock.module.scss';
import cameraIcon from "@/assets/img/lk/lk-shop/camera.svg";
import {useDropzone} from "react-dropzone";
import PresentationPhotosInPopup
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/MediaPopup/PresentationPhotosBlock/PresentationPhotosInPopup/PresentationPhotosInPopup/PresentationPhotosInPopup.jsx";
import {useParams} from "react-router-dom";

const PresentationPhotosBlock = ({
                                   presentationImages: images,
                                   setPresentationImages: setImages,
                                   presentationPhotos: productPhotos,
                                   product
                                 }) => {

  const {productIdParam} = useParams()
  const isNew = productIdParam === 'new'
  const editPresentationPhotos = product?.mediaContent.productPresentationImages
  const onDrop = (acceptedFiles) => {
    const newImages = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    )

    const totalImages = images.length + newImages.length
    const lengthToCount = isNew ? productPhotos.length : editPresentationPhotos.length

    // Ограничиваем общее количество изображений до 5
    if (totalImages > 5 - lengthToCount) {
      const allowedNewImages = newImages.slice(0, 5 - lengthToCount - images.length)
      setImages([...images, ...allowedNewImages])
    } else {
      setImages([...images, ...newImages])
    }
  }

  const {getRootProps, getInputProps} = useDropzone({
    onDrop,

    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png'],
      'image/webp': ['.webp']
    },
    multiple: true,
  })

  const emptyPhotoClickHandler = () => {
    getInputProps().ref.current.click()
  }

  return (
    <div className={s.productPhotosBlock}>
      <h2 className={`${s.title} mobile-hidden`}>Загрузка презентационных изображений</h2>
      <p className={s.someText}>Обновление изображений повлияет на все связанные товары, так как они используют общие
        презентационные материалы</p>

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
      <h2 className={s.title}>Добавленные изображения</h2>

      <PresentationPhotosInPopup
        productPhotos={productPhotos}
        images={images}
        emptyPhotoClickHandler={emptyPhotoClickHandler}
        product={product}
      />
    </div>
  );
};

export default PresentationPhotosBlock;