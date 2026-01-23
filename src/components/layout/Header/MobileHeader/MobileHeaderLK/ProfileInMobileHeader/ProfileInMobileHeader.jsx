import s from './ProfileInMobileHeader.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData, getUserProfilesLoadingStatus, logout} from "@/store/userSlice.js";
import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import OtherProfilesMobile
  from "@/components/layout/Header/MobileHeader/MobileHeaderLK/ProfileInMobileHeader/OtherProfilesMobile/OtherProfilesMobile.jsx";
import logoutIcon from "@/assets/img/header/userMenu/logout.svg";


const ProfileInMobileHeader = () => {

  const userProfilesLoadingStatus = useSelector(getUserProfilesLoadingStatus);
  const userProfiles = useSelector(getUserProfilesData);
  const activeProfileId = useSelector(getActiveProfileId);

  const location = useLocation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  let activeProfile;


  if (userProfiles) {
    activeProfile = userProfiles.find(item => item.profileId === activeProfileId);
  }

  let letter
  if (activeProfile?.type === 'company') {
    letter = 'K'
  } else {
    letter = activeProfile?.profileName?.slice(0, 1);
  }

  const dispatch = useDispatch()
  const logoutHandler = () => {
    dispatch(logout())
  }

  const underlayClickHandler = () => {
    console.log("underlayClickHandler")
    setIsDropdownOpen(false)
  }

  return (
    <div className={s.userDropdownWrapper}
    >
      <button className={s.dropdownButton} onClick={() => setIsDropdownOpen(prev => !prev)} >
        <div
          className={s.userLetter}
        >
          {letter}
        </div>

        <div className={s.dropdownButtonText}>
          {activeProfile && activeProfile.profileName}
        </div>

      </button>
      {isDropdownOpen && (
        <div className={s.underlay} onClick={underlayClickHandler} >
          <div className={s.dropWrapper}>
            <div className={s.dropdown}>

              {
                userProfiles?.length > 1 && (

                  <div className={s.topPart}>
                    <h2 className={s.title}>Другие профили</h2>
                    {userProfiles?.length > 1 && (
                      <OtherProfilesMobile activeProfile={activeProfile} userProfiles={userProfiles}
                                           setIsDropdownOpen={setIsDropdownOpen}/>
                    )}
                  </div>
                )
              }

              <div className={s.bottomPart}>
                <button onClick={logoutHandler} className={s.logoutBtn}>
                  <img src={logoutIcon} alt="logout"/>
                  <span>Выход</span>
                </button>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInMobileHeader;