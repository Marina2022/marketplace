import {forwardRef, useState} from "react";
import s from "./Input.module.scss";

const Input = forwardRef(({getValues, name, onChange, required = false, placeholder = '', trigger}, ref) => {
  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    if (!editing) setEditing(true)
  }
  const handleBlur = () => {
    trigger('productName')
    setEditing(false)    
  }

  return (
    <div className={s.wrapper} onClick={handleClick}>
      {!editing && <div className={s.notEditing}>
        {
          getValues(name)
        }

        {
          required && !getValues(name) &&
          <div className={s.empty}><span> {placeholder}</span>
            <span className={s.requiredStar}>*</span></div>
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
