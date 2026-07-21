import s from './ProfileInMobileHeader.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData, logout, setActiveProfileId} from "@/store/userSlice.js";
import {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import closeBtn from "@/assets/img/header/mobileMenu/closeBtnNew.svg";

const ProfileInMobileHeader = ({setShowCloseBtn}) => {

  const userProfiles = useSelector(getUserProfilesData);
  const activeProfileId = useSelector(getActiveProfileId);
  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const userDropdownWrapperRef = useRef();

  useEffect(() => {
    if (isDropdownOpen) {
      setShowCloseBtn(true);
    } else {
      setShowCloseBtn(false);
    }
  }, [isDropdownOpen]);


  // клик вне
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        userDropdownWrapperRef.current &&
        !userDropdownWrapperRef.current.contains(event.target)
      ) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);


  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  let activeProfile;

  if (userProfiles) {
    activeProfile = userProfiles.find(item => item.profileId === activeProfileId);
  }

  let letter;
  if (activeProfile?.type === 'Company') {
    letter = 'K';
  } else {
    letter = activeProfile?.displayName?.slice(0, 1) || "-"
  }

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
    setShowCloseBtn(false);
  }

  const profileItemClickHandler = (profileId) => {
    localStorage.setItem('activeProfile', profileId)
    dispatch(setActiveProfileId(profileId))
    setIsDropdownOpen(false)
  }

  if (!userProfiles) return (
    <button
      className={s.userDropdownBtn}
      onClick={() => setIsDropdownOpen(prev => !prev)}
    >
      <svg className={s.btnArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path
          d="M11.9994 14.7965C11.5911 14.7965 11.1827 14.639 10.8736 14.3298L7.07023 10.5265C6.90107 10.3573 6.90107 10.0773 7.07023 9.90812C7.2394 9.73896 7.5194 9.73896 7.68857 9.90812L11.4919 13.7115C11.7719 13.9915 12.2269 13.9915 12.5069 13.7115L16.3102 9.90812C16.4794 9.73896 16.7594 9.73896 16.9286 9.90812C17.0977 10.0773 17.0977 10.3573 16.9286 10.5265L13.1252 14.3298C12.8161 14.639 12.4077 14.7965 11.9994 14.7965Z"
          fill="#658092"/>
      </svg>
    </button>
  )

  const personalAccount = userProfiles.find(item => item.type === "User")
  const companyProfiles = userProfiles.filter(item => item.type === "Company")

  return (
    <div className={s.userDropdownWrapper} ref={userDropdownWrapperRef}>
      <button
        className={s.userDropdownBtn}
        onClick={() => setIsDropdownOpen(prev => !prev)}
      >
        <div className={s.roundLetter}>{letter}</div>
        <div className={s.btnText}>
          <div className={s.btnName}>{activeProfile?.displayName || "Без имени"}</div>
          <div className={s.btnInn}>{activeProfile?.companyInn}</div>
        </div>
        <svg className={s.btnArrow} width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M11.9994 14.7965C11.5911 14.7965 11.1827 14.639 10.8736 14.3298L7.07023 10.5265C6.90107 10.3573 6.90107 10.0773 7.07023 9.90812C7.2394 9.73896 7.5194 9.73896 7.68857 9.90812L11.4919 13.7115C11.7719 13.9915 12.2269 13.9915 12.5069 13.7115L16.3102 9.90812C16.4794 9.73896 16.7594 9.73896 16.9286 9.90812C17.0977 10.0773 17.0977 10.3573 16.9286 10.5265L13.1252 14.3298C12.8161 14.639 12.4077 14.7965 11.9994 14.7965Z"
            fill="#658092"/>
        </svg>
      </button>

      {isDropdownOpen && (
        <div className={s.dropWrapper}>
          <div className={s.dropdown}>
            <div className={s.dropdownHeader}>
              <h3 className={s.dropdownTitle}>Профили</h3>
              <button>
                <img className={s.closeImg} src={closeBtn} alt="close" onClick={() => setIsDropdownOpen(false)}/>
              </button>
            </div>
            <div className={s.activeProfile}>
              <div className={`${s.profileBlock} ${s.profileBlockActive}`}>
                <div className={s.roundLetter}>{letter}</div>
                <div className={s.btnTextActiveProfile}>
                  <div className={s.btnName}>{activeProfile?.displayName || "Без имени"}</div>
                  <div className={s.btnInn}>{activeProfile?.companyInn}</div>
                </div>
              </div>
            </div>
            <div className={s.personalProfile} onClick={() => profileItemClickHandler(personalAccount.profileId)}>
              <div className={s.subtitle}>Личный</div>
              <div className={`${s.profileBlock} ${personalAccount.profileId === activeProfileId ? s.activeItem : ""}`}>
                {
                  personalAccount.profileId === activeProfileId && (
                    <svg className={s.activeProfileIcon} width="17" height="17" viewBox="0 0 17 17" fill="none"
                         xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M8.33333 0C3.74167 0 0 3.74167 0 8.33333C0 12.925 3.74167 16.6667 8.33333 16.6667C12.925 16.6667 16.6667 12.925 16.6667 8.33333C16.6667 3.74167 12.925 0 8.33333 0ZM12.3167 6.41667L7.59167 11.1417C7.475 11.2583 7.31667 11.325 7.15 11.325C6.98333 11.325 6.825 11.2583 6.70833 11.1417L4.35 8.78333C4.10833 8.54167 4.10833 8.14167 4.35 7.9C4.59167 7.65833 4.99167 7.65833 5.23333 7.9L7.15 9.81667L11.4333 5.53333C11.675 5.29167 12.075 5.29167 12.3167 5.53333C12.5583 5.775 12.5583 6.16667 12.3167 6.41667Z"
                        fill="#3D4A66"/>
                    </svg>
                  )
                }
                <div className={s.roundLetter}>{letter}</div>
                <div className={s.btnText}>
                  <div className={s.personalProfileName}>{personalAccount?.displayName || "Без имени"}</div>
                  <div className={s.personalProfileLabel}>Личный аккаунт</div>
                </div>
              </div>
            </div>
            {
              companyProfiles.length > 0 && (
                <div className={s.companiesProfile}>
                  <div className={s.companiesBlockHeader}>
                    <div className={`${s.subtitleCompanies} `}>
                      Компании
                    </div>
                    <div className={s.companiesNumber}>{companyProfiles.length}</div>
                  </div>
                  {
                    companyProfiles.map((item, index) => {
                      const isActive = item.profileId === activeProfileId;
                      return (
                        <div className={`${s.profileBlock} ${isActive ? s.activeItem : ''}`} key={index}
                             onClick={() => profileItemClickHandler(item.profileId)}>
                          {
                            isActive && (
                              <svg className={s.activeProfileIcon} width="17" height="17" viewBox="0 0 17 17" fill="none"
                                   xmlns="http://www.w3.org/2000/svg">
                                <path
                                  d="M8.33333 0C3.74167 0 0 3.74167 0 8.33333C0 12.925 3.74167 16.6667 8.33333 16.6667C12.925 16.6667 16.6667 12.925 16.6667 8.33333C16.6667 3.74167 12.925 0 8.33333 0ZM12.3167 6.41667L7.59167 11.1417C7.475 11.2583 7.31667 11.325 7.15 11.325C6.98333 11.325 6.825 11.2583 6.70833 11.1417L4.35 8.78333C4.10833 8.54167 4.10833 8.14167 4.35 7.9C4.59167 7.65833 4.99167 7.65833 5.23333 7.9L7.15 9.81667L11.4333 5.53333C11.675 5.29167 12.075 5.29167 12.3167 5.53333C12.5583 5.775 12.5583 6.16667 12.3167 6.41667Z"
                                  fill="#3D4A66"/>
                              </svg>
                            )
                          }
                          <div className={s.roundLetter}>K</div>
                          <div className={s.btnText}>
                            <div className={s.personalProfileName}>{item.displayName || "Без имени"}</div>
                            <div className={s.personalProfileLabel}>Личный аккаунт</div>
                          </div>
                        </div>
                      )
                    })
                  }
                </div>
              )
            }
            <div className={s.bottomItems}>
              <div className={s.menuItemButton}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_4919_39655)">
                    <path d="M7 8.75C7.9665 8.75 8.75 7.9665 8.75 7C8.75 6.0335 7.9665 5.25 7 5.25C6.0335 5.25 5.25 6.0335 5.25 7C5.25 7.9665 6.0335 8.75 7 8.75Z" stroke="#3A3F49" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11.3173 8.7526C11.2397 8.92855 11.2165 9.12372 11.2508 9.31295C11.2851 9.50218 11.3753 9.67679 11.5098 9.81427L11.5448 9.84927C11.6532 9.95767 11.7392 10.0864 11.7979 10.228C11.8565 10.3696 11.8867 10.5214 11.8867 10.6747C11.8867 10.828 11.8565 10.9798 11.7979 11.1214C11.7392 11.263 11.6532 11.3917 11.5448 11.5001C11.4364 11.6085 11.3077 11.6945 11.1661 11.7531C11.0245 11.8118 10.8727 11.842 10.7194 11.842C10.5661 11.842 10.4143 11.8118 10.2727 11.7531C10.1311 11.6945 10.0024 11.6085 9.89398 11.5001L9.85898 11.4651C9.72151 11.3306 9.54689 11.2404 9.35766 11.2061C9.16843 11.1718 8.97326 11.195 8.79732 11.2726C8.62479 11.3465 8.47764 11.4693 8.374 11.6258C8.27035 11.7823 8.21473 11.9657 8.21398 12.1534V12.2526C8.21398 12.562 8.09107 12.8588 7.87228 13.0776C7.65348 13.2964 7.35674 13.4193 7.04732 13.4193C6.7379 13.4193 6.44115 13.2964 6.22236 13.0776C6.00357 12.8588 5.88065 12.562 5.88065 12.2526V12.2001C5.8799 12.0124 5.82428 11.829 5.72064 11.6725C5.61699 11.516 5.46985 11.3932 5.29732 11.3193C5.12138 11.2416 4.92621 11.2185 4.73697 11.2528C4.54774 11.2871 4.37313 11.3773 4.23565 11.5118L4.20065 11.5468C3.98174 11.7657 3.68483 11.8887 3.37523 11.8887C3.06564 11.8887 2.76873 11.7657 2.54982 11.5468C2.3309 11.3279 2.20792 11.0309 2.20792 10.7214C2.20792 10.4118 2.3309 10.1149 2.54982 9.89594L2.58482 9.86094C2.7193 9.72346 2.80951 9.54885 2.84382 9.35961C2.87813 9.17038 2.85497 8.97521 2.77732 8.79927C2.70337 8.62674 2.58059 8.47959 2.42409 8.37595C2.26759 8.27231 2.08419 8.21669 1.89648 8.21594H1.75065C1.44123 8.21594 1.14449 8.09302 0.925693 7.87423C0.706901 7.65544 0.583984 7.35869 0.583984 7.04927C0.583984 6.73985 0.706901 6.44311 0.925693 6.22431C1.14449 6.00552 1.44123 5.8826 1.75065 5.8826H1.80315C1.99086 5.88186 2.17425 5.82624 2.33076 5.72259C2.48726 5.61895 2.61004 5.4718 2.68398 5.29927C2.76163 5.12333 2.7848 4.92816 2.75049 4.73893C2.71618 4.5497 2.62596 4.37508 2.49148 4.2376L2.45648 4.2026C2.23757 3.98369 2.11459 3.68678 2.11459 3.37719C2.11459 3.0676 2.23757 2.77069 2.45648 2.55177C2.6754 2.33286 2.97231 2.20987 3.2819 2.20987C3.59149 2.20987 3.8884 2.33286 4.10732 2.55177L4.14232 2.58677C4.2798 2.72125 4.45441 2.81146 4.64364 2.84577C4.83287 2.88008 5.02804 2.85692 5.20398 2.77927C5.37652 2.70533 5.52366 2.58255 5.62731 2.42604C5.73095 2.26954 5.78657 2.08615 5.78732 1.89844V1.7526C5.78732 1.44318 5.91023 1.14644 6.12903 0.927646C6.34782 0.708854 6.64457 0.585938 6.95398 0.585938C7.2634 0.585938 7.56015 0.708854 7.77894 0.927646C7.99774 1.14644 8.12065 1.44318 8.12065 1.7526V1.8051C8.1214 1.99281 8.17702 2.17621 8.28066 2.33271C8.38431 2.48921 8.53145 2.61199 8.70398 2.68594C8.87993 2.76359 9.0751 2.78675 9.26433 2.75244C9.45356 2.71813 9.62817 2.62792 9.76565 2.49344L9.80065 2.45844C9.90905 2.35004 10.0377 2.26406 10.1794 2.2054C10.321 2.14673 10.4728 2.11654 10.6261 2.11654C10.7794 2.11654 10.9312 2.14673 11.0728 2.2054C11.2144 2.26406 11.3431 2.35004 11.4515 2.45844C11.5599 2.56683 11.6459 2.69552 11.7045 2.83714C11.7632 2.97877 11.7934 3.13056 11.7934 3.28385C11.7934 3.43715 11.7632 3.58894 11.7045 3.73057C11.6459 3.87219 11.5599 4.00088 11.4515 4.10927L11.4165 4.14427C11.282 4.28175 11.1918 4.45636 11.1575 4.64559C11.1232 4.83482 11.1463 5.03 11.224 5.20594V5.2526C11.2979 5.42514 11.4207 5.57228 11.5772 5.67593C11.7337 5.77957 11.9171 5.83519 12.1048 5.83594H12.2507C12.5601 5.83594 12.8568 5.95885 13.0756 6.17765C13.2944 6.39644 13.4173 6.69319 13.4173 7.0026C13.4173 7.31202 13.2944 7.60877 13.0756 7.82756C12.8568 8.04635 12.5601 8.16927 12.2507 8.16927H12.1982C12.0104 8.17002 11.827 8.22564 11.6705 8.32928C11.514 8.43293 11.3913 8.58007 11.3173 8.7526Z" stroke="#3A3F49" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                  <defs>
                    <clipPath id="clip0_4919_39655">
                      <rect width="14" height="14" fill="white"/>
                    </clipPath>
                  </defs>
                </svg>

                <span>Настройки аккаунта</span>
              </div>
              <div className={s.menuItemButton} onClick={logoutHandler}>
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M7 1.75C5.96165 1.75 4.94662 2.05791 4.08326 2.63478C3.2199 3.21166 2.54699 4.0316 2.14963 4.99091C1.75227 5.95022 1.64831 7.00582 1.85088 8.02422C2.05345 9.04262 2.55347 9.97809 3.28769 10.7123C4.02192 11.4465 4.95738 11.9466 5.97578 12.1491C6.99418 12.3517 8.04978 12.2477 9.00909 11.8504C9.9684 11.453 10.7883 10.7801 11.3652 9.91674C11.9421 9.05339 12.25 8.03835 12.25 7"
                    stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M12.25 1.75V5.25H8.75" stroke="#3A3F49" strokeWidth="1.2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                  <path d="M12.25 1.75L7 7" stroke="#3A3F49" strokeWidth="1.2" strokeLinecap="round"
                        strokeLinejoin="round"/>
                </svg>
                <span>Выйти из аккаунта</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProfileInMobileHeader;