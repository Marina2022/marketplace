import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";
import {useState} from "react";
import s from './LkShopPage.module.scss'

const LkShopPage = () => {
  
  const navigate = useNavigate()
  
  const [productVariantId, setProductVariantId] = useState('0dc76b67-165c-4491-8637-11ab5ae2a80c')
  
  return (
    <div>
      <p>
        LkShopPage
      </p>
      <br/>
      <Button onClick={()=>navigate('/lk/edit-product/new')} >Создать&nbsp;товар</Button>
      
      <br/>
      <br/>
      
      ******************************************************************************************

      <p>productVariantId:</p>      
      <input className={s.input} type="text" placeholder="productVariantId" value={productVariantId} onChange={(e)=>setProductVariantId(e.target.value)} />
      <Button onClick={()=>navigate(`/lk/edit-product/${productVariantId}`)} >Редактировать&nbsp;товар</Button>
      
    </div>
  );
};

export default LkShopPage;