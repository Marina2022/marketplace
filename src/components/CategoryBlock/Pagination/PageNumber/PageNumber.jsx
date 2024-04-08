import s from './PageNumber.module.scss';
import {useSearchParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setScroll} from "@/store/catalogSlice.js";

const PageNumber = ({number}) => {
  const dispatch = useDispatch()
  const [searchParams, setSearchParams] = useSearchParams();
  const currentPage = searchParams.get('page') || 1
  const onNumberClick = () => {

    if (number === '...') return
    searchParams.set('page', number)
    setSearchParams(searchParams)
    dispatch(setScroll(0))
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