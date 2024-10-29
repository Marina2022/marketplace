import s from './UserDropdown.module.scss';
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData, getUserProfilesLoadingStatus, logout} from "@/store/userSlice.js";
import OtherProfiles from "@/components/layout/Header/UserDropdown/OtherProfiles/OtherProfiles.jsx";
import {Link, useLocation, useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import {setActiveTabInMain} from "@/store/lkSlice.js";

const UserDropdown = () => {
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

  return (
    <div className={s.userDropdownWrapper}
         onMouseEnter={() => setIsDropdownOpen(true)}
         onMouseLeave={() => setIsDropdownOpen(false)}
    >
      <button
        className={s.userDropdownBtn}
      >
        {letter}
      </button>
      {isDropdownOpen && (
        <div className={s.dropWrapper}>
          <div className={s.dropdown}>
            <div className={s.activeProfile}>
              <div className={s.user}>
                {userProfilesLoadingStatus === 'success' && <div className={s.letterInDropdown}>{letter}</div>}
                {userProfilesLoadingStatus === 'success' &&
                  <div className={s.userName}>{activeProfile?.profileName}</div>}
              </div>
              <ul className={s.dropdownMenu}>
                <li><Link className={s.dropdownLink} to="/lk">Личный кабинет</Link></li>
                <li><Link className={s.dropdownLink} to="/lk/orders">Заказы</Link></li>
                <li><Link className={s.dropdownLink} to="/favourites">Избранное</Link></li>
                <li><Link className={s.dropdownLink} to="/messages">Сообщения</Link></li>
              </ul>
              <div
                className={s.companiesLink}

                onClick={() => {
                  dispatch(setActiveTabInMain(1))
                  navigate("/lk/main")
                }}
              >
                Мои организации
              </div>
              <button onClick={logoutHandler} className={s.logoutBtn}>Выход</button>
            </div>
            {userProfilesLoadingStatus === 'success' && userProfiles.length > 1 && (
              <OtherProfiles activeProfile={activeProfile} userProfiles={userProfiles}
                             setIsDropdownOpen={setIsDropdownOpen}/>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
