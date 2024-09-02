import s from './Login.module.scss';
import {useState} from "react";
import Popup from "@/components/ui/Popup/Popup.jsx";


const Login = () => {
  
  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  return (
    <div>
      <div className={s.menuItemLabel}>Войти</div>

      {
        isPopupOpen && <Popup setIsPopupOpen={setIsPopupOpen}>
        
        helklllkjksdjf0
        
        </Popup>
      }
      
    </div>
  );
};

export default Login;