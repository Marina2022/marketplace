import s from './UserDropdown.module.scss';
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData, getUserProfilesLoadingStatus} from "@/store/userSlice.js";
import OtherProfiles from "@/components/layout/Header/UserDropdown/OtherProfiles/OtherProfiles.jsx";
import {Link} from "react-router-dom";

const UserDropdown = () => {
  
  const userProfilesLoadingStatus = useSelector(getUserProfilesLoadingStatus)
  
  const userProfiles = useSelector(getUserProfilesData)  
  const activeProfileId = useSelector(getActiveProfileId)

  let activeProfile
  
  if (userProfiles) {
    activeProfile = userProfiles.find(item => item.profileId === activeProfileId)   
  }

  console.log('profiles', userProfiles)
  
  console.log('activeProfile', activeProfile)
  
  const letter = activeProfile?.profileName.slice(0,1)
 
  
  return (
    <div className={s.userDropdownWrapper}>
      <button className={s.userDropdownBtn}>{letter}</button>
      
      <div className={s.dropdown}>
 

        {
          userProfilesLoadingStatus === 'success' && (
            <div>
              <div className={s.activeProfile}>
                <div className={s.user}>                  
                  <div className={s.letterInDropdown}>{letter}</div>
                  <div className={s.userName}>{activeProfile.profileName}</div>                  
                </div>
                <ul className={s.dropdownMenu}>
                  <li>
                    <Link to="/lk">Личный кабинет</Link>
                  </li>
                  <li>
                    <Link to="/orders">Заказы</Link>
                  </li>
                  <li>
                    <Link to="/favourites">Избранное</Link>
                  </li>
                  <li>
                    <Link to="/messages">Сообщения</Link>
                  </li>
                </ul>

                {/* todo - стейт прокинуть, чтобы открылась вкладка Орг-ии */}
                <Link className={s.companiesLink} to="/lk">Мои организации</Link>  

                <button className={s.logoutBtn}>Выход</button>
                
                
                
              </div>
              
              {
                userProfiles.length > 1 && <OtherProfiles activeProfile={activeProfile} userProfiles={userProfiles}  />
              }
            </div>
          )
        }
        
      </div>
      
    </div>
  );
};

export default UserDropdown;