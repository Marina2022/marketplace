import s from './ProductPhotoContainer.module.scss';

const ProductPhotoContainer = ({index, productPhotos}) => {
  return (
    <li className={s.productPhotoContainer}>
      {index}
    </li>
  );
};

export default ProductPhotoContainer;