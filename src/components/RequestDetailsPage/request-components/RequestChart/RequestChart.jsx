import s from './RequestChart.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Chart from "@/components/RequestDetailsPage/request-components/RequestChart/Chart/Chart.jsx";
import {getStartDate} from "@/utils/oneRequest.js";

const RequestChart = ({request}) => {

  const mockData = [
    {date: "2026-08-04T00:00:00Z", count: 3},
    {date: "2026-08-05T00:00:00Z", count: 1},
    {date: "2026-08-06T00:00:00Z", count: 2},
    {date: "2026-08-07T00:00:00Z", count: 8},
    {date: "2026-08-08T00:00:00Z", count: 4},
    {date: "2026-08-09T00:00:00Z", count: 5},
    {date: "2026-08-10T00:00:00Z", count: 2},
    {date: "2026-08-11T00:00:00Z", count: 7},
    {date: "2026-08-12T00:00:00Z", count: 4},
    {date: "2026-08-13T00:00:00Z", count: 9},
    {date: "2026-08-14T00:00:00Z", count: 10},
    {date: "2026-08-15T00:00:00Z", count: 1},
    {date: "2026-08-16T00:00:00Z", count: 2},
    {date: "2026-08-17T00:00:00Z", count: 6},
  ]

  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  let total
    if (data) total = data.reduce((sum, item) => sum + item.count, 0)

  useEffect(() => {
    const getData = async () => {
      setLoading(true)
      try {
        const result = await axiosInstance(`/requests/${request.requestId}/views/stats?days=14`)
        setData(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }

    getData()

  }, [request])

  let isEmpty
  if (data) isEmpty = data.every(item => item.count === 0)

  return (
    <div className={s.requestChart}>
      <div className={s.header}>
        <h3 className={s.title}>Просмотры за 14 дней</h3>
        {
          total > 0 && <div className={s.headerTotal}>{total} всего</div>
        }
      </div>

      {
        !loading && isEmpty && (
          <div className={s.empty}>
            <div className={s.emptyText}>
              Нет данных за период
            </div>
            <div className={s.emptyPeriod}>
              <div>{getStartDate()}</div>
              <div>сегодня</div>
            </div>
          </div>
        )
      }

      <div className={!isEmpty ? s.chartContainer : ''}>
      {
        !loading && !isEmpty && (
          <Chart data={data}/>
        )
      }
      </div>

    </div>
  )
}

export default RequestChart;