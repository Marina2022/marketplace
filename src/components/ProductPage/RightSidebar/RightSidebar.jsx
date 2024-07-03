import s from './RightSidebar.module.scss';
import AddToCart from "@/components/ProductPage/AddToCart/AddToCart.jsx";

const RightSidebar = ({product}) => {
  return (
    <div className={s.rightSidebar}>
      <AddToCart product={product} />
      
    </div>
  );
};

export default RightSidebar;