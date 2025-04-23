import s from './WriteToSeller.module.scss';
import {BASE_URL} from "@/consts/baseURL.js";
import Button from "@/components/ui/Button/Button.jsx";
import {useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {useNavigate} from "react-router-dom";

const WriteToSeller = ({product, sku}) => {

  const isAuthenticated = useSelector(getIsAuthenticated)

  const navigate = useNavigate()
  const createMessage = () => {
    navigate(`${sku}/new-message`)
  }

  const seller = product.productVendor

  return (
    <div className={s.writeToSeller}>
      <h3 className={s.title}>Написать продавцу</h3>
      <div className={s.sellerDesc}>
        {/*<img className={s.avatar} src={`${BASE_URL}${seller.contactImageUrl}`} alt="seller avatar"/>*/}
        <img className={s.avatar} src={seller.contactImageUrl} alt="seller avatar"/>
        <div>
          <div className={s.name}>{seller.shopContact}</div>
          <div className={s.position}>{seller.contactPersonPosition}</div>
        </div>
      </div>
      <Button onClick={createMessage} disabled={!isAuthenticated} className={s.btn}>Написать&nbsp;сейчас</Button>
    </div>
  );
};

export default WriteToSeller;