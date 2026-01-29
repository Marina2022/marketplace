import s from './SubCatBlock.module.scss';
import {useState} from "react";
import {Link} from "react-router-dom";

const SubCatBlock = ({subCat}) => {

  const [subCatsToShow, setSubCatsToShow] = useState(subCat.productCategories.slice(0, 6))

  const handleShowMoreClick = () => {
    setSubCatsToShow(subCat.productCategories)
  }

  return (
    <li className={s.subCatItem}>
      <h3 className={s.subCatTitle}>{subCat.subCategoryName}</h3>

      <ul className={s.subSubCats}>
        {
          subCatsToShow.map(subCat => <Link
            to={`category/${subCat.productCategoryHandle}`}
            key={subCat.productCategoryId} className={s.subCatItem}>
            {subCat.productCategoryName}
          </Link>)
        }
      </ul>

      {
        subCat.productCategories.length > subCatsToShow.length && (
          <div className={s.showMore} onClick={handleShowMoreClick}>
            <span>Еще</span>
            <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9.3457 0.384766L4.5457 4.38477L0.345703 0.384766" stroke="#0093FD"/>
            </svg>
          </div>
        )
      }
    </li>
  )
}

export default SubCatBlock;