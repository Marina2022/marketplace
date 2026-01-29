import s from './RequestCatsList.module.scss';
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import fallbackPhoto from '@/assets/img/fallbackFoto.png'

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

          <svg className={s.arrow} width="7" height="13" viewBox="0 0 7 13" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6.44812 6.50133C6.44812 7.02633 6.24563 7.55133 5.84813 7.94883L0.958125 12.8388C0.740625 13.0563 0.380625 13.0563 0.163125 12.8388C-0.054375 12.6213 -0.054375 12.2613 0.163125 12.0438L5.05312 7.15383C5.41312 6.79383 5.41312 6.20883 5.05312 5.84883L0.163125 0.958829C-0.054375 0.741329 -0.054375 0.381328 0.163125 0.163828C0.380625 -0.0536721 0.740625 -0.0536721 0.958125 0.163828L5.84813 5.05383C6.24563 5.45133 6.44812 5.97633 6.44812 6.50133Z"
              fill="#658092"/>
          </svg>
        </li>)
      }
    </ul>
  );
};

export default RequestCatsList;