import s from './PageNumber.module.scss';
import {useSearchParams} from "react-router-dom";

const PageNumber = ({number}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1
  const onNumberClick = () => {

    if (number === '...') return
    searchParams.set('page', number)
    setSearchParams(searchParams)
  }

  let classname

  if (+currentPage === number) {
    classname = s.pageNumberActive
  } else {
    classname = s.pageNumber
  }

  if (number === '...') classname = s.pageNumberDisabled

  return (
      <li onClick={onNumberClick} className={classname}>
        {number}
      </li>
  );
};

export default PageNumber;