import s from './MediaPopup.module.scss';
import {useEffect} from "react";

const MediaPopup = ({setProductPhotos, productPhotos, setPopupOpen, popupOpen}) => {

  useEffect(() => {
    // Функция для обработки события клавиши
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') { // Проверяем, была ли нажата клавиша 'Esc'
        setPopupOpen(false)
      }
    };

    // Добавляем обработчик события 'keydown' при монтировании компонента
    window.addEventListener('keydown', handleKeyDown);

    // Убираем обработчик при размонтировании компонента
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [])

  useEffect(() => {
    if (popupOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [popupOpen])

  const addHandle = () => {
    //setProductPhotos()
  }

  const handlePopupClick = (e) => {
    e.stopPropagation();
  }

  return (
    <div onClick={() => setPopupOpen(false)} className={s.underlay}>
      <div className={s.popup} onClick={handlePopupClick}>
        popup
      </div>
    </div>
  );
};

export default MediaPopup;