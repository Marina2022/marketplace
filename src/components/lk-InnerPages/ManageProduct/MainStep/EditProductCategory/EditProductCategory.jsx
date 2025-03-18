import s from './EditProductCategory.module.scss';
import {forwardRef, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";
import MainCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditCategory/MainCategory.jsx";
import CategoryDropdown
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/CategoryDropdown/CategoryDropdown.jsx";


const EditProductCategory = forwardRef(({getValues, name, cats}, ref) => {

  const [editing, setEditing] = useState(true);
  const handleClick = () => {
    setEditing(true)
  }

  const [search, setSearch] = useState('sdfdsf')

  if (!cats) return null

  return (
    // <div className={s.wrapper} onClick={handleClick} tabIndex={0} onBlur={()=>setEditing(false)} >   // потом вернуть onBlur
    <div onClick={handleClick} tabIndex={0}>
      <div className={editing ? s.catInputBordered : s.catInput}>
        {
          getValues(name)
        }
        <div className={s.empty}>
          <span>Категория в магазине</span>
          <span className={s.requiredStar}>*</span>
        </div>
      </div>

      {editing && <CategoryDropdown cats={cats} search={search}/>}
    </div>
  );
});

EditProductCategory.displayName = "EditProductCategory";

export default EditProductCategory;

