import s from './Popup.module.scss';
import {useEffect, useRef} from "react";
import closeBtn from '@/assets/img/closeBtn.svg'

const Popup = ({onPopupClose, setIsPopupOpen, popupClassName = "", children, withCloseBtn = false, underlay=true}) => {

  const popupRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setIsPopupOpen(false);
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      if (onPopupClose) {
        onPopupClose()
      }
    };
  }, []);

// клик вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setIsPopupOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className={s.wrapper}>
      <div onClick={() => setIsPopupOpen(false)} className={ underlay ?  s.underlay : ''}></div>
      <div ref={popupRef} className={`${s.popup} ${popupClassName}`}>
        {
          withCloseBtn &&
          <button onClick={() => setIsPopupOpen(false)} className={s.closeBtn}><img src={closeBtn} alt="close"/>
          </button>
        }
        {children}
      </div>
    </div>
  );
};

export default Popup;