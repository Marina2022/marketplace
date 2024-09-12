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

  const activeProfileId = useSelector(getActiveProfileId)
  const profiles = useSelector(getUserProfilesData)
  
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
  }, [profiles])

  

  const [activeCompany, setActiveCompany] = useState(null)
    
  useEffect(() => {
        
    let activeProfile

    if (profiles) {
      activeProfile = profiles.find(profile => profile.profileId === activeProfileId)
    }
    
    if (activeProfile && grid) {      
      if (activeProfile.type === 'company') {
        
        const activeCompany = grid.find(company=>company.companyName === activeProfile.profileName)
        setActiveCompany(activeCompany)
      }

      if (activeProfile.type === 'user' && profiles.length > 1) {
        // если текущий профиль = user, и у него есть компании, то делаем активной первую компанию из грида.
        setActiveCompany(grid[0])
      }
    }
    
  }, [activeProfileId, profiles, grid])

  
  const [isCompanyDataLoading, setIsCompanyDataLoading] = useState(true)
  const [activeCompanyData, setActiveCompanyData] = useState(null)

  const getActiveCompany = async () => {

    try {
      const resp = await axios(`companies/${activeCompany.companyId}`)
      setActiveCompanyData(resp.data)
    } catch (err) {
      console.log(err)
    } finally {
      setIsCompanyDataLoading(false)
    }
  }
  
  useEffect(() => {
  
    if (activeCompany) {
      getActiveCompany()  
    }    
  }, [activeCompany]);
  
  return (
    <div className={s.companiesTab}>     
      <CompaniesGrid isGridLoading={isGridLoading} grid={grid} activeCompanyName={activeCompany?.companyName} />
      {
        activeCompany && <div className={s.activeCompanyInfo}>
          <Company isCompanyDataLoading={isCompanyDataLoading} company={activeCompanyData} />
          <CompanyBalance/>
        </div>
      }
    </div>
  );
};

export default CompaniesTab;