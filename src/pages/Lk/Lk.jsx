import {NavLink, Outlet} from "react-router-dom";
import s from './Lk.module.scss'

const Lk = () => {

  return (

    <div className={s.lk}>

      <div className={s.sideBar}></div>
      <div className={s.content}>
        <Outlet/>
      </div>
    </div>

  )
}

export default Lk;

