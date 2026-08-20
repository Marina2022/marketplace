import s from './RequestIndicators.module.scss';
import {getWordByCount} from "@/utils/oneRequest.js";

const RequestIndicators = ({request}) => {
  return (
    <ul className={s.requestIndicators}>
      <li className={s.indicator}>
        <div className={s.number}>{request.totalChats}</div>
        <div className={s.label}>{getWordByCount(request.totalChats, "Отклик")}</div>
      </li>

      <li className={s.indicator}>
        <div className={s.number}>{request.viewedCount}</div>
        <div className={s.label}>{getWordByCount(request.viewedCount, "Просмотр")}</div>
      </li>

      <li className={s.indicator}>
        <div className={s.number}>{request.newChats}</div>
        <div className={s.label}>{getWordByCount(request.newChats, "Новый")}</div>
      </li>
    </ul>
  )
}

export default RequestIndicators;