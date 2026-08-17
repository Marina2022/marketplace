import s from './RequestStats.module.scss';

const RequestStats = ({request}) => {

  let responseToViewRate = 0
  if (request.viewedCount === 0) responseToViewRate = "-"
  if (request.viewedCount !== 0) responseToViewRate = Math.round((request.totalChats / request.viewedCount) * 100 * 10) / 10 + "%"


  return (
    <div className={s.requestStats}>
      <h3 className={s.title}>Статистика</h3>

      <div className={s.rows}>
        <div className={s.row}>
          <div className={s.label}>Просмотры всего</div>
          <div className={s.value}>{request.viewedCount}</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Добавили в изб.</div>
          <div className={s.value}>{request.favouritesCount}</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Откликнулось</div>
          <div className={s.value}>{request.totalChats}</div>
        </div>

        <div className={s.row}>
          <div className={s.label}>Отклик / просмотры</div>
          <div className={s.value}>{responseToViewRate}</div>
        </div>
      </div>
    </div>
  )
}

export default RequestStats;