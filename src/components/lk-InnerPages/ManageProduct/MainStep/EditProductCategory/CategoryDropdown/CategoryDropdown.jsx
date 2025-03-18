import s from './CategoryDropdown.module.scss';
import MainCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditCategory/MainCategory.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";

const CategoryDropdown = ({cats, search}) => {
  
  const [selectedCatId, setSelectedCatId] = useState(null)
  
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
        <Button className={s.btn} type="button">Добавить категорию</Button>
      </div>
    </div>
  );
};

export default CategoryDropdown;