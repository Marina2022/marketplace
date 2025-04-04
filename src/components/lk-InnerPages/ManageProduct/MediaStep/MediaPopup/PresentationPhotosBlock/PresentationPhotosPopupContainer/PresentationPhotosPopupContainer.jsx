import s from './PresentationPhotosPopupContainer.module.scss';
import {useParams} from "react-router-dom";
const PresentationPhotosPopupContainer = ({productPhotos, images, index, emptyPhotoClickHandler, product}) => {

  const {productIdParam} = useParams()
  let isNew = true
  if (productIdParam !== 'new') isNew = false

  const editPresentationPhotos = product?.mediaContent.productPresentationImages

  let firstEmpty

  if (isNew) {
    firstEmpty = index === productPhotos.length + images.length;
  } else {
    firstEmpty = index === editPresentationPhotos.length + images.length ;
  }

  let isEmpty

  if (isNew) {
    isEmpty = index >= productPhotos.length + images.length;
  } else {
    isEmpty = index >= editPresentationPhotos.length + images.length;
  }


  const handleClick = () => {
    // if первый пустой контейнер
    if (firstEmpty) {
      emptyPhotoClickHandler()
    }
  }

  let imgUrl = ''
  
  // при edit будем урлы картинок доставать по-другому
  if (isNew) {

    if (index < productPhotos.length) {
      imgUrl = productPhotos[index]?.preview
    } else {
      imgUrl = images[index - productPhotos.length]?.preview
    }
  }

  if (!isNew) {
    if (index < editPresentationPhotos.length) {
      imgUrl = editPresentationPhotos[index]?.imagePath
    } else {
      imgUrl = images[index - editPresentationPhotos.length]?.preview
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
export default PresentationPhotosPopupContainer;