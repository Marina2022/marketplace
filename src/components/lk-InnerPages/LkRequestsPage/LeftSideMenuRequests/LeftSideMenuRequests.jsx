import s from "./LeftSideMenuRequests.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {getRequestsTab, setRequestsTab} from "@/store/requestsSlice.js";

const LeftSideMenuRequests = () => {

  const tab = useSelector(getRequestsTab)
  const dispatch = useDispatch()

  return (
    <div className={s.leftSideMenu}>
      <h4 className={s.title}>Заявки</h4>

      <div className={s.subtitle}>
        <span>Мои заявки</span>
        <div className={s.badge}>1</div>
      </div>

      <ul className={s.list}>
        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(1))}>
          <span className={tab === 1 ? s.activeItem : ''}>Управление заявками</span>
          <span className={s.count}>1</span>
        </li>

        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(2))}>
          <span className={tab === 2 ? s.activeItem : ''}>Предложения по заявкам</span>
          <span className={s.count}>1</span>
        </li>

        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(3))}>
          <span className={tab === 3 ? s.activeItem : ''}>Заявки в работе</span>
          <span className={s.count}>1</span>
        </li>

        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(4))}>
          <span className={tab === 4 ? s.activeItem : ''}>История заявок</span>
          <span className={s.count}>1</span>
        </li>
      </ul>


      <div className={s.subtitle}>
        <span >Исполнение заявок</span>
        <div className={s.badge}>1</div>
      </div>

      <ul className={s.list}>
        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(5))}>
          <span className={tab === 5 ? s.activeItem : ''}>Предложения</span>
          <span className={s.count}>1</span>
        </li>

        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(6))}>
          <span className={tab === 6 ? s.activeItem : ''}>Предложения в работе</span>
          <span className={s.count}>1</span>
        </li>

        <li className={s.menuLink} onClick={() => dispatch(setRequestsTab(7))}>
          <span className={tab === 7 ? s.activeItem : ''}>История</span>
          <span className={s.count}>1</span>
        </li>
      </ul>

    </div>
  );
};

export default LeftSideMenuRequests;
