import {forwardRef, useState} from "react";
import s from "./Input.module.scss";
import InputInfoButton from "@/components/ui/Input/InputInfoButton/InputInfoButton.jsx";

const Input = forwardRef(({
                            getValues,
                            name,
                            onChange,
                            isError,
                            required = false,
                            placeholder = '',
                            trigger,
                            infoButton = false,
                            setValue,
                            setFormWasEdited,
                          }, ref) => {

  const [editing, setEditing] = useState(false);

  const handleClick = () => {
    if (!editing) setEditing(true)
  }
  const handleBlur = () => {
    trigger(name)
    setEditing(false)
  }
  const customOnChange = (e) => {
    onChange(e)
    trigger(name)
    setFormWasEdited(true)
  }
  const handleClear = () => {
    setValue(name, '')
    setFormWasEdited(true)
  }

  return (
    <div className={s.wrapper}>
      <div className={s.rightPartBlock}>        
        {
          infoButton && <InputInfoButton/>           
        }
      </div>

      <div onClick={handleClick} className={s.inputWrapper}>

        {
          getValues(name) && <button className={infoButton ? s.clearBtnInfo : s.clearBtn} type="button" onClick={handleClear}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <line x1="5.11137" y1="5.11092" x2="12.8895" y2="12.8891" stroke="#658092"/>
              <line x1="5.10738" y1="12.8891" x2="12.8856" y2="5.11089" stroke="#658092"/>
            </svg>
          </button>
        }        

        {!editing && <div className={`${s.notEditing} ${isError ? s.errorInput : ''}`}>
        
        <span className={s.inputValue}>
          {
            getValues(name)
          }
        </span>

          {
            !getValues(name) &&
            <div className={s.empty}><span> {placeholder}</span>
              {
                required && <span className={s.requiredStar}>*</span>
              }
            </div>
          }
        </div>}

        {editing && (
          <div>
            <input className={s.input} ref={ref} name={name} onChange={customOnChange} autoFocus onBlur={handleBlur}/>
          </div>
        )}
      </div>
    </div>
  );
});

Input.displayName = "Input";

export default Input;
