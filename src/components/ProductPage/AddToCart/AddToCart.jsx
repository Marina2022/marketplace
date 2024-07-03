import s from './AddToCart.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {addToCart, getCart} from "@/store/cartSlice.js";
// import CartInput from "@/components/ui/CartInput/CartInput.jsx";
import Button from "@/components/ui/Button/Button.jsx";


const AddToCart = ({product}) => {

  console.log('product.productVariantId', product.productVariantId)

  const dispatch = useDispatch()
  const onAddToCartClick = (id, quantity) => dispatch(addToCart({id, quantity}))
  const productsInCart = useSelector(getCart)
  const productInCart = productsInCart.find(item => item.id === product.productVariantId)
  let quantity

  if (productInCart) {
    quantity = productInCart.count
  } else {
    quantity = 0
  }

  const isInCart = quantity > 0


  return (
    <div className={s.addToCart}>
      <div className={s.priceWrapper}>
        <div className={s.regularPrice}>
          {product.regularPrice}{' '}₽
        </div>
        <div className={s.price}>
          {product.price}{' '}₽
        </div>
      </div>
      
      
      {/*<div className={s.btnWrapper}>*/}
      {/*  {*/}
      {/*    isInCart && (*/}
      {/*      <CartInput product={product} value={quantity}/>*/}
      {/*    )*/}
      {/*  }*/}
      
        {
          !isInCart && <Button className={s.toCartBtn}
                               onClick={() => onAddToCartClick(product.productVariantId, 1)}>Добавить&nbsp;в&nbsp;корзину</Button>
        }
      
      {/*</div>*/}
    </div>
  );
};

export default AddToCart;