import s from './MainPartOrderDetails.module.scss';
import {Link} from "react-router-dom";

const MainPartOrderDetails = ({order}) => {
  console.log(order)

  return (
    <div className={s.mainPart}>

      <div className={s.headerPart}>
        <Link to='/lk/orders' className={s.link}>
          <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10L1 5.5L5 1" stroke="#658092"/>
          </svg>
          <span className={s.linkText}>Назад к истории заказов</span>
        </Link>

        <h1 className={s.headline}>Заказ №{order.orderNumber}</h1>
      </div>


      mainPart
    </div>
  );
};

export default MainPartOrderDetails;