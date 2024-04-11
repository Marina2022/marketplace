import s from './CheckboxFilterItem.module.scss';
import {useSearchParams} from "react-router-dom";

const CheckboxFilterItem = ({item, filterNameHandle}) => {
  
  const {value, valueHandle} = item
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

        searchParams.set(filterNameHandle,filteredArray.join(','))
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
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.6" y="1.1" width="14.8" height="14.8" stroke="#AAB7BF" strokeWidth="1.2"/>
            </svg>
        }

        {
            isSelected &&
            <svg width="16" height="17" viewBox="0 0 16 17" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect y="0.5" width="16" height="16" fill="#E32636"/>
              <path
                  d="M6.5775 12.1675C6.3775 12.1675 6.1875 12.0875 6.0475 11.9475L3.2175 9.1175C2.9275 8.8275 2.9275 8.3475 3.2175 8.0575C3.5075 7.7675 3.9875 7.7675 4.2775 8.0575L6.5775 10.3575L11.7175 5.2175C12.0075 4.9275 12.4875 4.9275 12.7775 5.2175C13.0675 5.5075 13.0675 5.9875 12.7775 6.2775L7.1075 11.9475C6.9675 12.0875 6.7775 12.1675 6.5775 12.1675Z"
                  fill="white"/>
            </svg>
        }

        {value}
      </li>
  );
};

export default CheckboxFilterItem;