import s from './SubCategory.module.scss';
import ProductCategory
  from "@/components/lk-InnerPages/ManageProduct/MainStep/EditProductCategory/ProductCategory/ProductCategory.jsx";
import {useEffect, useState} from "react";

const SubCategory = ({subCat, search, lastOne}) => {

  const [subCatOpen, setSubCatOpen] = useState(false)

  useEffect(() => {
    if (search === '') {
      setSubCatOpen(false)
    } else {
      setSubCatOpen(true)
    }
  }, [search]);

  const handleClick = () => {
    setSubCatOpen(prev => !prev)
  }

  return (

    <div className={s.subCategoryWrapper}>
      <div className={s.subCatHeader} onClick={handleClick}>
        <div className={s.horizontalLine}></div>

        {
          lastOne && <div className={s.verticalTickEraser}></div> 
        }
        
        <svg className={subCatOpen ? s.arrowBtnOpened : s.arrowBtn} width="16" height="8" viewBox="0 0 16 8"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7.99635 8.00003C7.41302 8.00003 6.82969 7.77503 6.38802 7.33337L0.954687 1.90003C0.713021 1.65837 0.713021 1.25837 0.954687 1.0167C1.19635 0.775033 1.59635 0.775033 1.83802 1.0167L7.27135 6.45003C7.67135 6.85003 8.32135 6.85003 8.72135 6.45003L14.1547 1.0167C14.3964 0.775033 14.7964 0.775033 15.038 1.0167C15.2797 1.25837 15.2797 1.65837 15.038 1.90003L9.60469 7.33337C9.16302 7.77503 8.57969 8.00003 7.99635 8.00003Z"
            fill="#658092"/>
        </svg>
        <p className={s.mainCatName}>{subCat.subCategoryName}+</p>
      </div>

      <div className={s.outerWrapper}>
        <div className={s.verticalLine}></div>

        {
          lastOne && <div className={s.verticalLineEraser}></div>
        }


        {
          subCatOpen && <ul>
            {
              subCat.productCategories.map(productCategory => <ProductCategory key={productCategory.productCategoryId}
                                                                               productCategory={productCategory}/>)
            }
          </ul>
        }

      </div>

    </div>
  );
};

export default SubCategory;