import s from './CurrentPageLessThanFive.module.scss';
import PageNumber from "@/components/CategoryBlock/Pagination/PageNumber/PageNumber.jsx";
import {useSearchParams} from "react-router-dom";

const CurrentPageLessThanFive = ({pageCountTotal}) => {

  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page')
  
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
  }

  return (
      <ul className={s.pagination}>

        {
          pageArray.map((item, index) => <PageNumber key={index} number={item}/>)
        }
        {
            showFurther && <PageNumber number="..."/>
        }
        {
            showFurther && <button onClick={onNextClick} className={s.btn}>Дальше</button>
        }
      </ul>
  );
};

export default CurrentPageLessThanFive;