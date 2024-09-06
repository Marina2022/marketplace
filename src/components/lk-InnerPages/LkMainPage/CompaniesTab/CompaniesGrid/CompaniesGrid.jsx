import s from './CompaniesGrid.module.scss';
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import GridCard from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/GridCard/GridCard.jsx";
import NewCard from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/NewCard/NewCard.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfiles, getUserProfilesData} from "@/store/userSlice.js";


const CompaniesGrid = () => {


  const [isGridLoading, setIsGridLoading] = useState(true)

  const [grid, setGrid] = useState(null)

  // console.log('grid', grid)

  useEffect(() => {

    const getGrid = async () => {

      try {
        const resp = await axios('companies/profileGrid')
        setGrid(resp.data)
      } catch (err) {
        console.log(err)
      } finally {
        setIsGridLoading(false)
      }
    }
    getGrid()
  }, [])

  const activeProfileId = useSelector(getActiveProfileId)
  const profiles = useSelector(getUserProfilesData)

  const [activeCompanyName, setActiveCompanyName] = useState(null)


  useEffect(() => {
    let activeProfile

    if (profiles) {
      activeProfile = profiles.find(profile => profile.profileId === activeProfileId)
    }

    if (activeProfile && grid) {
      //console.log(activeProfile)
      if (activeProfile.type === 'company') {
        setActiveCompanyName(activeProfile.profileName)
      }

      if (activeProfile.type === 'user' && profiles.length > 1) {
        // если текущий профиль = user, и у него есть компании, то нужно сделать активной первую компанию из грида.
        setActiveCompanyName(grid[0].companyName)
      }
    }
  }, [activeProfileId, profiles, grid])


  // потестировать надо будет потом, когда еще компаний добавлю todo
  // console.log('activeCompanyName', activeCompanyName)

  if (isGridLoading) return <Spinner/>

  return (
    <ul className={s.gridList}>

      {
        grid.map(company =><GridCard company={company} key={company.companyId} activeCompanyName={activeCompanyName}  />)


        // grid.map(company => {
        //   return <>
        //     <GridCard company={company} key={company.companyId} activeCompanyName={activeCompanyName}/>
        //     <GridCard company={company} key={company.companyId} activeCompanyName={'d'}/>
        //   </>
        // })
      }
      <NewCard key={1}/>
    </ul>
  );
};

export default CompaniesGrid;