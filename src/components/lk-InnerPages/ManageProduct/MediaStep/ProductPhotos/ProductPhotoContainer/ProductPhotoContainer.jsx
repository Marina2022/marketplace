import s from './ProductPhotoContainer.module.scss';
import cameraIcon from '@/assets/img/lk/lk-shop/camera.svg';
import {useParams} from "react-router-dom";

const ProductPhotoContainer = ({ index, productPhotos, setPopupOpen, setProductPhotos, product}) => {

  const {productIdParam} = useParams()
  const isNew = productIdParam === 'new'

  const editProductPhotos = product?.mediaContent.productImages  
  const currentProductImage = product?.mediaContent.productImages[index]
  
  const firstEmpty = index === productPhotos.length;
  
  let isEmpty
  
  if (isNew) {
    isEmpty = index >= productPhotos.length;  
  } else {
    isEmpty = index >= editProductPhotos.length;
  }
  
  const handleClick = () => {
    if (firstEmpty) {
      setPopupOpen('productPhotos');
    }
  };

  const handleDelete = () => {
    const newPhotosArray = productPhotos.filter((photo, i) => i !== index);
    setProductPhotos(newPhotosArray);
  };

  const handleDragStart = (e, index) => {    
    // Сохраняем индекс перетаскиваемого элемента в dataTransfer
    e.dataTransfer.setData('index', index);
  };

  const handleDragOver = (event) => {
    event.preventDefault(); // Нужно, чтобы работало drop
  };

  const handleDrop = (event, index) => {
    // Получаем индекс перетаскиваемого элемента
    const draggedIndex = event.dataTransfer.getData('index');
    
    //console.log('handleDrop, index, на который притащили = ', index, '. индекс, который тащим = ', draggedIndex);

    if (draggedIndex === null || draggedIndex === index) return; // Если перетаскиваем на тот же элемент, ничего не делаем
    const updatedImages = [...productPhotos];
    
    const [movedItem] = updatedImages.splice(draggedIndex, 1);
    updatedImages.splice(index, 0, movedItem);
       
    setProductPhotos(updatedImages);  // в случае с edit, здесь будет отправка запроса на смену индекса элемента (и всего массива фоток)
  };

  return (
    <li
      className={`${s.productPhotoContainer} ${!isEmpty ? s.containerWithPhoto : ''} ${firstEmpty ? s.firstEmpty : ''}`}
      onClick={handleClick}
      onDragOver={handleDragOver}
      onDrop={(e) => handleDrop(e, index)} // Перетаскивание на контейнер
    >
      {!isEmpty && (
        <button className={s.mobileDeleteBtn} onClick={handleDelete} type="button">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13 1L1 13M1.00001 1L13 13"
              stroke="#3E5067"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      )}

      {!isEmpty && (
        <button onClick={handleDelete} type="button" className={s.deleteBtn}>
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M13.1272 4.2063C13.1147 4.2063 13.096 4.2063 13.0772 4.2063C9.77099 3.87505 6.47099 3.75005 3.20224 4.0813L1.92724 4.2063C1.66474 4.2313 1.43349 4.0438 1.40849 3.7813C1.38349 3.5188 1.57099 3.2938 1.82724 3.2688L3.10224 3.1438C6.42724 2.8063 9.79599 2.93755 13.171 3.2688C13.4272 3.2938 13.6147 3.52505 13.5897 3.7813C13.571 4.02505 13.3647 4.2063 13.1272 4.2063Z"
              fill="#3E5067"
            />
            <path
              d="M5.31296 3.575C5.28796 3.575 5.26296 3.575 5.23171 3.56875C4.98171 3.525 4.80671 3.28125 4.85046 3.03125L4.98796 2.2125C5.08796 1.6125 5.22546 0.78125 6.68171 0.78125H8.31921C9.78171 0.78125 9.91921 1.64375 10.013 2.21875L10.1505 3.03125C10.1942 3.2875 10.0192 3.53125 9.76921 3.56875C9.51296 3.6125 9.26921 3.4375 9.23171 3.1875L9.09421 2.375C9.00671 1.83125 8.98796 1.725 8.32546 1.725H6.68796C6.02546 1.725 6.01296 1.8125 5.91921 2.36875L5.77546 3.18125C5.73796 3.4125 5.53796 3.575 5.31296 3.575Z"
              fill="#3E5067"
            />
            <path
              d="M9.50747 14.2187H5.49497C3.31372 14.2187 3.22622 13.0125 3.15747 12.0375L2.75122 5.74374C2.73247 5.48749 2.93247 5.26249 3.18872 5.24374C3.45122 5.23124 3.66997 5.42499 3.68872 5.68124L4.09497 11.975C4.16372 12.925 4.18872 13.2812 5.49497 13.2812H9.50747C10.82 13.2812 10.845 12.925 10.9075 11.975L11.3137 5.68124C11.3325 5.42499 11.5575 5.23124 11.8137 5.24374C12.07 5.26249 12.27 5.48124 12.2512 5.74374L11.845 12.0375C11.7762 13.0125 11.6887 14.2187 9.50747 14.2187Z"
              fill="#3E5067"
            />
            <path
              d="M8.53438 10.7812H6.45313C6.19688 10.7812 5.98438 10.5687 5.98438 10.3125C5.98438 10.0563 6.19688 9.84375 6.45313 9.84375H8.53438C8.79063 9.84375 9.00313 10.0563 9.00313 10.3125C9.00313 10.5687 8.79063 10.7812 8.53438 10.7812Z"
              fill="#3E5067"
            />
            <path
              d="M9.0625 8.28125H5.9375C5.68125 8.28125 5.46875 8.06875 5.46875 7.8125C5.46875 7.55625 5.68125 7.34375 5.9375 7.34375H9.0625C9.31875 7.34375 9.53125 7.55625 9.53125 7.8125C9.53125 8.06875 9.31875 8.28125 9.0625 8.28125Z"
              fill="#3E5067"
            />
          </svg>
        </button>
      )}

      {!isEmpty && (
        <div
          className={s.imgWrapper}
          draggable
          onDragStart={(e) => handleDragStart(e, index)} 
        >
          <img className={s.image} src={ isNew ? productPhotos[index].preview : currentProductImage.imagePath  } alt="image" />
        </div>
      )}

      {isEmpty && index === 0 && <img src={cameraIcon} alt="icon" />}
    </li>
  );
};

export default ProductPhotoContainer;
