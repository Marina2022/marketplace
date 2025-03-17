import {forwardRef, useState} from "react";
import s from "./Input.module.scss";

const Input = forwardRef(({getValues, name, onChange, required=false, placeholder=''}, ref) => {
  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    if (!editing) setEditing(true)
  }
  const handleBlur = () => {
    setEditing(false)
  }

  return (
    <div onClick={handleClick}>
      {!editing && <div className={s.notEditing}>
        {
          getValues(name)
        }

        {
          required && !getValues(name) && <div className={s.empty}><span className={s.placeholder}> {placeholder}</span> <span className={s.requiredStar}>*</span></div>
        }
          
      
      </div>}

      {editing && (
        <div>
          <input className={s.input} ref={ref} name={name} onChange={onChange} autoFocus onBlur={handleBlur}/>
        </div>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;
