import s from './CheckboxFilterItem.module.scss';

const CheckboxFilterItem = ({item}) => {
  
  const {value, valueHandle} = item
  
  return (
      <div className={s.item}>
        {value}
      </div>
  );
};

export default CheckboxFilterItem;