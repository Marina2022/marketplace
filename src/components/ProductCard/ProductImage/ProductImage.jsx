import s from './ProductImage.module.scss';
import Badge from "@/components/ui/Badge/Badge.jsx";

const ProductImage = ({product, orientation}) => {

  const base_url = 'https://i-rif.com/'

  const hoverHandler = () => {
    console.log('hover')
  }

  return (

      <div className={orientation === "vertical" ? s.imgCardVer : s.imgCardHor}>
        <div onMouseEnter={hoverHandler} className={s.slider}>
          <img className={s.testImg} src={`${base_url}${product.images[0]?.imageUrl}`} alt=""/>
        </div>

        <div className={s.badgeContainer}>
          <div className={s.badgeInnerContainer}>           

            {
              product.isSecondHand && <Badge bgColor="#E32636">Б\У</Badge> 
            }

            {
              product.isDiscounted && <Badge bgColor="#4D9ACA">Уцененный</Badge> 
            }
            
          </div>
          <div>
            {
                product.discount && <Badge bgColor="#FF3104">-{product.discount}%</Badge>
            }
          </div>
        </div>
      </div>

  );
};

export default ProductImage;