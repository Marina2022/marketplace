import s from './EditProductPageSelect.module.scss';
import {forwardRef, useEffect, useRef, useState} from "react";
import EditProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditProductCategory.jsx";
import {notEmptyMessage} from "@/consts/notEmptyMessage.js";


const demoCountries = {
  isRequired: true,
  label: "Страна производства",
  name: "originCountry",
  options: [
    {valueId: 'd480260f-8069-415f-88c3-629636d2a03f', value: 'Китай'},
    {valueId: 'd480260f-8069-415f-88c1-629636d2a03f', value: 'Япония'},
    {valueId: 'd480260f-8069-415f-88c2-629636d2a03f', value: 'Зимбабве'},
    {valueId: 'd480260f-8069-415f-88c4-629636d2a03f', value: 'Россия'},
    {valueId: 'd480260f-8069-415f-88c5-629636d2a03f', value: 'Франция'},
    {valueId: 'd480260f-806w-415f-88c6-629636d2a03f', value: 'Парагвай'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a01f', value: 'США'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a02f', value: 'Уругвай'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a03f', value: 'Германия'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a04f', value: 'Италия'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a05f', value: 'Австралия'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a06f', value: 'Занзибар'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a07f', value: 'Тайланд'},
    {valueId: 'd480260f-8069-415f-88c6-629636d2a08f', value: 'Индия'},
  ],
  type:
    "select"
}

// eslint-disable-next-line react/display-name
const EditProductPageSelect = forwardRef(({
                                            name,
                                            data,
                                            getValues,
                                            setValue,
                                            clearErrors,
                                            trigger,
                                            isError,
                                            placeholder = '',
                                            required

                                          }, ref) => {

    const [editing, setEditing] = useState(false);
  const handleClick = () => {
    setEditing(prev => {
        if (prev === true) {
          trigger(name)
        }
        if (prev === false) {
          clearErrors(name)
        }
        return !prev
      }
    )
  }

  const handleBlur = () => {
    trigger(name)
    setEditing(false)
  }
  
  
  const handleOptionClick = (option) => {
    setValue(name, option)
    setEditing(false)
  }

   
  return (
    <div>
      <div onBlur={handleBlur} tabIndex={0}>
        <div onClick={handleClick} className={`${s.notEditing} ${isError ? s.errorField : ''}`}>

          <svg className={editing ? s.dropdownIconOpened : s.dropdownIcon} width="18" height="9" viewBox="0 0 18 9"
               fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M9.00344 8.80001C8.30344 8.80001 7.60344 8.53001 7.07344 8.00001L0.553438 1.48001C0.263438 1.19001 0.263438 0.710015 0.553438 0.420015C0.843437 0.130015 1.32344 0.130015 1.61344 0.420015L8.13344 6.94001C8.61344 7.42001 9.39344 7.42001 9.87344 6.94001L16.3934 0.420015C16.6834 0.130015 17.1634 0.130015 17.4534 0.420015C17.7434 0.710015 17.7434 1.19001 17.4534 1.48001L10.9334 8.00001C10.4034 8.53001 9.70344 8.80001 9.00344 8.80001Z"
              fill="#658092"/>
          </svg>

          <span className={s.inputValue}>
          {
            getValues(name) && getValues(name).value
          }
        </span>

          {
            required && !getValues(name) &&
            <div className={s.empty}><span> {placeholder}</span>
              <span className={s.requiredStar}>*</span></div>
          }
        </div>

        {
          isError && <p className={s.errorMessage}>{notEmptyMessage}</p>
        }

        {editing && (
          <div className={s.dropdownWrapper}>
            <ul className={`${s.dropdownInner} lk-scroll`}

                ref={(node) => {
                  if (node) {                    
                    if (node.scrollHeight < 472) node.style.width = '100%'
                  }
                }}

            >
              {
                // data.options.map(option => {
                demoCountries.options.map(option => {
                  return (
                    <li key={option.valueId}
                        onClick={()=>handleOptionClick(option)}
                        className={s.selectOption}
                    >
                      {option.value}
                    </li>
                  )
                })
              }
            </ul>
          </div>
        )}
      </div>

    </div>

  )
})

EditProductCategory.displayName = name
export default EditProductPageSelect;