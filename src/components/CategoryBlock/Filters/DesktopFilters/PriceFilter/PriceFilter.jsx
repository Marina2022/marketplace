import s from './PriceFilter.module.scss';
import FiltersDropdown from "@/components/CategoryBlock/Filters/FiltersDropdown/FiltersDropdown.jsx";
import {useEffect, useState} from "react";

import 'nouislider/dist/nouislider.css';
import {useSearchParams} from "react-router-dom";
import {useDebounce} from "@uidotdev/usehooks";

const PriceFilter = ({filter, filtersWrapper, rightPartRef}) => {

  const {filterName, filterSettings, nameHandle} = filter

  const [min, max] = filterSettings

  const [fromValue, setFromValue] = useState(+min.value)
  const [toValue, setToValue] = useState(+max.value)

  const debouncedFromValue = useDebounce(fromValue, 300);
  const debouncedToValue = useDebounce(toValue, 300);

  const [searchParams, setSearchParams] = useSearchParams();

  const [inputFromValue, setInputFromValue] = useState('')
  const [inputToValue, setInputToValue] = useState('')

  useEffect(() => {
    searchParams.set('minPrice', debouncedFromValue)
    searchParams.set('maxPrice', debouncedToValue)
    setSearchParams(searchParams)

  }, [debouncedFromValue, debouncedToValue]);

  const onInputFromChange = (e) => {
    if (e.target.value.match(/\D/)) {
      e.target.value = e.target.value.replace(/\D/, '');
    }

    if (e.target.value.match(/^0+/)) {
      e.target.value = e.target.value.replace(/^0+/, '');
    }

    setInputFromValue(e.target.value)
  }

  const onInputToChange = (e) => {
    if (e.target.value.match(/\D/)) {
      e.target.value = e.target.value.replace(/\D/, '');
    }

    if (e.target.value.match(/^0+/)) {
      e.target.value = e.target.value.replace(/^0+/, '');
    }

    setInputToValue(e.target.value)

  }

  const onInputFromBlur = () => {
    if (inputFromValue === '') {
      setFromValue(min.value)
    } else {
      if (+inputFromValue > +inputToValue) return

      if (+inputFromValue < +min.value) {
        setFromValue(min.value)
      } else {
        setFromValue(inputFromValue)
      }
    }


  }

  const onInputToBlur = (e) => {

    if (inputToValue === '') {
      setToValue(max.value)
    } else {
      if (+inputFromValue > +inputToValue) return
      if (+inputToValue > +max.value) {
        setToValue(max.value)

      } else {
        setToValue(inputToValue)
      }
    }
  }


  const onInputFromEnter = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
      onInputFromBlur()
    }
  }

  const onInputToEnter = (e) => {
    console.log(e.keyCode)
    if (e.keyCode === 13) {
      onInputToBlur()
    }
  }

  const onFromChangeRange = (e) => {

    if (e.target.value >= +toValue) return

    if (e.target.value === '') e.target.value = +min.value


    setFromValue(e.target.value)
    setInputFromValue(e.target.value)

  }

  const onToChangeRange = (e) => {


    if (e.target.value <= +fromValue) return

    if (e.target.value === '') e.target.value = +max.value

    if (e.target.value.match(/\D/)) {
      e.target.value = e.target.value.replace(/\D/, '');
    }

    if (+e.target.value > max.value) {
      console.log('больше разве?')
      e.target.value = max.value
    }
    setToValue(e.target.value)

    setInputToValue(e.target.value)
  }


  return (
      <FiltersDropdown title={`${filterName}, ${filter.unit}`} filtersWrapper={filtersWrapper}
                       rightPartRef={rightPartRef}
                       filter={nameHandle}>
        <div className={s.rangeSlider}>

          <input className={s.inputRanges} type="range" min={+min.value} max={+max.value}
                 value={fromValue}
                 onChange={onFromChangeRange}
          />
          <input className={s.inputRanges} type="range" min={+min.value} max={+max.value}
                 value={toValue}
                 onChange={onToChangeRange}
          />

          <div className={s.redLine}
               style={{
                 marginLeft: fromValue / (max.value - min.value) * 100 + '%',
                 width: (toValue - fromValue) / (max.value - min.value) * 100 + '%',
                 maxWidth: '100%'
               }}
          ></div>
        </div>


        <div className={s.inputWrapper}>

          <input value={inputFromValue} onChange={onInputFromChange} className={s.input} type="text"
                 placeholder="от" onBlur={onInputFromBlur} onKeyDown={onInputFromEnter}/>
          <input value={inputToValue} onChange={onInputToChange} onKeyDown={onInputToEnter} className={s.input}
                 type="text"
                 placeholder="до" onBlur={onInputToBlur}/>
        </div>


      </FiltersDropdown>
  );
};

export default PriceFilter;