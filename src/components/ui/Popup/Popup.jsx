import s from './Popup.module.scss';

const Popup = ({setIsPopupOpen, popupClassName, children}) => {
  return (
    <div className={s.wrapper}>
      <div onClick={()=>setIsPopupOpen(false)} className={s.underlay}></div>
      <div className={`${s.popup} ${popupClassName}`}>
        {children}
      </div>
    </div>
  );
};

export default Popup;