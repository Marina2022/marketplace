import s from './Popup.module.scss';
import {useEffect} from "react";
import closeBtn from '@/assets/img/closeBtn.svg'
const Popup = ({setIsPopupOpen, popupClassName, children, withCloseBtn = false}) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={s.wrapper}>      
      <div onClick={() => setIsPopupOpen(false)} className={s.underlay}></div>
      <div className={`${s.popup} ${popupClassName}`}>
        {
          withCloseBtn && <button onClick={()=>setIsPopupOpen(false)} className={s.closeBtn}><img src={closeBtn} alt="close"/></button>
        }
        {children}
      </div>
    </div>
  );
};

export default Popup;