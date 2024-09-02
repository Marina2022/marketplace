import s from './Login.module.scss';
import {useState} from "react";
import Popup from "@/components/ui/Popup/Popup.jsx";
import userIcon from "@/assets/img/header/userMenu/user.svg";
import InputPhone from "@/components/layout/Header/Login/InputPhone/InputPhone.jsx";
import InputCode from "@/components/layout/Header/Login/InputCode/InputCode.jsx";

const Login = () => {

  const [isPopupOpen, setIsPopupOpen] = useState(false)
  
  const [step, setStep] = useState(1)  // 1,2

  return (
    <div>      
      <button onClick={()=>setIsPopupOpen(true)} className={s.menuItemLink}>
        <div className={s.menuItemImgWrapper}>
          <img className={s.menuItemImg} src={userIcon} alt="login"/>
        </div>
        <div className={s.loginBtn}>Войти</div>
      </button>
      {
        isPopupOpen && <Popup setIsPopupOpen={setIsPopupOpen}>

          {
            step === 1 && <InputPhone setIsPopupOpen={setIsPopupOpen}  />
          }


          {
            step === 2 && <InputCode setStep={setStep}  />
          }

        </Popup>
      }

    </div>
  );
};

export default Login;