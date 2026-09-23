import s from './YearFilter.module.scss';
import {useEffect, useRef, useState} from "react";

const YearFilter = ({years, year, setYear}) => {

  const [yearsDropdownOpen, setYearsDropdownOpen] = useState(false)
  const dropdownRef = useRef(null);

  // клик ВНЕ + закрываем дропдаун фильтра при ресайзе
  useEffect(() => {
    if (!yearsDropdownOpen) return

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setYearsDropdownOpen(false)
      }
    }

    const handleClickOutside = (e) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target) &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target)
      ) {
        setYearsDropdownOpen(false)
      }
    }

    const handleResize = () => {
      setYearsDropdownOpen(false)
    }

    document.addEventListener('keydown', handleKeyDown)
    document.addEventListener('mousedown', handleClickOutside)
    window.addEventListener('resize', handleResize)

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('mousedown', handleClickOutside)
      window.removeEventListener('resize', handleResize)
    }
  }, [yearsDropdownOpen])

  const triggerRef = useRef(null)
  const [rightPosition, setRightPosition] = useState(0);

  const handleOpen = () => {
      if (triggerRef.current) {
        const rect = triggerRef.current.getBoundingClientRect()
        const rightOffset = window.innerWidth - rect.right
        setRightPosition(rightOffset)
      }
      setYearsDropdownOpen(prev => !prev)
  }

  return (
    <div ref={dropdownRef} className={s.dropdownBtnWrapper}>
      <li ref={triggerRef} className={`${s.tab} ${s.yearFilter}  ${year ? s.tabActive : ''}`}
          onClick={handleOpen}
      >
        <span>Год заявки</span>
        <svg width="8" height="4" viewBox="0 0 8 4" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M4 4C3.67695 4 3.35391 3.87438 3.10932 3.6278L0.100375 0.594359C-0.0334583 0.459436 -0.0334583 0.236115 0.100375 0.101192C0.234208 -0.0337307 0.455725 -0.0337307 0.589559 0.101192L3.5985 3.13463C3.82002 3.35795 4.17998 3.35795 4.4015 3.13463L7.41044 0.101192C7.54427 -0.0337307 7.76579 -0.0337307 7.89962 0.101192C8.03346 0.236115 8.03346 0.459436 7.89962 0.594359L4.89068 3.6278C4.64609 3.87438 4.32305 4 4 4Z"
            fill="#658092"/>
        </svg>
      </li>
      {
        yearsDropdownOpen && <ul className={s.yearDropdown} style={{right: rightPosition}} >
          {
            years.map((yearItem) => {

              const active = year === yearItem.year

              const handleClick = ()=>{
                if(!active) {
                  setYear(yearItem.year)
                } else {
                  setYear(null)
                }

                setYearsDropdownOpen(false)
              }
              return (
                <li onClick={handleClick} className={`${s.yearItem} ${active ? s.yearItemActive : ''}`} key={yearItem.year}>
                  <div className={s.yearItemText}>{yearItem.year}</div>

                  {
                    active ? (
                        <svg className={s.activeProfileIcon} width="17" height="17" viewBox="0 0 17 17" fill="none"
                             xmlns="http://www.w3.org/2000/svg">
                          <path
                            d="M8.33333 0C3.74167 0 0 3.74167 0 8.33333C0 12.925 3.74167 16.6667 8.33333 16.6667C12.925 16.6667 16.6667 12.925 16.6667 8.33333C16.6667 3.74167 12.925 0 8.33333 0ZM12.3167 6.41667L7.59167 11.1417C7.475 11.2583 7.31667 11.325 7.15 11.325C6.98333 11.325 6.825 11.2583 6.70833 11.1417L4.35 8.78333C4.10833 8.54167 4.10833 8.14167 4.35 7.9C4.59167 7.65833 4.99167 7.65833 5.23333 7.9L7.15 9.81667L11.4333 5.53333C11.675 5.29167 12.075 5.29167 12.3167 5.53333C12.5583 5.775 12.5583 6.16667 12.3167 6.41667Z"
                            fill="#3D4A66"/>
                        </svg>
                    )
                      : (
                        <div className={`${s.count} ${active ? s.countActive : ""} `}>{yearItem.count}</div>
                      )
                  }
                </li>
              )
            })
          }
        </ul>
      }
    </div>
  )
}

export default YearFilter;