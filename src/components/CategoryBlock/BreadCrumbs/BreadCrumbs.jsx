import s from './BreadCrumbs.module.scss'
import {Link} from "react-router-dom";

const BreadCrumbs = ({path}) => {
  const newPath = [...path].reverse() 

  return (
      <ul className={s.breadcrumbs}>
        {
          newPath.map((item, i)=>{
            return (
                <li key={i} className={s.item}>
                  {
                    i === newPath.length-1 && item.name 
                  }

                  {
                      i < newPath.length-1 && (
                          <Link className={s.link} to={`/category/${item.handle}`}>{item.name}</Link>                          
                      ) 
                  }
                  
                </li>
            )
          })
        }

      </ul>
  );
};

export default BreadCrumbs;