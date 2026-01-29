import s from './ProductCategoryList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'

const ProductCategoryList = ({categoriesForDropdown, setCurrentProductCat, categoriesForDropdownLoading, currentProductCat}) => {

  if (categoriesForDropdownLoading) return <Spinner />


  return (
    <ul>
      {
        categoriesForDropdown.map(cat => <li
          key={cat.categoryId}
          onClick={()=>setCurrentProductCat(cat)}
          className={`${s.catItem} ${currentProductCat?.categoryId === cat.categoryId ? s.activeItem : ''}`}

        >
          <img src={fallbackPhoto} alt="photo"/>
          <span>{cat.categoryName}</span>
        </li>)
      }
    </ul>
  );
};

export default ProductCategoryList;