import s from './PresentationPhotosInPopup.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import PresentationPhotoContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/PresentationPhotos/PresentationPhotosContainer/PresentationPhotoContainer.jsx";

const PresentationPhotos = ({presentationPhotos, setPresentationPhotos, setPopupOpen, presentationImages}) => {

  const placeholders = Array.from({length: 5})

  const handleAddPhoto = ()=>setPopupOpen(true)

  return (
    <div className={s.productPhotosWrapper}>

      <div className={s.headerWrapper}>
        <h3 className={s.subtitle}>Фотографии товара</h3>
        <Button onClick={handleAddPhoto}  className={s.addPhotoBtn}>Добавить фото</Button>
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
              />
            })
          }
        </ul>
      </div>

      <div className={s.textBlock}>
        Загрузите изображения, чтобы покупатели могли лучше рассмотреть ваш товар. Первое фото станет главным — оно
        будет отображаться в каталоге и на карточке товара. Остальные фото можно использовать для демонстрации деталей,
        упаковки или дополнительных ракурсов.
      </div>

    </div>
  )
}

export default PresentationPhotos;