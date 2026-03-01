import {useState} from "react";
import s from "./InputSimple.module.scss";
import InputInfoButton from "@/components/ui/Input/InputInfoButton/InputInfoButton.jsx";

const InputSimple = ({
                       value,
                       errors,
                       setErrors,
                       required = false,
                       placeholder = '',
                       infoButton = false,
                       setValue,
                       className = "",
                       name
                     }) => {

  console.log('value = ', value)


  const [editing, setEditing] = useState(false);


  const handleClick = () => {
    if (!editing) setEditing(true)
  }

  const handleBlur = () => {
    setEditing(false)
  }

  const handleClear = () => {
    setValue('')
  }

  const handleChange = (e) => {
    // setErrors(prev => ({...prev, [name]: ''}))
    setValue(e.target.value)
  }

  const onFocus = () => {
    setErrors(prev => ({...prev, [name]: ''}))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.rightPartBlock}>
        {
          infoButton && <InputInfoButton/>
        }
      </div>

      <div onClick={handleClick} className={`${s.inputWrapper} ${className}`}>

        {
          value && <button className={infoButton ? s.clearBtnInfo : s.clearBtn} type="button" onClick={handleClear}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5.11137" y1="5.11092" x2="12.8895" y2="12.8891" stroke="#658092"/>
              <line x1="5.10738" y1="12.8891" x2="12.8856" y2="5.11089" stroke="#658092"/>
            </svg>
          </button>
        }

        {!editing && <div className={`${s.notEditing} ${errors[name] ? s.errorInput : ''} `}>
        
        <span className={s.inputValue}>
          {
            value
          }
        </span>

          {
            !value &&
            <div className={s.empty}><span> {placeholder}</span>
              {
                required && <span className={s.requiredStar}>*</span>
              }
            </div>
          }
        </div>}

        {editing && (
          <div>
            <input autoFocus value={value} className={`${s.input} `} onFocus={onFocus} onChange={handleChange} onBlur={handleBlur}/>
          </div>
        )}
      </div>

      {
        errors[name] && <p className={s.errorMessage}>{errors[name]}</p>
      }
    </div>
  )
}


export default InputSimple;
