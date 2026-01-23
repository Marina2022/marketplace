import s from './OtherProfilesMobile.module.scss';
import {useDispatch} from "react-redux";
import {getUserProfiles} from "@/store/userSlice.js";

const OtherProfilesMobile = ({activeProfile, userProfiles, setIsDropdownOpen}) => {

  const restProfiles = userProfiles.filter(item => item.profileId !== activeProfile.profileId)

  const improvedRestProfiles = restProfiles.map(item => {
    let letter;
    if (item.type === 'company') {
      letter = "К"
    } else {
      letter = item.profileName.slice(0, 1)
    }
    return {...item, letter}
  })


  const dispatch = useDispatch()
  const profileItemClickHandler = (profileId) => {
    localStorage.setItem('activeProfile', profileId)
    dispatch(getUserProfiles())
    setIsDropdownOpen(false)
  }


  return (
    <div className={s.wrapper}>
      {
        <div>

          <ul>
            {
              improvedRestProfiles.map((profile, i) => (
                  <div onClick={() => profileItemClickHandler(profile.profileId)} className={s.profileItem} key={i}>
                    <div className={s.letterAndName}>
                      <div className={s.letterOtherProfiles}>{profile.letter}</div>
                      <div className={s.name}>{profile.profileName}</div>
                    </div>

                    <div>
                      {
                        profile.shopName && <div className={s.shopName}>{profile.shopName }</div>
                        //<div className={s.shopName}>{profile.shopName || 'Company'}</div>
                      }
                    </div>
                  </div>
              ))
            }
          </ul>
        </div>
      }
    </div>
  )
}

export default OtherProfilesMobile;