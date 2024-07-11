import s from './ChooseOption.module.scss';

const ChooseOption = ({options, sku, optionType}) => {

  const currentOption = options.find(item=>item.sku === sku)
  const currentValue = currentOption.values.find(item=>item.optionHandle === optionType.name).value.val
    
  console.log(optionType)

  const optionSet = new Set();
  const uniqueOptions = [];
  
  options.forEach(option => {
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

  console.log(uniqueOptions)
  
  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>{optionType.label}:</h2>
      <ul className={s.optionList}>
        {
          uniqueOptions.map(item=> <div key={item.val}><div className={ currentValue === item.val ? s.optionItemActive : s.optionItem}>{item.label}</div></div> )
        }
      </ul>
      
    </div>
  );
};

export default ChooseOption;