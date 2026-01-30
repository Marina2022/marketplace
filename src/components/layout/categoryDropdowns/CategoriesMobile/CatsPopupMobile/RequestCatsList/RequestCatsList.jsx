import s from './RequestCatsList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'
import arrowRight from '@/assets/img/arrow-right-menu.svg'

const RequestCatsList = ({
                           requestsForDropdown,
                           currentRequestCat,
                           setCurrentRequestCat,
                           requestsForDropdownLoading
                         }) => {


  if (requestsForDropdownLoading) return <Spinner/>

  return (
    <ul>
      {
        requestsForDropdown.map(cat => <li
          key={cat.categoryId}
          onClick={() => setCurrentRequestCat(cat)}
          className={`${s.catItem} ${currentRequestCat?.categoryId === cat.categoryId ? s.activeItem : ''}`}
        >
          <img src={fallbackPhoto} alt="photo"/>
          <span className={s.categoryName}>{cat.categoryName}</span>

          <img src={arrowRight} alt="right" className={s.arrow}/>
        </li>)
      }
    </ul>
  );
};

export default RequestCatsList;