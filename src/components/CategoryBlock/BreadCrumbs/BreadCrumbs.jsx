import s from './BreadCrumbs.module.scss'
import {Link} from "react-router-dom";

const BreadCrumbs = ({path, productBreadCrumbs = false, className, loading}) => {
  const newPath = [...path].reverse()

  
  return (
    <ul className={`${s.breadcrumbs} ${className}`}>
      {
        newPath.map((item, i) => {

          return (
            <li key={i} className={s.item}>

              {
                i < newPath.length - 1 && (
                  <Link className={s.link} to={`/category/${item.handle}`}>{item.name}</Link>
                )
              }


              {/*последний элемент - не ссылка*/}
              {
                i === newPath.length - 1 && !productBreadCrumbs && item.name
              }

              {/* Но если мы на странице товара, то последний элемент - ссылка на каталог с фильтром по текущему брэнду */}
      
              {
                i === newPath.length - 1 && productBreadCrumbs &&
                <Link className={s.link} to={`/category/${item.handle}`}>{item.name}</Link>
              }
            </li>
          )
        })
      }

    </ul>
  );
};


export default BreadCrumbs;
