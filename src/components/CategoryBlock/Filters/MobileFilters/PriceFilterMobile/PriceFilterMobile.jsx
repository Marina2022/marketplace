import s from './PriceFilter.moduleMobile.module.scss';

const PriceFilterMobile = ({filter, currentFilters, setCurrentFilters}) => {

  console.log('filter из Цены ', filter)
  
  
  const {filterName, nameHandle, unit, filterSettings} = filter
  
  const min = filterSettings[0]  // {value: 0, valueHandle: "minValue"}
  const max = filterSettings[1]
  
  const inputFromState = currentFilters.find(filter=>filter.nameHandle === "minPrice").selectedValue
  const inputToState = currentFilters.find(filter=>filter.nameHandle === "maxPrice").selectedValue
  
  const onFromChange = (e) => {
    if (e.target.value.match(/\D/)) {
      e.target.value = e.target.value.replace(/\D/, '');
    }

    if (e.target.value.match(/^0+/)) {
      e.target.value = e.target.value.replace(/^0+/, '');
    }

    const newState = [...currentFilters]

    const priceFilter = newState.find(filter=>filter.nameHandle === "minPrice")
    priceFilter.selectedValue =  e.target.value
    setCurrentFilters(newState)
  }

  const onToChange = (e) => {
    if (e.target.value.match(/\D/)) {
      e.target.value = e.target.value.replace(/\D/, '');
    }

    if (e.target.value.match(/^0+/)) {
      e.target.value = e.target.value.replace(/^0+/, '');
    }

    //setCurrentFilters
    
    const newState = [...currentFilters]
    
    const priceFilter = newState.find(filter=>filter.nameHandle === "maxPrice")
    priceFilter.selectedValue =  e.target.value
    setCurrentFilters(newState)
    
  }
  
  return (
      <li className={s.filterItem}>
        <div className={s.topWrapper}>
          <h2 className={s.title}>{filterName}</h2>


        </div>
        <div className={s.inputWrapper}>

          <input className={s.input} type="text"
                 placeholder="от"
                 value={inputFromState}
                 onChange={onFromChange}
          />
          <input className={s.input}
                 type="text"
                 placeholder="до"
                 value={inputToState}
                 onChange={onToChange}
          />
        </div>
      </li>
  );
};

export default PriceFilterMobile;