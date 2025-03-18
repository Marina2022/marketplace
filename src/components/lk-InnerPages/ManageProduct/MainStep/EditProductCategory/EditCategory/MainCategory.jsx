import s from './MainCategory.module.scss';
import SubCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/SubCategory/SubCategory.jsx";
import {useEffect, useState} from "react";

const MainCategory = ({cat, search, selectedCatId, setSelectedCatId}) => {

  
  
  
  // будет зависеть от того, есть search или нет
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (search === '') {
      setOpen(false)
    } else {
      setOpen(true)
    }
  }, [search]);

  const handleClick = () => {
    setOpen(prev => !prev)
  }
  
  

  return (
    <div className={s.mainCategoryWrapper}>
      <div className={s.mainCatHeader} onClick={handleClick}>
        <svg className={open ? s.arrowBtnOpened : s.arrowBtn} width="16" height="8" viewBox="0 0 16 8" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.99635 8.00003C7.41302 8.00003 6.82969 7.77503 6.38802 7.33337L0.954687 1.90003C0.713021 1.65837 0.713021 1.25837 0.954687 1.0167C1.19635 0.775033 1.59635 0.775033 1.83802 1.0167L7.27135 6.45003C7.67135 6.85003 8.32135 6.85003 8.72135 6.45003L14.1547 1.0167C14.3964 0.775033 14.7964 0.775033 15.038 1.0167C15.2797 1.25837 15.2797 1.65837 15.038 1.90003L9.60469 7.33337C9.16302 7.77503 8.57969 8.00003 7.99635 8.00003Z"
            fill="#658092"/>
        </svg>
        <p className={s.mainCatName}>{cat.categoryName}</p>
      </div>
      <div className={s.outerWrapper}>
        <div className={s.verticalLine}></div>
        {
          open && <ul className={s.subCats}>
            {
              cat.subCategories.map((subCat, i) => <SubCategory 
                key={subCat.subCategoryId} 
                subCat={subCat} 
                search={search}
                lastOne={cat.subCategories.length-1 === i}
                selectedCatId={selectedCatId}
                setSelectedCatId={setSelectedCatId}    
              />)
            }
          </ul>
        }
        
      </div>
 

    </div>
  );
};

export default MainCategory;