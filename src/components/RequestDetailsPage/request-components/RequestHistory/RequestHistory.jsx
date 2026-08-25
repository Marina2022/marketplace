import s from './RequestHistory.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import HistoryItem from "@/components/RequestDetailsPage/request-components/RequestHistory/HistoryItem/HistoryItem.jsx";

const RequestHistory = ({request}) => {

  const [history, setHistory] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const getHistory = async () => {
      setLoading(true)
      try {
        const result = await axiosInstance(`/requests/${request.requestId}/change-log`)
        setHistory(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setLoading(false)
      }
    }
    getHistory()
  }, [request])


  return (
    <div className={s.requestHistory}>
      <h3 className={s.title}>История изменений</h3>
      {
        !loading && (
          <ul className={s.historyList}>
            {
              history.events.map((item, index) => <HistoryItem
                key={index}
                event={item}
                isLast={index === history.events.length - 1}
              />)
            }
          </ul>
        )
      }
    </div>
  )
}

export default RequestHistory;