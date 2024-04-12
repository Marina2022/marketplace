import s from './ProductImage.module.scss';

const ProductImage = ({product}) => {

  const base_url = 'https://i-rif.com/'
  
  return (
      <div>
        <img className={s.imgCardHor} src={`${base_url}${product.images[0]?.imageUrl}`} alt=""/>
      </div>
  );
};

export default ProductImage;