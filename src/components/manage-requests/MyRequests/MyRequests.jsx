import s from './MyRequests.module.scss';
import {useState} from "react";
import ManageRequests from "@/components/manage-requests/MyRequests/ManageRequests/ManageRequests.jsx";
import RequestsHistory from "@/components/manage-requests/MyRequests/RequestsHistory/RequestsHistory.jsx";

const MyRequests = () => {

  const [showHistoryPage, setShowHistoryPage] = useState(false)

  if (showHistoryPage) {
    return (
      <>
        <div className={s.requestsPage}>
          <div className={s.contentWrapper}>
            <div className={s.content}>
              <RequestsHistory
                setShowHistoryPage={setShowHistoryPage}
              />
            </div>
          </div>
        </div>
      </>
    )
  }

  return (
    <>
      <div className={s.requestsPage}>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <ManageRequests
              setShowHistoryPage={setShowHistoryPage}
            />
          </div>
        </div>
      </div>
    </>
  )
}

export default MyRequests;