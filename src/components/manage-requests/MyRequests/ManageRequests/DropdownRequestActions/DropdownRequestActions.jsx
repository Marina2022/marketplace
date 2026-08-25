import s from './DropdownRequestActions.module.scss';
import {useEffect, useRef, useState} from "react";
import {requestCardMenuButton} from "@/consts/requests.jsx";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {setTabs} from "@/store/tabsSlice.js";

const DropdownRequestActions = ({
                                  request,
                                  onClose,
                                  performAction,
                                  menuBtnRef,
                                  resetRequest=null,
                                  inMobileHeader = false
                                }) => {


  // console.log("request = ", request.status.code === "inprogress")
  const dropdownRef = useRef(null);

  const [isTop, setIsTop] = useState(false);
  const isMobile = useMobileScreen()


  useEffect(() => {
    if (!dropdownRef.current) return;

    const rect = dropdownRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    let ourHeight = viewportHeight
    if (isMobile) ourHeight = viewportHeight - 56
    if (rect.bottom > ourHeight) {
      setIsTop(true);
    } else {
      setIsTop(false);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuBtnRef && menuBtnRef.current.contains(event.target)) return

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


  const handleClick = async (action) => {
    try {
      await performAction(action, resetRequest)
      onClose()
    } catch (err) {
      console.log(err)

      // 	message + подсказка «открепите исполнителей» на InProgress-заявке - потестить бы на реальной ошибке
      if (
        (err.response?.data?.errors?.[0]?.code === "Request.CannotCancel"
       || err.response?.data?.errors?.[0]?.code === "Request.CannotComplete")
        && request.status.code === "inprogress"
      )  {
        showErrorToast(err.response?.data?.errors?.[0].message + "\n" + "Открепите исполнителей")
        return
      }

      if (err.response && err.response.status === 400) {
        err.response.data.errors.forEach((dataItem) => {
          showErrorToast(dataItem.message)
        })
        return
      }
      showErrorToast("Что-то пошло не так :(")
    }
  }

  return (

    <div className={`${s.wrapper} ${inMobileHeader ? s.inMobileHeaderWrapper : ''}`}>
      <ul className={`${s.dropdownRequestActions}  ${isTop ? s.top : ''}`} ref={dropdownRef}
          onClick={(e) => e.stopPropagation()}>
        {
          request.actions.secondaryActions.map((action, index) => {
              const currentItem = requestCardMenuButton.find(act => act.action === action)
              if (!currentItem) return null
              return (
                <li className={s.menuItem} key={index} onClick={() => handleClick(action)}>
                  <div className={s.svgDiv}>{currentItem.svg}</div>
                  <div>{currentItem.label}</div>
                </li>
              )
            }
          )
        }
      </ul>
    </div>
  )
}

export default DropdownRequestActions;