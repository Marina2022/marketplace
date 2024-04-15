import {useParams} from "react-router-dom";
const Product = () => {
  const {slug} = useParams()  
  return (
      <div className='container'>
        Product - {slug}
      </div>
  );
};

export default Product;