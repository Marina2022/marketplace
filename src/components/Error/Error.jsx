import s from './Error.module.scss';
import {Link} from "react-router-dom";
const Error = ({children}) => {
  return (
      <div className='container'>
        <h1 className={s.title}>{children}</h1>               
        <Link className={s.link} to="/">Вернуться на главную</Link>        
      </div>
  );
};

export default Error;