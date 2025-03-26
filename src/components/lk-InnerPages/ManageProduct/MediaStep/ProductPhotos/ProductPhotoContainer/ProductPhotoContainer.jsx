import s from './ProductPhotoContainer.module.scss';

const ProductPhotoContainer = ({index, productPhotos, setPopupOpen}) => {

  const firstEmpty = index === productPhotos.length
  const handleClick = () => {

    // if первый пустой контейнер
    if (firstEmpty) {
      setPopupOpen(true)
    }
  }


  return (
    <li className={`${s.productPhotoContainer} ${firstEmpty ? s.firstEmpty : ''}`} onClick={handleClick}>
      {index}
    </li>
  );
};

export default ProductPhotoContainer;