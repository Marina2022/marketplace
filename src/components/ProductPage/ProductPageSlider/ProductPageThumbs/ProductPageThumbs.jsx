import s from './ProductPageThumbs.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
const ProductPageThumbs = ({images, currentImage, setCurrentImage}) => {

  const imagesToShow = images.slice(0, 6)
  const thumbnailClickHandler = (index) => {
    setCurrentImage(index)
  }

  const rest = images.length - 6;

  return (
      <div className={s.wrapper}>
        <ul className={s.thumbnails}>
          {
            imagesToShow.map((image, i) => (
                <li className={i === currentImage ? s.currentThumbnail : s.thumbnail} key={i}
                    onClick={() => thumbnailClickHandler(i)}>
                  <img className={s.thumbnailImage} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
                </li>
            ))
          }
        </ul>
        {
            rest > 0 && <div className={s.more}>
              Еще {rest}
            </div>
        }
      </div>
  );
};

export default ProductPageThumbs;