import s from './EditProductCategory.module.scss';
import {forwardRef, useState} from "react";
import CategoryDropdown
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/CategoryDropdown/CategoryDropdown.jsx";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import CategoriesModalOnMobile
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/CategoriesModalOnMobile/CategoriesModalOnMobile.jsx";

const EditProductCategory = forwardRef(({
                                          getValues,
                                          selectedCatName,
                                          name,
                                          cats,
                                          setValue,
                                          clearErrors,
                                          searchCats,
                                          setSearchCats,
                                          catsLoading,
                                          setSelectedCatName,
                                          trigger,
                                          isError
                                        }, ref) => {

  const isMobile = useMobileScreen()
  const [editing, setEditing] = useState(false);
  const handleClick = () => {    
    setEditing(prev => {
      if (prev === true) trigger('productCategoryId')
      return !prev
    })
  }

  const handleBlur = (e) => {

    if (e.relatedTarget && e.currentTarget.contains(e.relatedTarget)) {
      return; 
    }
    trigger(name)
    setEditing(false)
  }
  
  if (!cats) return null

  return (

    <div className={s.wrapper} tabIndex={0} onBlur={handleBlur} >
      <div className={editing ? s.catInputBordered : isError ? s.catInputError : s.catInput} onClick={handleClick}>
        <span className={s.catName}>
          {
            getValues(name) && selectedCatName
          }
        </span>

        {
          !getValues(name) && <div className={s.empty}  >
            <span>Категория в магазине</span>
            <span className={s.requiredStar}>*</span>
          </div>
        }
      </div>

      {editing && !isMobile && <CategoryDropdown
        catsLoading={catsLoading}
        searchCats={searchCats}
        setSearchCats={setSearchCats}
        cats={cats}
        setValue={setValue}
        getValues={getValues}
        setEditing={setEditing} clearErrors={clearErrors}
        setSelectedCatName={setSelectedCatName}
      />}


      {editing && isMobile && <CategoriesModalOnMobile setEditing={setEditing} trigger={trigger} >
        <CategoryDropdown          
          catsLoading={catsLoading}
          searchCats={searchCats}
          setSearchCats={setSearchCats}
          cats={cats}
          setValue={setValue}
          getValues={getValues}
          setEditing={setEditing}
          clearErrors={clearErrors}
          setSelectedCatName={setSelectedCatName}
        />
      </CategoriesModalOnMobile>
      }
    </div>
  );
});

EditProductCategory.displayName = "EditProductCategory";

export default EditProductCategory;

