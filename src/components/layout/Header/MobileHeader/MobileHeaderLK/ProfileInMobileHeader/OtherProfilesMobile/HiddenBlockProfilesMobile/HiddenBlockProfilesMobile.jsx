import s from './HiddenBlockProfilesMobile.module.scss';

const HiddenBlockProfilesMobile = ({restProfiles}) => {

  const restProfilesToShow = restProfiles.slice(0, 2)

  return (
    <>
      <ul className={s.profiles}>
        {
          restProfilesToShow.map((profile, i) => <li key={i} className={s.oneProfile}>{profile.letter}</li>)
        }
      </ul>
      {
        restProfiles.length > 2 && <div className={s.moreProfiles}>+{restProfiles.length-2}</div>
      }
    </>
  )    
}

export default HiddenBlockProfilesMobile;