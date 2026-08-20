import s from './Chart.module.scss';
import {formatDateLongMonth, getStartDate, getWordByCount} from "@/utils/oneRequest.js";

const Chart = ({data}) => {
  const maxCount = Math.max(...data.map(item => item.count))

  return (
    <>
      <div className={s.chart}>
        {
          data.map((item, index) => {
            return (
              <div
                key={index}
                className={s.bar}
                style={{height: `${item.count / maxCount * 100}%`}}
              >
                <div className={s.tooltip}>
                  <div className={s.tooltipDate}>{formatDateLongMonth(item.date)}</div>
                  <div
                    className={s.tooltipText}>{item.count} {getWordByCount(item.count, "Просмотр").toLowerCase()}</div>
                </div>
              </div>
            )
          })
        }
      </div>
      <div className={s.subText}>
        <div>{getStartDate()}</div>
        <div>сегодня</div>
      </div>
    </>
  )
}

export default Chart;