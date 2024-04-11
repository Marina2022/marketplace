import s from './MobileFiltersPopup.module.scss';

const MobileFiltersPopup = ({isOpen, setIsOpen, children, }) => {
  return (
      isOpen && <div>
        <div onClick={() => setIsOpen(false)} className={s.overlay}>
          <div className={s.globalWrapper} onClick={(e) => e.stopPropagation()}>
            <h2 className={s.title}>Фильтры</h2>
            <button onClick={() => setIsOpen(false)}>
              <svg className={s.btn} width="16" height="16" viewBox="0 0 16 16" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd"
                      d="M1.07108 0.928922C0.582923 1.41708 0.582923 2.20853 1.07108 2.69669L6.37436 7.99997L1.07105 13.3033C0.582898 13.7914 0.582897 14.5829 1.07105 15.0711C1.55921 15.5592 2.35066 15.5592 2.83882 15.0711L8.14213 9.76774L13.4454 15.0711C13.9336 15.5592 14.7251 15.5592 15.2132 15.0711C15.7014 14.5829 15.7014 13.7914 15.2132 13.3033L9.9099 7.99997L15.2132 2.69668C15.7013 2.20853 15.7013 1.41707 15.2132 0.928917C14.725 0.440762 13.9336 0.440763 13.4454 0.928917L8.14213 6.23221L2.83885 0.928922C2.35069 0.440766 1.55923 0.440766 1.07108 0.928922Z"
                      fill="#3E5067"/>
              </svg>

            </button>            
            {children}
          </div>
        </div>
      </div>
  )
}

export default MobileFiltersPopup;