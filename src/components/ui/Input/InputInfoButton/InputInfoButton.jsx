import s from './InputInfoButton.module.scss';
import Annotation from "@/components/ui/Annotation/Annotation.jsx";
import useBigScreen from "@/hooks/useBigScreen.js";
import {useState} from "react";

const InputInfoButton = () => {

  const isBigScreen = useBigScreen()

  const [showAnnotation, setShowAnnotation] = useState(false)


  const handleHoverIn = () => {
    setShowAnnotation(true)
  }
  const handleHoverOut = (e) => {
    e.stopPropagation()

    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return; // Если курсор внутри кнопки, не триггерим onMouseLeave
    }

    setShowAnnotation(false)
  }

  const handleClick = () => {
    if (!isBigScreen) return
    setShowAnnotation(prev => !prev)
    
    
  }

  return (
    <div className={s.wrapper}>

      <button
        className={s.btn}
        onMouseEnter={handleHoverIn}
        onMouseOut={handleHoverOut}
        onClick={handleClick}
        type="button">
        <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="18" rx="9" fill="#658092"/>
          <path
            d="M8.375 14.1818L8.47443 6.86364H9.62784L9.72727 14.1818H8.375ZM9.05114 3.92045C9.2964 3.92045 9.50687 4.00829 9.68253 4.18395C9.85819 4.35961 9.94602 4.57008 9.94602 4.81534C9.94602 5.06061 9.85819 5.27107 9.68253 5.44673C9.50687 5.6224 9.2964 5.71023 9.05114 5.71023C8.80587 5.71023 8.59541 5.6224 8.41974 5.44673C8.24408 5.27107 8.15625 5.06061 8.15625 4.81534C8.15625 4.65294 8.19768 4.50379 8.28054 4.3679C8.36009 4.23201 8.4678 4.12263 8.60369 4.03977C8.73627 3.96023 8.88542 3.92045 9.05114 3.92045Z"
            fill="white"/>
        </svg>
      </button>

      {
        showAnnotation && <Annotation position={!isBigScreen ? "fromLeft" : "fromRight"}>
          <p className={s.firstPar}>Укажите одинаковое значение, чтобы товары можно было объединить в одну карточку.</p>
          <p>Бренд должен совпадать, а хотя бы одна вариативная характеристика — отличаться.</p>
        </Annotation>
      }


    </div>
  );
};

export default InputInfoButton;