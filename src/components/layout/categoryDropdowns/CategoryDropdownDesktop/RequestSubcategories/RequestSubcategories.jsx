import s from './RequestSubcategories.module.scss';
import {Link} from "react-router-dom";

const RequestSubcategories = ({currentRequestCat}) => {
  if (!currentRequestCat) return null

  return (
    <div className={s.subCatWrapper}>
      <h2 className={s.title}>{currentRequestCat.categoryName}</h2>
      <ul className={s.subCatList}>
        {
          currentRequestCat.subCategories.map(subCat => <Link
            to={`category/${subCat.subCategoryHandle}`}
            className={s.requestItem}
            key={subCat.subCategoryId}>{subCat.subCategoryName}</Link>)
        }
      </ul>
    </div>
  );
};

export default RequestSubcategories;