import s from './Popup.module.scss';
import {useEffect} from "react";

const Popup = ({setIsPopupOpen, popupClassName, children}) => {

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
        {children}
      </div>
    </div>
  );
};

export default Popup;