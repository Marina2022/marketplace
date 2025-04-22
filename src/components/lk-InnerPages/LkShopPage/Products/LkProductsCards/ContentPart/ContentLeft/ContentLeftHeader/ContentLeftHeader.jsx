import s from './ContentLeftHeader.module.scss';
import {useSearchParams} from "react-router-dom";

const ContentLeftHeader = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const handleArticleClick = () => {
    const sortColumn = searchParams.get('sortColumn')
    const sortOrder = searchParams.get('sortOrder')

    const newParams = new URLSearchParams(searchParams);

    if (sortColumn !== "article") {
      newParams.set("sortColumn", "article");
      newParams.set("sortOrder", "asc");
      setSearchParams(newParams);
    } else {
      newParams.set("sortColumn", "article");
      newParams.set("sortOrder", sortOrder === 'asc' ? 'desc' : 'asc');
      setSearchParams(newParams);
    }
  }

  return (
    <div className={s.leftHeader}>
      <div className={s.photoHeaderCell}>Фото</div>
      <div className={s.articleHeaderCell} onClick={handleArticleClick}>
        <span>Артикул</span>
        <svg
          className={`${searchParams.get('sortColumn') === 'article' ? s.sortIconActive : s.sortIcon}  ${searchParams.get('sortColumn') === 'article' && searchParams.get('sortOrder') === 'asc' ? s.sortIconAsc : ''}`}
          width="12" height="13" viewBox="0 0 12 13" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M6.0025 11.1251C5.9075 11.1251 5.8125 11.0901 5.7375 11.0151L2.7025 7.98006C2.5575 7.83506 2.5575 7.59506 2.7025 7.45006C2.8475 7.30506 3.0875 7.30506 3.2325 7.45006L6.0025 10.2201L8.7725 7.45006C8.9175 7.30506 9.1575 7.30506 9.3025 7.45006C9.4475 7.59506 9.4475 7.83506 9.3025 7.98006L6.2675 11.0151C6.1925 11.0901 6.0975 11.1251 6.0025 11.1251Z"
          />
          <path
            d="M6 11.04C5.795 11.04 5.625 10.87 5.625 10.665V2.25C5.625 2.045 5.795 1.875 6 1.875C6.205 1.875 6.375 2.045 6.375 2.25V10.665C6.375 10.87 6.205 11.04 6 11.04Z"
          />
        </svg>        
      </div>
    </div>
  )
}

export default ContentLeftHeader;