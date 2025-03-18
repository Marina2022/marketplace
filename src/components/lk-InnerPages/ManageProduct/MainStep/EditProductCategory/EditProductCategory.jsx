import s from './EditProductCategory.module.scss';
import {forwardRef, useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";
import MainCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditCategory/MainCategory.jsx";


const EditProductCategory = forwardRef(({getValues, name, cats}, ref) => {

  const [editing, setEditing] = useState(true);
  const handleClick = () => {        
    setEditing(true)
  }

  const [search, setSearch] = useState('')
  
  if (!cats) return null

  return (
    <div className={s.wrapper} onClick={handleClick} tabIndex={0} onBlur={()=>setEditing(false)} >
      <div className={editing ? s.bordered : s.notEditing}>
        {
          getValues(name)
        }
          <div className={s.empty }>
            <span className={s.placeholder}>Категория в магазине</span>
            <span className={s.requiredStar}>*</span>
          </div>
        
      </div>

      {editing && (
        <div className={s.catsDropdown}>

          <div className={s.content}>
            <ul>
              {
                cats.map(cat => <MainCategory key={cat.categoryId} cat={cat} search={search}  />)
              }
            </ul>
          </div>

          <div className={s.dropdownFooter}>
            <div className={s.footerLeft}>
              Если категории вашего товара не существует, отправьте заявку
            </div>
            <Button className={s.btn} type="button">Добавить категорию</Button>
          </div>
        </div>
      )}
    </div>
  );
});

EditProductCategory.displayName = "EditProductCategory";

export default EditProductCategory;

