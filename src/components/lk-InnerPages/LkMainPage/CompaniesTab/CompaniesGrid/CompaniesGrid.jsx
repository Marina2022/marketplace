import s from './CompaniesGrid.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import GridCard from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/GridCard/GridCard.jsx";
import NewCard from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/NewCard/NewCard.jsx";

const CompaniesGrid = ({isGridLoading, grid, activeCompanyName}) => {

  if (isGridLoading) return <Spinner/>

  return (
    <ul className={s.gridList}>

      {
        grid.map(company =><GridCard company={company} key={company.companyId} activeCompanyName={activeCompanyName}  />)
      }
      <NewCard key={1}/>
    </ul>
  );
};

export default CompaniesGrid;