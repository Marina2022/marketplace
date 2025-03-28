import s from './Requirements.module.scss';
import {useState} from "react";

const Requirements = () => {

  const [open, setOpen] = useState(false)

  return (
    <div className={s.wrapper}>
      <div className={`${s.reqTitle} ${open ? s.reqTitleOpened : ''}`} onClick={() => setOpen(prev => !prev)}>
        <span>  Требования к загружаемым фотографиям</span>
        <svg className={`${s.dropIcon} ${open ? s.dropIconOpened : ''}`} width="18" height="9" viewBox="0 0 18 9"
             fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <path
            d="M9.00344 8.79989C8.30344 8.79989 7.60344 8.52989 7.07344 7.99989L0.553438 1.47989C0.263438 1.18989 0.263438 0.709893 0.553438 0.419893C0.843437 0.129893 1.32344 0.129893 1.61344 0.419893L8.13344 6.93989C8.61344 7.41989 9.39344 7.41989 9.87344 6.93989L16.3934 0.419893C16.6834 0.129893 17.1634 0.129893 17.4534 0.419893C17.7434 0.709893 17.7434 1.18989 17.4534 1.47989L10.9334 7.99989C10.4034 8.52989 9.70344 8.79989 9.00344 8.79989Z"
            fill="#658092"/>
        </svg>
      </div>
      {
        open && <ul className={s.requirementsList}>
          <li>Формат: jpeg, jpg, png, webp</li>
          <li>Размер: до10 МБ</li>
          <li>Разрешение: минимум 1000×1000 px</li>
          <li>Фон: белый или нейтральный (без лишних элементов)</li>
          <li>Формат кадра: квадратный (1:1) или пропорции, рекомендуемые платформой</li>
        </ul>
      }
    </div>
  );
};

export default Requirements;