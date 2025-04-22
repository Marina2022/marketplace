import s from './PresentationPhotos.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import PresentationPhotoContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/PresentationPhotos/PresentationPhotosContainer/PresentationPhotoContainer.jsx";

const PresentationPhotos = ({presentationPhotos, setPresentationPhotos, setPopupOpen, product, setProduct}) => {

  const placeholders = Array.from({length: 5})
  const handleAddPhoto = () => setPopupOpen('presentationPhotos')

  return (
    <div className={s.productPhotosWrapper}>
      <div className={s.headerWrapper}>
        <h3 className={s.subtitle}>Презентационные материалы</h3>
        <Button onClick={handleAddPhoto} className={s.addPhotoBtn}>Добавить фото</Button>
      </div>
      <div className={s.mobileScrollWrapper}>
        <ul className={s.photosWrapper}>
          {
            placeholders.map((placeholder, i) => {
              return <PresentationPhotoContainer
                key={i}
                index={i}
                setPopupOpen={setPopupOpen}
                productPhotos={presentationPhotos}
                setProductPhotos={setPresentationPhotos}
                product={product}
                setProduct={setProduct}
              />
            })
          }
        </ul>
      </div>
      <div className={s.textBlock}>
        Эти изображения используются в описании товара, чтобы показать его преимущества, особенности и детали. Первое
        фото станет главным в описании. Остальные изображения можно расположить в том порядке, который лучше всего
        раскрывает особенности товара.
      </div>
    </div>
  )
}

export default PresentationPhotos;