import s from './OneFilterValue.module.scss';

const OneFilterValue = ({filterValue, selectedFilters, setSelectedFilters, filterName}) => {

  const currentSelectedFilter = selectedFilters.find(selectedFilter => selectedFilter.filterName === filterName)

  let active = false
  if (currentSelectedFilter) {
    active = currentSelectedFilter.filterValues.includes(filterValue.filterValue)
  }
  const handleClick = () => {

    const tempSelectedFilters = JSON.parse(JSON.stringify(selectedFilters))
    let tempCurrentFilter
    
    if (!active) {
      if (currentSelectedFilter) {
        tempCurrentFilter = tempSelectedFilters.find(filter => filter.filterName === currentSelectedFilter.filterName)
      }
      if (tempCurrentFilter) {
        tempCurrentFilter.filterValues.push(filterValue.filterValue)
      }

      if (!tempCurrentFilter) tempSelectedFilters.push({
        filterName: filterName,
        filterValues: [filterValue.filterValue]
      })
      setSelectedFilters(tempSelectedFilters)

    } else {
      tempCurrentFilter = tempSelectedFilters.find(filter => filter.filterName === currentSelectedFilter.filterName)      
      const newValues = tempCurrentFilter.filterValues.filter(value=>value!==filterValue.filterValue)
      tempCurrentFilter.filterValues = newValues
      setSelectedFilters(tempSelectedFilters)      
    }
  }

  return (
    <div onClick={handleClick} className={`${s.oneValue} ${active ? s.oneValueActive : ''}`}>
      <span>{filterValue.filterDisplay}</span>
      {
        active && <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0.731051 7C0.545232 7 0.359413 6.93154 0.212714 6.78484C-0.0709046 6.50122 -0.0709046 6.03179 0.212714 5.74817L5.74817 0.212714C6.03179 -0.0709046 6.50122 -0.0709046 6.78484 0.212714C7.06846 0.496333 7.06846 0.96577 6.78484 1.24939L1.24939 6.78484C1.11247 6.93154 0.91687 7 0.731051 7Z"
            fill="#658092"/>
          <path
            d="M6.2665 7C6.08068 7 5.89487 6.93154 5.74817 6.78484L0.212714 1.24939C-0.0709046 0.96577 -0.0709046 0.496333 0.212714 0.212714C0.496333 -0.0709046 0.96577 -0.0709046 1.24939 0.212714L6.78484 5.74817C7.06846 6.03179 7.06846 6.50122 6.78484 6.78484C6.63814 6.93154 6.45232 7 6.2665 7Z"
            fill="#658092"/>
        </svg>
      }
    </div>
  );
};

export default OneFilterValue;