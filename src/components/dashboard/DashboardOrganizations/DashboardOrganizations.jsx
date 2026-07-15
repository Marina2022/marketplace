import s from './DashboardOrganizations.module.scss';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";
import axios from "@/api/axiosInstance.js";
import CompaniesGrid from "@/components/dashboard/DashboardOrganizations/CompaniesGrid/CompaniesGrid.jsx";
import Company from "@/components/dashboard/DashboardOrganizations/Company/Company.jsx";
import CompanyBalance
  from "@/components/dashboard/DashboardOrganizations/CompaniesGrid/CompanyBalance/CompanyBalance.jsx";

const DashboardOrganizations = () => {
  const [isGridLoading, setIsGridLoading] = useState(true)
  const [grid, setGrid] = useState(null)
  const activeProfileId = useSelector(getActiveProfileId)
  const profiles = useSelector(getUserProfilesData)

  const [activeCompanyIndex, setActiveCompanyIndex] = useState(0)

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

        const activeCompany = grid.find(company => company.companyName === activeProfile.displayName)
        setActiveCompany(activeCompany)
      }

      setActiveCompany(grid[activeCompanyIndex])
    }

  }, [activeProfileId, profiles, grid, activeCompanyIndex])


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
      <CompaniesGrid
        isGridLoading={isGridLoading}
        grid={grid}
        activeCompanyName={activeCompany?.companyName}
        setActiveCompanyIndex={setActiveCompanyIndex}
      />
      {
        activeCompany && <div className={s.activeCompanyInfo}>
          <Company isCompanyDataLoading={isCompanyDataLoading} company={activeCompanyData}/>
          <CompanyBalance/>
        </div>
      }
    </div>
  );
};

export default DashboardOrganizations;