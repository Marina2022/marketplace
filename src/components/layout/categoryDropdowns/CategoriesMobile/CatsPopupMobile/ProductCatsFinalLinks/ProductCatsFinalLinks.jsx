import s from './ProductCatsFinalLinks.module.scss';
import fallbackPhoto from "@/assets/img/fallbackFoto.png";
import {Link} from "react-router-dom";

const ProductCatsFinalLinks = ({finalLinks, currentProductSubCat, setCurrentProductSubCat}) => {

  if (!finalLinks) return null

  const onTitleClick = () => {
    setCurrentProductSubCat(null)
  }

  return (
    <div>
      {
        <h3 className={s.title} onClick={onTitleClick}>
          <svg width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.91406 7.70703L1.41406 4.20703L4.91406 0.707031" stroke="#C0C0C0" strokeWidth="2"/>
          </svg>

          <span>{currentProductSubCat.subCategoryName}</span>
        </h3>
      }
      <ul>
        {
          finalLinks.map((cat, i) => <li
            key={i}
          >
            <Link className={s.catItem} to={`category/${cat.productCategoryHandle}`} >
            <img src={fallbackPhoto} alt="photo"/>
            <span className={s.categoryName}>{cat.productCategoryName}</span>
            </Link>
          </li>)
        }
      </ul>

    </div>
  );
};

export default ProductCatsFinalLinks;