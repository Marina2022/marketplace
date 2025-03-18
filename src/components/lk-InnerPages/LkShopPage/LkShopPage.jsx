import s from './LkShopPage.module.scss';
import TiptapEditor from "@/components/ui/Editor/Editor.jsx";
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

      <TiptapEditor />
    </div>
  );
};

export default LkShopPage;