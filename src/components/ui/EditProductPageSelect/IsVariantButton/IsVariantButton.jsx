import s from './IsVariantButton.module.scss';
import useBigScreen from "@/hooks/useBigScreen.js";
import {useState} from "react";
import Annotation from "@/components/ui/Annotation/Annotation.jsx";

const IsVariantButton = () => {
  const isBigScreen = useBigScreen()
  const [showAnnotation, setShowAnnotation] = useState(false)
  const handleHoverIn = () => {
    if (!isBigScreen) return
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
    if (isBigScreen) return
    setShowAnnotation(prev => !prev)
  }

  return (
    <div className={s.isVariantIconDiv}>
      <button
        type="button"
        onMouseEnter={handleHoverIn}
        onMouseOut={handleHoverOut}
        onClick={handleClick}
        className={s.variantIcon}
      >
        <svg  width="18" height="18"
             viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="18" height="18" rx="9" fill="#658092"/>
          <g clipPath="url(#clip0_1085_16567)">
            <path
              d="M6.27132 8.11702C6.41374 7.97461 6.64388 7.97461 6.78516 8.11702C6.92757 8.25944 6.92757 8.48958 6.78516 8.63086L2.75309 12.6641L5.33594 15.2469L9.3737 11.2091C9.51611 11.0667 9.74626 11.0667 9.88753 11.2091C10.0299 11.3516 10.0299 11.5817 9.88753 11.7241L5.80534 15.8063L5.8042 15.8052L5.80306 15.8063C5.67318 15.9362 5.50456 16 5.3348 16C5.17757 16 5.02035 15.9442 4.89502 15.8325C4.88477 15.8245 4.87565 15.8154 4.8654 15.8063L2.19368 13.1335C2.06494 13.0036 2 12.8338 2 12.6641C2 12.4943 2.06494 12.3245 2.19368 12.1947L6.27132 8.11702ZM10.7865 6.69857C10.9289 6.55615 11.159 6.55615 11.3014 6.69857C11.4438 6.84098 11.4438 7.07113 11.3014 7.21354L7.72396 10.791C7.58154 10.9334 7.3514 10.9334 7.21012 10.791C7.06771 10.6486 7.06771 10.4185 7.21012 10.2772L10.7865 6.69857ZM11.7526 9.85905C11.6102 10.0015 11.38 10.0015 11.2376 9.85905C11.0952 9.71663 11.0952 9.48649 11.2376 9.34408L15.2469 5.3348L12.6641 2.75309L8.66276 6.75439C8.52035 6.89681 8.2902 6.89681 8.14893 6.75439C8.00651 6.61198 8.00651 6.38184 8.14893 6.24056L12.1947 2.19368C12.3245 2.06494 12.4943 2 12.6641 2C12.8338 2 13.0036 2.06494 13.1335 2.19368L15.8063 4.86654L15.8052 4.86768L15.8063 4.86882C15.9362 4.9987 16 5.16732 16 5.33708C16 5.50684 15.9351 5.6766 15.8063 5.80648L11.7526 9.85905Z"
              fill="#FEFEFE"/>
          </g>
          <defs>
            <clipPath id="clip0_1085_16567">
              <rect width="14" height="14" fill="white" transform="translate(2 2)"/>
            </clipPath>
          </defs>
        </svg>
      </button>
      {
        showAnnotation && <Annotation position={!isBigScreen ? "fromLeft" : "fromRight"}>
          <p className={s.header}>Отличительный признак</p>
          <p className={s.par}>Заполняйте это поле разными значениями для товаров, которые будут объединены в одну карточку</p>
        </Annotation>
      }
    </div>
  )
}

export default IsVariantButton;