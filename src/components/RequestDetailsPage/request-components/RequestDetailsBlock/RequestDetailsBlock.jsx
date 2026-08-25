import s from './RequestDetailsBlock.module.scss';
import {formatDatShortMonth} from "@/utils/oneRequest.js";

const RequestDetailsBlock = ({request, forResponse=false}) => {

  let categories
  if (forResponse) {
    categories = request.categoryNames.join(", ")
  } else {
    categories = request.categories.join(", ")
  }

  const showExpireDate = request.status.code !== 'completed' && request.status.code !== 'cancelled' && request.status.code !== 'draft'

  return (
    <div className={s.requestDetailsBlock}>
      <h3 className={s.title}>Детали</h3>

      <div className={s.rows}>
        <div className={s.row}>
          <div className={s.label}>Категория</div>
          <div className={s.value}>{categories || "-"}</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Регион</div>
          <div className={s.value}>{request.regionName}</div>
        </div>
        {
          showExpireDate && request.expireAt && !forResponse && (
            <div className={s.row}>
              <div className={s.label}>Истекает</div>
              <div className={s.value}>{formatDatShortMonth(request.expireAt)}</div>
            </div>
          )
        }

        {
          forResponse && (
            <div className={s.row}>
              <div className={s.label}>Отклик оставлен</div>
              <div className={s.value}>{formatDatShortMonth(request.createdAt)}</div>
            </div>
          )
        }
      </div>
    </div>
  )
}

export default RequestDetailsBlock;