import {useSelector} from "react-redux";
import {getCart} from "@/store/cartSlice.js";

const Cart = () => {
  
  const cart = useSelector(getCart)
  
  
  return (
      <div className='container'>
        {
          cart.map((item, i)=>{
            return (
                <div key={i}>
                  <span>{item.id} - </span>
                  <span>{item.count}шт</span>
                </div>
            )
          })
        }
      </div>
  );
};

export default Cart;