import s from './DropdownResponse.module.scss';
import {useEffect, useRef, useState} from "react";
import {showErrorToast} from "@/components/ui/ToastCustom/ToastCustom.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useNavigate} from "react-router-dom";
import axiosInstance from "@/api/axiosInstance.js";

const DropdownResponse = ({
                            request,
                            onClose,
                            menuBtnRef,
                            inMobileHeader = false
                          }) => {

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

  const handleOpenChat = () => {
    console.log("handleOpenChat")
  }

  const navigate = useNavigate()

  const handleWithdraw = async () => {
    try {
      await axiosInstance.post(`/responses/${request.requestId}/withdraw`)
      navigate(`/manage-requests/my-responses`)
    } catch (err) {
      console.log(err)
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
        <li className={s.menuItem} onClick={handleOpenChat}>
          <div className={s.svgDiv}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M4.42308 5C4.42308 5.06631 4.39876 5.12989 4.35549 5.17678C4.31221 5.22366 4.25351 5.25 4.19231 5.25C4.1311 5.25 4.07241 5.22366 4.02913 5.17678C3.98585 5.12989 3.96154 5.06631 3.96154 5C3.96154 4.9337 3.98585 4.87011 4.02913 4.82322C4.07241 4.77634 4.1311 4.75 4.19231 4.75C4.25351 4.75 4.31221 4.77634 4.35549 4.82322C4.39876 4.87011 4.42308 4.9337 4.42308 5ZM4.42308 5H4.19231M6.73077 5C6.73077 5.06631 6.70646 5.12989 6.66318 5.17678C6.6199 5.22366 6.5612 5.25 6.5 5.25C6.4388 5.25 6.3801 5.22366 6.33682 5.17678C6.29354 5.12989 6.26923 5.06631 6.26923 5C6.26923 4.9337 6.29354 4.87011 6.33682 4.82322C6.3801 4.77634 6.4388 4.75 6.5 4.75C6.5612 4.75 6.6199 4.77634 6.66318 4.82322C6.70646 4.87011 6.73077 4.9337 6.73077 5ZM6.73077 5H6.5M9.03846 5C9.03846 5.06631 9.01415 5.12989 8.97087 5.17678C8.92759 5.22366 8.8689 5.25 8.80769 5.25C8.74649 5.25 8.68779 5.22366 8.64451 5.17678C8.60124 5.12989 8.57692 5.06631 8.57692 5C8.57692 4.9337 8.60124 4.87011 8.64451 4.82322C8.68779 4.77634 8.74649 4.75 8.80769 4.75C8.8689 4.75 8.92759 4.77634 8.97087 4.82322C9.01415 4.87011 9.03846 4.9337 9.03846 5ZM9.03846 5H8.80769M0.5 7.00667C0.5 8.07333 1.19108 9.00267 2.16585 9.158C2.83477 9.26467 3.51046 9.34667 4.19231 9.404V12.5L6.76708 9.71133C6.89456 9.57377 7.06596 9.49453 7.24585 9.49C8.44684 9.45799 9.64493 9.34712 10.8335 9.158C11.8089 9.00267 12.5 8.074 12.5 7.006V2.994C12.5 1.926 11.8089 0.997335 10.8342 0.842002C9.39905 0.613811 7.95048 0.499507 6.5 0.500002C5.028 0.500002 3.58062 0.616668 2.16585 0.842002C1.19108 0.997335 0.5 1.92667 0.5 2.994V7.006V7.00667Z"
                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>Открыть чат</div>
        </li>
        <li className={s.menuItem} onClick={handleWithdraw}>
          <div className={s.svgDiv}>
            <svg width="14" height="12" viewBox="0 0 14 12" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M3.00041 6.16224C2.98722 7.03824 3.29577 7.89142 3.87341 8.57621C4.45105 9.26099 5.26199 9.73495 6.16785 9.91721C7.07372 10.0995 8.01836 9.97873 8.84061 9.57559C9.66286 9.17246 10.3118 8.51192 10.6766 7.70667C11.0414 6.90142 11.0995 6.00138 10.8411 5.16011C10.5826 4.31884 10.0235 3.58847 9.25928 3.09364C8.49503 2.59881 7.57295 2.37018 6.65037 2.44676C5.72779 2.52334 4.86188 2.90038 4.20041 3.51354M3.80041 2V3.89193H5.80041"
                stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>Отозвать отклик</div>
        </li>
      </ul>
    </div>
  )
}

export default DropdownResponse;