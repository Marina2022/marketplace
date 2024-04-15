import s from './ColorFilterItem.module.scss'
import {useSearchParams} from "react-router-dom";

const CheckboxFilterItem = ({item, filterNameHandle}) => {
 
  const {value, valueHandle, exparam} = item
  const [searchParams, setSearchParams] = useSearchParams();
  const valueFromAddressBar = searchParams.get(filterNameHandle)

  let valuesArray = []

  if (valueFromAddressBar) {
    valuesArray = valueFromAddressBar.split(',')
  }

  let isSelected = false
  if (valuesArray.includes(valueHandle.toString())) isSelected = true

  const onCheck = () => {
    
    // Убираем значение из searchParams
    if (isSelected) {

      const filteredArray = valuesArray.filter(item => item !== valueHandle)

      if (filteredArray.length === 0) {
        searchParams.delete(filterNameHandle)
        searchParams.set('page', 1)
        setSearchParams(searchParams)

      } else {

        searchParams.set(filterNameHandle, filteredArray.join(','))
        searchParams.set('page', 1)
        setSearchParams(searchParams)
      }

      // добавляем значение в searchParams
    } else {
      valuesArray.push(valueHandle)
      searchParams.set(filterNameHandle, valuesArray.join(','))
      searchParams.set('page', 1)
      setSearchParams(searchParams)
    }
  }

  return (
      <li onClick={onCheck} className={s.item}>

        {
            !isSelected &&
            <div className={s.colorItem} style={{background: exparam}}></div>
        }

        {
            isSelected &&
            <div className={s.colorItem} style={{background: exparam}}>
              <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.86343 6.23687C2.70335 6.23687 2.55128 6.17284 2.43922 6.06078L0.174087 3.79565C-0.058029 3.56353 -0.058029 3.17934 0.174087 2.94722C0.406203 2.71511 0.790395 2.71511 1.02251 2.94722L2.86343 4.78814L6.97749 0.674087C7.2096 0.441971 7.5938 0.441971 7.82591 0.674087C8.05803 0.906203 8.05803 1.29039 7.82591 1.52251L3.28764 6.06078C3.17559 6.17284 3.02351 6.23687 2.86343 6.23687Z"
                    fill="white"/>
              </svg>
            </div>
        }
        {value}
      </li>
  );
};

export default CheckboxFilterItem;