import s from './ProductPageThumbs.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";

const ProductPageThumbs = ({images, currentImage, setCurrentImage, setSliderPopupIsOpen}) => {

  const imagesToShow = images.slice(0, 6)
  const thumbnailClickHandler = (index) => {
    console.log('клик и сет на image #', index)
    setCurrentImage(index)
  }

  const rest = images.length - 6;

  return (
    <div className={s.thumbsWrapper}>
      <ul className={s.thumbnails}>
        {
          imagesToShow.map((image, i) => (
            <li className={i === currentImage ? s.currentThumbnail : s.thumbnail} key={i}
                onClick={
                  () => thumbnailClickHandler(i)                  
                }>
              <img className={s.thumbnailImage} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
            </li>
          ))
        }
      </ul>
      {
        rest > 0 && <div className={s.more} onClick={() => setSliderPopupIsOpen(true)}>
          Еще {rest}
        </div>
      }
    </div>
  );
};

export default ProductPageThumbs;