import s from './ProductPhotoPopupContainer.module.scss';
import {useParams} from "react-router-dom";

const ProductPhotoPopupContainer = ({productPhotos, images, index, emptyPhotoClickHandler}) => {

  const {productIdParam} = useParams()
  let isNew = true
  if (productIdParam !== 'new') isNew = false

  const isEmpty = index >= productPhotos.length + images.length

  const firstEmpty = index === productPhotos.length + images.length
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

  return (
    <li className={`${s.productPhotoContainer} ${firstEmpty ? s.firstEmpty : ''}`} onClick={handleClick}>

      {
        !isEmpty && <img className={s.image} src={imgUrl} alt="image"/>
      }

    </li>
  )
}
export default ProductPhotoPopupContainer;