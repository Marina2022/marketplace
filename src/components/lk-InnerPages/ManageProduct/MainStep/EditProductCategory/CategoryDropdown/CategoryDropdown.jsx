import s from './CategoryDropdown.module.scss';
import MainCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditCategory/MainCategory.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";

const CategoryDropdown = ({cats, search, setValue, getValues, setEditing}) => {
  
  const [selectedCatId, setSelectedCatId] = useState(getValues("productCategoryId"))
  
  const submitCategory = (e)=>{
    e.stopPropagation()
    console.log("submitCategory-----------")
    setValue('productCategoryId', selectedCatId)
    setEditing(false)
  }
  
  return (
      <div className={s.catsDropdown}>
      <div className={s.searchBlock}></div>
     
      <div className={`${s.content} lk-scroll`}>
        <ul>
          {
            cats.map((cat) => <MainCategory 
              key={cat.categoryId} 
              cat={cat} 
              search={search} 
              selectedCatId={selectedCatId} 
              setSelectedCatId={setSelectedCatId} />)
          }
        </ul>
      </div>

      <div className={s.dropdownFooter}>
        <div className={s.footerLeft}>
          Если категории вашего товара не существует, отправьте заявку
        </div>
        <Button onClick={submitCategory} className={s.btn} type="button">Добавить категорию</Button>
      </div>
    </div>
  );
};

export default CategoryDropdown;