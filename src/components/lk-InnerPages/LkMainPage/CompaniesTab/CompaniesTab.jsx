import s from './CompaniesTab.module.scss';

import CompaniesGrid from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/CompaniesGrid.jsx";
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";
import Company from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/Company/Company.jsx";
import CompanyBalance
  from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/CompanyBalance/CompanyBalance.jsx";

const CompaniesTab = () => {


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

    // потестировать надо будет потом, когда еще компаний добавлю todo
    // console.log('activeCompanyName', activeCompanyName)

    
  }, [activeProfileId, profiles, grid])
  
  return (
    <div className={s.companiesTab}>
      
      <CompaniesGrid isGridLoading={isGridLoading} grid={grid} activeCompanyName={activeCompanyName} />
      
      <div className={s.activeCompanyInfo}>
        
        <Company activeCompanyName={activeCompanyName} />
        <CompanyBalance />
        
      </div>
      
    </div>
  );
};

export default CompaniesTab;