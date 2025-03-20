import s from './CategoryDropdown.module.scss';
import MainCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/EditCategory/MainCategory.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import {useState} from "react";
import SearchCats
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/CategoryDropdown/SearchCats/SearchCats.jsx";
import {findProductCategoryName} from "@/utils/lkShop.js";


const CategoryDropdown = ({cats, setValue, getValues, setEditing, clearErrors, searchCats, setSearchCats, setSelectedCatName, catsLoading}) => {

  const [selectedCatId, setSelectedCatId] = useState(getValues("productCategoryId"))

  const submitCategory = () => {

    console.log('selectedCatId', selectedCatId)
    if (!selectedCatId) return
    setValue('productCategoryId', selectedCatId)        
    setEditing(false)
    clearErrors("productCategoryId");
    setSelectedCatName(findProductCategoryName(cats, selectedCatId))
  }
  
  //if (catsLoading && searchCats==='') return null

  return (
    <div className={s.catsDropdown}>      
      <SearchCats
        searchCats={searchCats}
        setSearchCats={setSearchCats}
      />

      <div className={`${s.content} lk-scroll`}>
        <ul>
          {
            cats.map((cat) => <MainCategory
              key={cat.categoryId}
              cat={cat}
              searchCats={searchCats}
              selectedCatId={selectedCatId}
              setSelectedCatId={setSelectedCatId}              
            />)
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