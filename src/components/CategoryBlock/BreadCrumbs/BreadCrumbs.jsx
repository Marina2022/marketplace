import s from './BreadCrumbs.module.scss'
import {Link} from "react-router-dom";

const BreadCrumbs = ({path}) => {

  path.reverse()
  console.log('path', path)

  return (
      <ul className={s.breadcrumbs}>
        {
          path.map((item, i)=>{
            return (
                <li key={i} className={s.item}>
                  {
                    i === path.length-1 && item.name 
                  }

                  {
                      i < path.length-1 && (
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