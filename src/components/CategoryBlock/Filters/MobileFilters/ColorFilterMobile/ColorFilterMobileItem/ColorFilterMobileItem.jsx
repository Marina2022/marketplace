import s from './ColorFilterMobileItem.module.scss';

const ColorFilterMobileItem = ({valueObject, currentFilters, filter, setCurrentFilters}) => {
  let isActive = false
  const {value, valueHandle, exparam} = valueObject

  // filterHandle текущего фильтра, из которого компонент делается, (например, brand)
  const {nameHandle} = filter

  const filterFromAddressBar = currentFilters.find(filterItem => filterItem.nameHandle === nameHandle)

  if (filterFromAddressBar) {


    if (filterFromAddressBar.selectedValue.split(',').includes(valueHandle)) {
      isActive = true
    }
  }
  const onFilterItemClick = () => {

    // добавляем в стейт
    if (!isActive) {

      const newState = [...currentFilters]
      let currentFilter = newState.find(filter => filter.nameHandle === nameHandle)

      if (currentFilter) {
        const valueArray = currentFilter.selectedValue.split(',')
        valueArray.push(valueHandle)
        const valueString = valueArray.join(',')
        currentFilter.selectedValue = valueString
      } else {

        const newStateItem = {
          ...filter,
          selectedValue: valueHandle
        }
        newState.push(newStateItem)
      }
      setCurrentFilters(newState)
    }

    // удаляем из стейта
    if (isActive) {
      // меняем строку значения фильтра 
      const newState = [...currentFilters]
      let currentFilter = newState.find(filter => filter.nameHandle === nameHandle)
      const valueArray = currentFilter.selectedValue.split(',')

      if (valueArray.length > 1) {
        const newValueArray = valueArray.filter(item => item !== valueHandle)
        const valueString = newValueArray.join(',')
        currentFilter.selectedValue = valueString
        setCurrentFilters(newState)
      }

      if (valueArray.length === 1) {
        //удаляем весь фильтр из стейта
        const anotherNewState = newState.filter(filter => filter.nameHandle !== nameHandle)
        setCurrentFilters(anotherNewState)
      }
    }
  }

  return (
      <li onClick={onFilterItemClick} >

        {
            !isActive &&
            <div className={s.colorItem} style={{background: exparam}}></div>
        }

        {
            isActive &&
            <div className={s.colorItem} style={{background: exparam}}>
              <svg width="8" height="7" viewBox="0 0 8 7" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M2.86343 6.23687C2.70335 6.23687 2.55128 6.17284 2.43922 6.06078L0.174087 3.79565C-0.058029 3.56353 -0.058029 3.17934 0.174087 2.94722C0.406203 2.71511 0.790395 2.71511 1.02251 2.94722L2.86343 4.78814L6.97749 0.674087C7.2096 0.441971 7.5938 0.441971 7.82591 0.674087C8.05803 0.906203 8.05803 1.29039 7.82591 1.52251L3.28764 6.06078C3.17559 6.17284 3.02351 6.23687 2.86343 6.23687Z"
                    fill="white"/>
              </svg>
            </div>

        }        
      </li>


  )
      ;
};

export default ColorFilterMobileItem;