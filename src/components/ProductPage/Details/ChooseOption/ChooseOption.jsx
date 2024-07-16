import s from './ChooseOption.module.scss';

const ChooseOption = ({options, sku, optionType, handleOptionClick}) => {
    
  const optionsNew = [...options]
  const currentOption = options.find(item => item.sku === sku)
  const currentValue = currentOption.values.find(item => item.optionHandle === optionType.name).value.val
  const optionSet = new Set();
  const uniqueOptions = [];

  optionsNew.forEach(option => {
    option.values
      .filter(value => value.optionHandle === optionType.name)
      .forEach(value => {
        const color = value.value;
        if (!optionSet.has(color.val)) {
          optionSet.add(color.val);
          uniqueOptions.push(color);
        }
      });
  });

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{optionType.label}:</h2>
      <ul className={s.optionList}>
        {
          uniqueOptions.map(item => <div
            key={item.val}
            className={currentValue === item.val ? s.optionItemActive : s.optionItem}
            onClick={()=>handleOptionClick({optionName: optionType.name, optionValue:item.val, optionLabel: item.label})}
          >            
            {item.label}
          </div>)
        }
      </ul>
    </div>
  );
};

export default ChooseOption;