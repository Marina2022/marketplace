import s from './ReviewImages.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
const ReviewImages = ({images}) => {
  return (
    <ul className={s.images}>
      {
        // images.map((image,i)=> <img className={s.image} key={i} src={`${BASE_URL}${image.reviewImagePath}`} alt={image.reviewImageName}/>)
        images.map((image,i)=> <img className={s.image} key={i} src={image.reviewImagePath} alt={image.reviewImageName}/>)
      }
    </ul>
  )
}
export default ReviewImages;