import s from './CurrentPageMoreThanFive.module.scss';
import PageNumber from "@/components/CategoryBlock/Pagination/PageNumber/PageNumber.jsx";
import {useSearchParams} from "react-router-dom";

const CurrentPageMoreThanFive = () => {
  
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1
  
  const onStartClick = () => {
    searchParams.set('page', 1)
    setSearchParams(searchParams)
  }
  const onNextClick = () => {
    searchParams.set('page', +currentPage + 1)
    setSearchParams(searchParams)
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
        <PageNumber number={+currentPage+1}/>
        <PageNumber number={+currentPage+2}/>
        <PageNumber number="..." />
        <button onClick={onNextClick} className={s.btn}>Дальше</button>
      </ul>
  );
};

export default CurrentPageMoreThanFive;