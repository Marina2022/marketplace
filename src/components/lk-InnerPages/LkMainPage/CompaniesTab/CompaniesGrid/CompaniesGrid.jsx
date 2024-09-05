import s from './CompaniesGrid.module.scss';
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import GridCard from "@/components/lk-InnerPages/LkMainPage/CompaniesTab/CompaniesGrid/GridCard/GridCard.jsx";


const CompaniesGrid = () => {


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

  if (isGridLoading) return <Spinner/>

  return (
    <ul className={s.gridList}>

      {
        grid.map(company => <>
            <GridCard company={company} key={company.companyId} active={true}/>
            <GridCard company={company} key={company.companyId}/>
            <GridCard company={company} key={company.companyId}/>
            {/*<GridCard company={company} key={company.companyId}/>*/}
            {/*<GridCard company={company} key={company.companyId}/>*/}
          </>
        )
      }
      <li className={s.newCard}>
        newCard
      </li>
    </ul>
  );
};

export default CompaniesGrid;