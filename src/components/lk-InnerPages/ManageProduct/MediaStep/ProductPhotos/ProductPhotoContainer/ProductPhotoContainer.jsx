import s from './ProductPhotoContainer.module.scss';

const ProductPhotoContainer = ({index, productPhotos, setPopupOpen}) => {
  
  const firstEmpty = index === productPhotos.length
  
  const isEmpty = index >=productPhotos.length
  const handleClick = () => {

    // if первый пустой контейнер
    if (firstEmpty) {
      setPopupOpen('productPhotos')
    }
  }


  return (
    <li className={`${s.productPhotoContainer} ${firstEmpty ? s.firstEmpty : ''}`} onClick={handleClick}>
      {
        !isEmpty && <img className={s.image} src={productPhotos[index].preview} alt="image"/>
      }
      
      
    </li>
  );
};

export default ProductPhotoContainer;