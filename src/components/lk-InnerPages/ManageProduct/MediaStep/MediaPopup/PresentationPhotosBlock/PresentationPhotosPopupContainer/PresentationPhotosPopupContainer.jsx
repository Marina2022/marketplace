import s from './PresentationPhotosPopupContainer.module.scss';
import {useParams} from "react-router-dom";

const PresentationPhotosPopupContainer = ({productPhotos, images, index, emptyPhotoClickHandler}) => {

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

  // при edit будем урлы картинок доставать чуть иначе
  if (isNew) {

    // productPhotos - рисуем вначале списка  
    // images - за ними (это текущие, загруженные из попапа)

    // определяем какой индекс взять из какого массива:


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
export default PresentationPhotosPopupContainer;