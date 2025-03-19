import {forwardRef, useState} from "react";
import s from "./Input.module.scss";

const Input = forwardRef(({getValues, name, onChange, onBlur, required = false, placeholder = '', trigger}, ref) => {
  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    if (!editing) setEditing(true)
  }

  const handleBlur = () => {
    trigger(name)
    setEditing(false)    
  }
  
  const customOnChange = (e)=>{
    onChange(e)
    trigger(name)
  }

  return (
    <div className={s.wrapper} onClick={handleClick}>
      {!editing && <div className={s.notEditing}>
        
        <span className={s.inputValue}>
          {
            getValues(name)
          }
        </span>

        {
          required && !getValues(name) &&
          <div className={s.empty}><span> {placeholder}</span>
            <span className={s.requiredStar}>*</span></div>
        }
      </div>}

      {editing && (

        <div>
          <input className={s.input} ref={ref} name={name} onChange={customOnChange} autoFocus onBlur={handleBlur}/>

        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
