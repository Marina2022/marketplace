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

  const [activeCompany, setActiveCompany] = useState(null)

  console.log('activeCompany', activeCompany)
  
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

    // потестировать надо будет потом, когда еще компаний добавлю todo
    // console.log('activeCompany', activeCompany)

    
  }, [activeProfileId, profiles, grid])

  
  const [isCompanyDataLoading, setIsCompanyDataLoading] = useState(true)
  const [activeCompanyData, setActiveCompanyData] = useState(null)
  
  useEffect(() => {
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
    
    if (activeCompany) {
      getActiveCompany()  
    }
    
  }, [activeCompany]);
  
  return (
    <div className={s.companiesTab}>
      
      <CompaniesGrid isGridLoading={isGridLoading} grid={grid} activeCompanyName={activeCompany?.companyName} />
      
      <div className={s.activeCompanyInfo}>
        
        <Company isCompanyDataLoading={isCompanyDataLoading} activeCompanyData={activeCompanyData} />
        <CompanyBalance />
        
      </div>
      
    </div>
  );
};

export default CompaniesTab;