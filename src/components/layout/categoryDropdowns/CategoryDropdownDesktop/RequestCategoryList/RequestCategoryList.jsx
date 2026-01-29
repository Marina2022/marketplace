import s from './RequestCategoryList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'

const RequestCategoryList = ({requestsForDropdown, currentRequestCat, setCurrentRequestCat, requestsForDropdownLoading}) => {
  if (requestsForDropdownLoading) return <Spinner />

  return (
    <ul>
      {
        requestsForDropdown.map(cat => <li
          key={cat.categoryId}
          onClick={()=>setCurrentRequestCat(cat)}
          className={`${s.catItem} ${currentRequestCat?.categoryId === cat.categoryId ? s.activeItem : ''}`}

        >
          <img src={fallbackPhoto} alt="photo"/>
          <span>{cat.categoryName}</span>
        </li>)
      }
    </ul>
  );
};

export default RequestCategoryList;