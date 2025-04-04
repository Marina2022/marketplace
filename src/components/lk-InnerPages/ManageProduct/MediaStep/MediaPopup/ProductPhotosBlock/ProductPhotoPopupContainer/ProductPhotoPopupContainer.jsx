import s from './ProductPhotoPopupContainer.module.scss';
import {useParams} from "react-router-dom";

const ProductPhotoPopupContainer = ({productPhotos, images, index, emptyPhotoClickHandler, product}) => {

  const {productIdParam} = useParams()
  let isNew = true
  if (productIdParam !== 'new') isNew = false

  const editProductPhotos = product?.mediaContent.productImages

  let firstEmpty

  if (isNew) {
    firstEmpty = index === productPhotos.length + images.length;
  } else {
    firstEmpty = index === editProductPhotos.length + images.length;
  }

  let isEmpty

  if (isNew) {
    isEmpty = index >= productPhotos.length + images.length;
  } else {
    isEmpty = index >= editProductPhotos.length + images.length;
  }

  const handleClick = () => {
    // if первый пустой контейнер
    if (firstEmpty) {
      emptyPhotoClickHandler()
    }
  }

  let imgUrl = ''

  if (isNew) {
    if (index < productPhotos.length) {
      imgUrl = productPhotos[index]?.preview
    } else {
      imgUrl = images[index - productPhotos.length]?.preview
    }
  }

  if (!isNew) {
    if (index < editProductPhotos.length) {
      imgUrl = editProductPhotos[index]?.imagePath
    } else {
      imgUrl = images[index - editProductPhotos.length]?.preview
    }  
  }

  return (
    <li className={`${s.productPhotoContainer} ${firstEmpty ? s.firstEmpty : ''}`} onClick={handleClick}>
      {
        !isEmpty && <img className={s.image} src={imgUrl} alt="image"/>
      }
    </li>
  )
}
export default ProductPhotoPopupContainer;