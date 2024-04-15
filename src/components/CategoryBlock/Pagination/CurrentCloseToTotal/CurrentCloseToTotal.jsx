import {useSearchParams} from "react-router-dom";
import s from "@/components/CategoryBlock/Pagination/CurrentPageMoreThanFive/CurrentPageMoreThanFive.module.scss";
import PageNumber from "@/components/CategoryBlock/Pagination/PageNumber/PageNumber.jsx";

const CurrentCloseToTotal = ({pageCountTotal}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1
  const onStartClick = () => {
    searchParams.set('page', 1)
    setSearchParams(searchParams)
    window.scrollTo(0, scroll)
  }

  return (
      <ul className={s.pagination}>
        {
            currentPage >=5 &&  <button onClick={onStartClick} className={s.btn}>В начало</button>
        }

        {
            currentPage >=5 && <PageNumber number="..."/>
        }
        
        <PageNumber number={+currentPage-2}/>
        <PageNumber number={+currentPage-1}/>
        <PageNumber number={+currentPage}/>
        
        {
            (pageCountTotal - currentPage) >= 1 && <PageNumber number={+currentPage+1}/>  
        }

        {
            (pageCountTotal - currentPage) >= 2 && <PageNumber number={+currentPage+2}/>
        }
                
      </ul>
  );

};

export default CurrentCloseToTotal;