import s from './Company.module.scss';

const Company = ({isCompanyDataLoading, activeCompanyData}) => {

  console.log('activeCompanyData', activeCompanyData)
  
  
  
  return (
    <div className={s.company}>
      Company
      
      <p>Company</p>
      <p>Company</p>
      <p>Company</p>
      <p>Company</p>
    </div>
  );
};

export default Company;