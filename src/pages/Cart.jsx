import {useSelector} from "react-redux";
import {getCart} from "@/store/cartSlice.js";
import ProductPage from "@/components/ProductPage/ProductPage.jsx";
import CartPage from "@/components/CartPage/CartPage.jsx";

const Cart = () => {

  return (
    <CartPage/>
  );
  
  
  // const cart = useSelector(getCart)    
  // return (
  //     <div className='container'>
  //       {
  //         cart.map((item, i)=>{
  //           return (
  //               <div key={i}>
  //                 <span>{item.id} - </span>
  //                 <span>{item.count}шт</span>
  //               </div>
  //           )        
  //         })
  //       }
  //     </div>
  // );
};

export default Cart;