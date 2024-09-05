import s from './CompaniesTab.module.scss';

import CompaniesGrid from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/CompaniesGrid.jsx";
const CompaniesTab = () => {
   
  
  
  return (
    <div className={s.companiesTab}>
      
      <CompaniesGrid />
      
    </div>
  );
};

export default CompaniesTab;