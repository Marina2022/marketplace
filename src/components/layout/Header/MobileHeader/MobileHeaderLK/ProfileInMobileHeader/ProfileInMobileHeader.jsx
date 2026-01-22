import s from './ProfileInMobileHeader.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData, getUserProfilesLoadingStatus, logout} from "@/store/userSlice.js";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";
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

  const navigate = useNavigate()

  console.log({activeProfile})

  return (
    <div className={s.userDropdownWrapper}
         onClick={() => setIsDropdownOpen(true)}
    >
      <button className={s.dropdownButton}>
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
        <div className={s.dropWrapper}>
          <div className={s.dropdown}>
            <h2 className={s.title}>Другие профили</h2>
            {userProfilesLoadingStatus === 'success' && userProfiles?.length > 1 && (
              <OtherProfilesMobile activeProfile={activeProfile} userProfiles={userProfiles}
                                   setIsDropdownOpen={setIsDropdownOpen}/>
            )}

            <div className={s.bottomPart}>
              <button onClick={logoutHandler} className={s.logoutBtn}>
                <img src={logoutIcon} alt="logout"/>
                <span>Выход</span>
              </button>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfileInMobileHeader;