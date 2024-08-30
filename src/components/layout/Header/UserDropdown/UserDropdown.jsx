import s from './UserDropdown.module.scss';
import { useSelector } from "react-redux";
import { getActiveProfileId, getUserProfilesData, getUserProfilesLoadingStatus } from "@/store/userSlice.js";
import OtherProfiles from "@/components/layout/Header/UserDropdown/OtherProfiles/OtherProfiles.jsx";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState, useRef } from "react";

const UserDropdown = () => {
  const userProfilesLoadingStatus = useSelector(getUserProfilesLoadingStatus);
  const userProfiles = useSelector(getUserProfilesData);
  const activeProfileId = useSelector(getActiveProfileId);

  const location = useLocation();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    setIsDropdownOpen(false);
  }, [location]);

  useEffect(() => {
    const handleClickOutside = (event) => {      
      if (buttonRef.current && buttonRef.current.contains(event.target)) {
        return;
      }
      
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscapeKey);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, []);

  let activeProfile;

  if (userProfiles) {
    activeProfile = userProfiles.find(item => item.profileId === activeProfileId);
  }

  const letter = activeProfile?.profileName.slice(0, 1);

  const openDropdownHandler = () => {
    setIsDropdownOpen(prev => !prev);
  };

  return (
    <div className={s.userDropdownWrapper}>
      <button
        ref={buttonRef}
        onClick={openDropdownHandler}
        className={s.userDropdownBtn}
      >
        {letter}
      </button>

      {isDropdownOpen && (
        <div ref={dropdownRef} className={s.dropdown}>
          <div className={s.activeProfile}>
            <div className={s.user}>
              {userProfilesLoadingStatus === 'success' && <div className={s.letterInDropdown}>{letter}</div>}
              {userProfilesLoadingStatus === 'success' && <div className={s.userName}>{activeProfile.profileName}</div>}
            </div>
            <ul className={s.dropdownMenu}>
              <li><Link to="/lk">Личный кабинет</Link></li>
              <li><Link to="/orders">Заказы</Link></li>
              <li><Link to="/favourites">Избранное</Link></li>
              <li><Link to="/messages">Сообщения</Link></li>
            </ul>
            <Link className={s.companiesLink} to="/lk">Мои организации</Link>
            <button className={s.logoutBtn}>Выход</button>
          </div>
          {userProfilesLoadingStatus === 'success' && userProfiles.length > 1 && (
            <OtherProfiles activeProfile={activeProfile} userProfiles={userProfiles} setIsDropdownOpen={setIsDropdownOpen} />
          )}
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
