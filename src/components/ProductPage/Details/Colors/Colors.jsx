import s from './Colors.module.scss';


const Colors = ({options, sku, handleOptionClick}) => {
  
  const currentOption = options.find(item => item.sku === sku)
  const currentColor = currentOption.values.find(item => item.optionHandle === 'color').value.val
  const colorSet = new Set();
  const uniqueColors = [];
  const optionsNew = [...options]

  optionsNew.forEach(option => {
    option.values
      .filter(value => value.optionHandle === 'color')
      .forEach(value => {
        const color = value.value;
        if (!colorSet.has(color.val)) {
          colorSet.add(color.val);
          uniqueColors.push(color);
        }
      });
  });

  return (
    <div className={s.wrapper}>
      <h2 className={s.title}>Цвет товара:</h2>
      <ul className={s.colorList}>        {
        uniqueColors.map((color) => {
          return (
            <li
              onClick={() => handleOptionClick({optionName: 'color', optionValue: color.val, optionLabel: color.label})}
              className={color.val === currentColor ? s.colorItemActive : s.colorItem}
              key={color.val}
              style={{background: color.val}}></li>
          )
        })
      }
      </ul>
    </div>
  );
};

export default Colors;