import s from './WarningPopup.module.scss';
import {useEffect} from "react";
import warningIcon from '@/assets/img/lk/lk-shop/warning.svg'
import Button from "@/components/ui/Button/Button.jsx";
import {useNavigate} from "react-router-dom";

const WarningPopup = ({setShowWarningPopup, showWarningPopup}) => {

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        setShowWarningPopup(false)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [])

  useEffect(() => {
    if (showWarningPopup) {
      document.documentElement.style.overflow = "hidden"
    } else {
      document.documentElement.style.overflow = ""
    }
    return () => {
      document.documentElement.style.overflow = ""
    };
  }, [showWarningPopup])

  const handlePopupClick = (e) => {
    e.stopPropagation()
  }
  
  const navigate = useNavigate()

  return (
    <div onClick={() => setShowWarningPopup(false)} className={s.underlay}>
      <div className={s.popup} onClick={handlePopupClick}>
        <div className={s.warningPopupTop}>
          <div>
            <div className={s.title}>В карточке есть не сохраненные изменения</div>
            <div className={s.text}>Если закрыть страницу придется заполнять карточку заново</div>            
            <div className={s.buttons}>
              <Button onClick={()=>setShowWarningPopup(false)} className={s.returnBtn}>Вернуться к карточке</Button>
              <Button onClick={()=>navigate(`/lk/shop`)} className={s.exitBtn}>Выйти и не сохранять</Button>              
            </div>
          </div>
          <img className={s.warningIcon} src={warningIcon} alt="warning"/>
        </div>
      </div>
    </div>
  )
}

export default WarningPopup;