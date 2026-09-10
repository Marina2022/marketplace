import s from './MessageContextMenu.module.scss';
import {useEffect, useLayoutEffect, useRef, useState} from "react";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useDispatch} from "react-redux";
import {setEditingMessage} from "@/store/chatSlice.js";
import {has24HoursPassed} from "@/utils/chat.js";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";

const MessageContextMenu = ({
                              message,
                              onClose,
                              isMine = false,
                            }) => {

  let catEdit = false

  if (!message.sendingStatus || message.sendingStatus === "success") {
    catEdit = true
  }


  const dropdownRef = useRef(null);

  const [isTop, setIsTop] = useState(false);
  const isMobile = useMobileScreen()

  const dispatch = useDispatch()

  useLayoutEffect(() => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let ourHeight = viewportHeight - 80
    if (isMobile) ourHeight = viewportHeight - 56 - 80
    if (rect.bottom > ourHeight) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {

      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)

      ) {
        onClose()
      }
    }

    const handleEsc = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEsc);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEsc);
    };
  }, []);


  const handleEdit = async () => {

    if (has24HoursPassed(message.createdAt)) {
      showErrorToast("Редактирование доступно только в течение 24 часов после отправки сообщения.")
      return
    }

    if (!message.text) {
      showErrorToast("Можно редактировать только сообщения с текстом")
      return
    }

    dispatch(setEditingMessage(message))
    onClose()
  }

  const handleCopy = () => {
    const textToCopy = message.text

    navigator.clipboard.writeText(textToCopy)
      .then(() => {
      })
      .catch((err) => {
        // Обработка ошибки, если доступ запрещен
        console.log("Ошибка копирования: ", err)
      })
      .finally(() => {
        onClose();
      });
  };

  return (

    <div className={s.wrapper}>
      <ul className={`${s.dropdown}  ${isTop ? s.top : ''}`} ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}>
        {
          isMine && catEdit && (
            <li className={s.menuItem} onClick={() => handleEdit()}>
              <div className={s.svgDiv}>
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4.91016 2.61719H9.98288L13.9102 6.54446V15.3808H4.91016V2.61719Z" stroke="#3D4A66"
                        strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9.81641 2.61719V6.54446H13.9073" stroke="#3D4A66" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
              </div>
              <div>Редактировать</div>
            </li>
          )
        }

        <li className={s.menuItem} onClick={handleCopy}>
          <div className={s.svgDiv}>
            <svg width="17" height="17" viewBox="0 0 17 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M8.4987 1.89062L14.1654 3.9684V7.3684C14.1654 10.5795 11.9931 12.7517 8.4987 13.9795C5.00425 12.7517 2.83203 10.5795 2.83203 7.3684V3.9684L8.4987 1.89062Z"
                stroke="#3D4A66" strokeLinejoin="round"/>
              <path d="M6.14062 8.49826L7.74618 10.1038L11.0517 6.60938" stroke="#3D4A66" strokeLinecap="round"
                    strokeLinejoin="round"/>
            </svg>
          </div>
          <div>Копировать</div>
        </li>
      </ul>
    </div>
  )
}

export default MessageContextMenu;