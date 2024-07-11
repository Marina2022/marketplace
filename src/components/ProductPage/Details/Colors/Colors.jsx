import s from './Colors.module.scss';

const Colors = ({options, sku}) => {
  
  const currentOption = options.find(item=>item.sku === sku)
  const currentColor = currentOption.values.find(item=>item.optionHandle === 'color').value.val   

  const colorSet = new Set();
  const uniqueColors = [];

  options.forEach(option => {
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
              <li className={ color.val === currentColor ? s.colorItemActive : s.colorItem} key={color.val} style={{background: color.val}}></li>
            )
          })
        }
      </ul>

    </div>
  );
};

export default Colors;