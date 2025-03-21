import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const LkShopPage = () => {
  
  const navigate = useNavigate()
  
  return (
    <div>
      <p>
        LkShopPage
      </p>
      <br/>
      <Button onClick={()=>navigate('/lk/edit-product/new')} >Создать&nbsp;товар</Button>
      
    </div>
  );
};

export default LkShopPage;