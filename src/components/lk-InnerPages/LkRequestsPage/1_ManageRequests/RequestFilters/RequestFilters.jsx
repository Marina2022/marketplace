import s from './RequestFilters.module.scss';
import filtersIcon from "@/assets/img/filterIcon.svg";


const RequestFilters = () => {
  return (
    <div>
      <button className={s.filtersButton}>
        <img src={filtersIcon} alt="icon"/>
        Фильтры
      </button>
      
    </div>
  );
};

export default RequestFilters;
