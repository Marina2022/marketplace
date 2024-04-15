import s from './CurrentPageLessThanFive.module.scss';
import PageNumber from "@/components/CategoryBlock/Pagination/PageNumber/PageNumber.jsx";
import {useSearchParams} from "react-router-dom";
const CurrentPageLessThanFive = ({pageCountTotal}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  let currentPage = searchParams.get('page') || 1 
    
  let pageArray
  let showFurther = true

  if (pageCountTotal < 9) {
    pageArray = Array.from({length: pageCountTotal}, (_, i) => i + 1)
    showFurther = false
  } else {
    pageArray = Array.from({length: 8}, (_, i) => i + 1)
  }
  const onNextClick = () => {
    searchParams.set('page', +currentPage + 1)
    setSearchParams(searchParams)
    window.scrollTo(0, scroll)
  }

  if (pageCountTotal === 1) return <></>
  
  
  return (
      <ul className={s.pagination}>

        {
          pageArray.map((item, index) => <PageNumber key={index} number={item}/>)
        }
        {
            showFurther && <PageNumber number="..."/>
        }
        {            
            pageCountTotal !== +currentPage &&  <button onClick={onNextClick} className={s.btn}>Дальше</button>
        }
      </ul>
  );
};

export default CurrentPageLessThanFive;