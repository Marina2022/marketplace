import s from './OtherProfiles.module.scss';
import {useState} from "react";
import showProfilesBtn from '@/assets/img/header/showProfilesBtn.svg'
import HiddenBlockProfiles
  from "@/components/layout/Header/UserDropdown/OtherProfiles/HiddenBlockProfiles/HiddenBlockProfiles.jsx";

const OtherProfiles = ({activeProfile, userProfiles}) => {

  const [profilesAreShown, setProfilesAreShown] = useState(true)

  console.log({profilesAreShown})

  const restProfiles = userProfiles.filter(item => item.profileId !== activeProfile.profileId)


  const testRestProfiles = [
    {
      isHasShop: false,
      profileId: "18089a94-2244-425d-a4cb-6ce866802aeb",
      profileName: "ООО \"Омела\"",
      shopName: null,
      type: "company"
    },
    {
      isHasShop: false,
      profileId: "18089a94-2244-425d-a4cb-6ce866802aeb",
      profileName: "Афанасий С.",
      shopName: null,
      type: "user"
    },
    {
      isHasShop: false,
      profileId: "18089a94-2244-425d-a4cb-6ce866802aeb",
      profileName: "Валерий А.",
      shopName: null,
      type: "user"
    },
    {
      isHasShop: false,
      profileId: "18089a94-2244-425d-a4cb-6ce866802aeb",
      profileName: "ООО \"Граната\"",
      shopName: `Магазин: “Все для дома и сада”`,
      type: "company"
    },
  ]

  // const improvedRestProfiles = restProfiles.map(item => {
  const improvedRestProfiles = testRestProfiles.map(item => {

    let letter;
    if (item.type === 'company') {
      letter = "К"
    } else {
      letter = item.profileName.slice(0, 1)
    }
    return {...item, letter}
  })


  console.log('restProfiles', restProfiles)

  return (
    <div className={s.wrapper}>

      {
        profilesAreShown && (
          <div>

            <div onClick={() => setProfilesAreShown(false)} className={s.hideProfiles}>
              <div >Скрыть профили</div>

              <button className={s.showProfilesBtn}><img src={showProfilesBtn} alt="open button"/></button>
            </div>


            <ul>
              {
                improvedRestProfiles.map((profile, i)=>(
                  <div className={s.profileItem} key={i}>
                    <div className={s.letterOtherProfiles}>{profile.letter}</div>
                    <div>
                      <div className={s.name}>{profile.profileName}</div>

                      {
                        profile.shopName && <div className={s.shopName}>{profile.shopName}</div>
                      }

                    </div>
                  </div>
                ))
              }
              
            </ul>


          </div>
        )
      }

      {
        !profilesAreShown && (
          <div className={s.hiddenProfiles} onClick={() => setProfilesAreShown(true)}>

            <div className={s.showProfiles}>Показать профили</div>
            
            <HiddenBlockProfiles restProfiles={improvedRestProfiles}/>
            
            <button className={s.showProfilesBtn}><img src={showProfilesBtn} alt="open button"/></button>

          </div>
        )

      }

    </div>
  );
};

export default OtherProfiles;