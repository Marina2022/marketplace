import s from './RightSidebar.module.scss';
import AddToCart from "@/components/ProductPage/AddToCart/AddToCart.jsx";
import WriteToSeller from "@/components/ProductPage/RightSidebar/WriteToSeller/WriteToSeller.jsx";
import VendorInfo from "@/components/ProductPage/RightSidebar/VendorInfo/VendorInfo.jsx";

const RightSidebar = ({product, sku}) => {
  return (
    <div className={s.rightSidebar}>
      <AddToCart product={product} sku={sku} />
      {
        product.productVendor.isContactShown && <WriteToSeller seller={product.productVendor} />
      }     
      
      {
        product.productVendor.isSideInfoShown && <VendorInfo vendor={product.productVendor} />
      }            
    </div>
  );
};

export default RightSidebar;