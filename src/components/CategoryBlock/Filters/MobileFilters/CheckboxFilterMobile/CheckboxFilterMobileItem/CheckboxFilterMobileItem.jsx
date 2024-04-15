import s from './CheckboxFilterMobileItem.module.scss';
const CheckboxFilterMobileItem = ({valueObject, currentFilters, filter, setCurrentFilters}) => {
  let isActive = false
  const {value, valueHandle} = valueObject

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
      <li className={isActive ? s.activeItem : s.item} onClick={onFilterItemClick}>

        {value}
        <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
              d="M0.731051 7C0.545232 7 0.359413 6.93154 0.212714 6.78484C-0.0709046 6.50122 -0.0709046 6.03179 0.212714 5.74817L5.74817 0.212714C6.03179 -0.0709046 6.50122 -0.0709046 6.78484 0.212714C7.06846 0.496333 7.06846 0.96577 6.78484 1.24939L1.24939 6.78484C1.11247 6.93154 0.91687 7 0.731051 7Z"
              fill="#658092"/>
          <path
              d="M6.2665 7C6.08068 7 5.89487 6.93154 5.74817 6.78484L0.212714 1.24939C-0.0709046 0.96577 -0.0709046 0.496333 0.212714 0.212714C0.496333 -0.0709046 0.96577 -0.0709046 1.24939 0.212714L6.78484 5.74817C7.06846 6.03179 7.06846 6.50122 6.78484 6.78484C6.63814 6.93154 6.45232 7 6.2665 7Z"
              fill="#658092"/>
        </svg>
      </li>
  );
};

export default CheckboxFilterMobileItem;