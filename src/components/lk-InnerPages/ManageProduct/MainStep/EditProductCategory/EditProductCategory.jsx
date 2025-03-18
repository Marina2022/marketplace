import s from './EditProductCategory.module.scss';
import {forwardRef, useState} from "react";
import CategoryDropdown
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/CategoryDropdown/CategoryDropdown.jsx";

import {findProductCategoryName} from "@/utils/lkShop.js";

const EditProductCategory = forwardRef(({getValues, name, cats, setValue, clearErrors}, ref) => {

  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    setEditing(prev => !prev)
  }

  const [search, setSearch] = useState('')

  if (!cats) return null

  return (

    <div className={s.wrapper}>
      <div className={editing ? s.catInputBordered : s.catInput} onClick={handleClick}>
        {
          getValues(name) && findProductCategoryName(cats, getValues(name))
        }

        {
          !getValues(name) && <div className={s.empty}>
            <span>Категория в магазине</span>
            <span className={s.requiredStar}>*</span>
          </div>
        }

      </div>

      {editing && <CategoryDropdown
        cats={cats}
        search={search}
        setValue={setValue}
        getValues={getValues}
        setEditing={setEditing} clearErrors={clearErrors}/>}
    </div>
  );
});

EditProductCategory.displayName = "EditProductCategory";

export default EditProductCategory;

