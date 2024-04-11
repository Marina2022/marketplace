import s from './PriceFilter.moduleMobile.module.scss';

const PriceFilterMobile = ({filter}) => {
  const {filterName} = filter
  return (
      <li className={s.filterItem}>
        <div className={s.topWrapper}>
          <h2 className={s.title}>{filterName}</h2>
        </div>
      </li>
  );
};

export default PriceFilterMobile;