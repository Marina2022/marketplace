import s from './OneFilterValue.module.scss';

const OneFilterValue = ({filterValue, selectedFilters, setSelectedFilters, filterName, ratingValue=false}) => {

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
    <div onClick={handleClick} className={`${ratingValue ? s.oneValueStar : s.oneValue} ${active ? s.oneValueActive : ''}`}>
      <span>{filterValue.filterDisplay}</span>
      {
        ratingValue && filterValue.filterValue !== "unrated" && <svg className={s.star} width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.54458 1.59181C6.83495 0.652131 8.16505 0.652134 8.45542 1.59181L9.40683 4.67063C9.53631 5.08964 9.92369 5.37539 10.3623 5.37539H13.5437C14.5002 5.37539 14.9109 6.58937 14.1508 7.17004L11.492 9.20116C11.159 9.45557 11.0199 9.89066 11.1436 10.2911L12.1386 13.5108C12.426 14.441 11.3498 15.1918 10.5761 14.6007L8.10706 12.7145C7.74866 12.4407 7.25134 12.4407 6.89294 12.7145L4.42389 14.6007C3.6502 15.1918 2.57395 14.441 2.8614 13.5108L3.85636 10.2911C3.98009 9.89066 3.84103 9.45557 3.508 9.20116L0.849234 7.17004C0.0891205 6.58937 0.499761 5.37539 1.45629 5.37539H4.63775C5.0763 5.37539 5.46369 5.08964 5.59317 4.67063L6.54458 1.59181Z"
            fill="#E32636"/>
        </svg>
      }

      {
        active && !ratingValue &&  <svg width="7" height="7" viewBox="0 0 7 7" fill="none" xmlns="http://www.w3.org/2000/svg">
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