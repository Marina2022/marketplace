import s from './CompaniesGrid.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import GridCard from "@/components/dashboard/DashboardOrganizations/CompaniesGrid/GridCard/GridCard.jsx";
import NewCard from "@/components/dashboard/DashboardOrganizations/CompaniesGrid/NewCard/NewCard.jsx";

const CompaniesGrid = ({isGridLoading, grid, activeCompanyName, setActiveCompanyIndex}) => {

  if (isGridLoading) return <Spinner/>

  return (
    <ul className={s.gridList}>
      {
        grid.map((company, i) =><GridCard company={company} key={company.companyId} activeCompanyName={activeCompanyName} setActiveCompanyIndex={setActiveCompanyIndex} index={i}  />)
      }
      <NewCard key={1}/>
    </ul>
  );
};

export default CompaniesGrid;