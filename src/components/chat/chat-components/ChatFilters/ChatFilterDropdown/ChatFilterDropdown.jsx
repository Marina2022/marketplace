import s from './ChatFilterDropdown.module.scss';
import {useEffect, useRef, useState} from "react";
import {setChatFilter, setCurrentChatRequest} from "@/store/chatSlice.js";
import {useDispatch} from "react-redux";

const ChatFilterDropdown = ({currentFilterValue}) => {

  const filters = [
    {name: "all", label: "Все", text: "Все чаты с вами"},
    {name: "asCustomer", label: "Мои заявки", text: "Чаты с исполнителями"},
    {name: "asExecutor", label: "Мои отклики", text: "Ваши чаты по откликам"},
  ];

  const currentFilterDescription = filters.find(f => f.name === currentFilterValue);

  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false)
      }
    }

    const handleEsc = (e) => {
      if (e.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEsc);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEsc);
    };
  }, []);

  const dispatch = useDispatch();

  return (
    <div className={s.triggerWrapper} ref={wrapperRef}>
      <div className={s.trigger} onClick={() => setIsOpen(prev => !prev)}>
        <svg className={s.iconSvg} width="34" height="34" viewBox="0 0 34 34" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <rect width="34" height="34" rx="8" fill="#ECEFF5"/>
          <path
            d="M18.8346 7.83594H11.5013C11.0151 7.83594 10.5488 8.02909 10.2049 8.37291C9.86112 8.71672 9.66797 9.18304 9.66797 9.66927V24.3359C9.66797 24.8222 9.86112 25.2885 10.2049 25.6323C10.5488 25.9761 11.0151 26.1693 11.5013 26.1693H22.5013C22.9875 26.1693 23.4538 25.9761 23.7977 25.6323C24.1415 25.2885 24.3346 24.8222 24.3346 24.3359V13.3359L18.8346 7.83594Z"
            stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M18.832 7.83594V13.3359H24.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
          <path d="M20.6654 17.9141H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
          <path d="M20.6654 21.5859H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
          <path d="M15.1654 14.25H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
        <div className={s.desc}>
          <div className={s.filterLabel}>{currentFilterDescription.label}</div>
          <div className={s.filterText}>{currentFilterDescription.text}</div>
        </div>
        <svg className={s.arrowBtn} width="9" height="5" viewBox="0 0 9 5" fill="none">
          <path d="M0.75 0.75L4.5 4.03125L8.25 0.75" stroke="black" strokeWidth="1.5" strokeLinecap="round"
                strokeLinejoin="round"/>
        </svg>
      </div>

      {isOpen && (
        <ul className={s.filterDropdown}>
          {
            filters.map(filter => {
                const isActive = filter.name === currentFilterValue
                const handleClick = () => {
                  dispatch(setChatFilter(filter.name))
                  dispatch(setCurrentChatRequest(null))
                  setIsOpen(false)
                }
                return (
                  <li key={filter.name} className={`${s.dropdownItem} ${isActive ? s.dropdownItemActive : ""}`}
                      onClick={handleClick}>
                    <svg className={s.iconSvg} width="34" height="34" viewBox="0 0 34 34" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <rect width="34" height="34" rx="8" fill="#ECEFF5"/>
                      <path
                        d="M18.8346 7.83594H11.5013C11.0151 7.83594 10.5488 8.02909 10.2049 8.37291C9.86112 8.71672 9.66797 9.18304 9.66797 9.66927V24.3359C9.66797 24.8222 9.86112 25.2885 10.2049 25.6323C10.5488 25.9761 11.0151 26.1693 11.5013 26.1693H22.5013C22.9875 26.1693 23.4538 25.9761 23.7977 25.6323C24.1415 25.2885 24.3346 24.8222 24.3346 24.3359V13.3359L18.8346 7.83594Z"
                        stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      <path d="M18.832 7.83594V13.3359H24.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M20.6654 17.9141H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M20.6654 21.5859H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                      <path d="M15.1654 14.25H13.332" stroke="#1A2332" strokeWidth="1.5" strokeLinecap="round"
                            strokeLinejoin="round"/>
                    </svg>
                    <div className={s.desc}>
                      <div className={s.filterLabel}>{filter.label}</div>
                      <div className={s.filterText}>{filter.text}</div>
                    </div>
                  </li>
                )
              }
            )
          }
        </ul>
      )}
    </div>
  )
}

export default ChatFilterDropdown;