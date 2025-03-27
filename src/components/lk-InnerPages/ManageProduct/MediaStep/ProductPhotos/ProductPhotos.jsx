import s from './ProductPhotos.module.scss';
import Button from "@/components/ui/Button/Button.jsx";
import ProductPhotoContainer
  from "@/components/lk-InnerPages/ManageProduct/MediaStep/ProductPhotos/ProductPhotoContainer/ProductPhotoContainer.jsx";

const ProductPhotos = ({productPhotos, setPopupOpen, setProductPhotos}) => {

  const placeholders = Array.from({length: 15})

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
              // key={i} потестить потом todo
              return <ProductPhotoContainer key={i} productPhotos={productPhotos} index={i} setPopupOpen={setPopupOpen} />
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

  );
};

export default ProductPhotos;