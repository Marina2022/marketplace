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
                                          setSelectedCatName
                                        }, ref) => {

  const isMobile = useMobileScreen()
  const [editing, setEditing] = useState(false);
  const handleClick = () => {
    setEditing(prev => !prev)
  }

  if (!cats) return null

  return (

    <div className={s.wrapper}>
      <div className={editing ? s.catInputBordered : s.catInput} onClick={handleClick}>
        {
          getValues(name) && selectedCatName
        }

        {
          !getValues(name) && <div className={s.empty}>
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


      {editing && isMobile && <CategoriesModalOnMobile setEditing={setEditing} >
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

