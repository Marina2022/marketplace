import s from './MyRequests.module.scss';
import {useState} from "react";
import ManageRequests from "@/components/manage-requests/MyRequests/ManageRequests/ManageRequests.jsx";

const MyRequests = () => {

  const [showHistoryPage, setShowHistoryPage] = useState(false)

  if (showHistoryPage) {
    return (
      <>
        <div className={s.requestsPage}>
          <div className={s.contentWrapper}>
            <div className={s.content}>
              <div onClick={() => setShowHistoryPage(false)}>
              <svg width="6" height="11" viewBox="0 0 6 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M0.000417483 5.05604C0.000417483 4.64771 0.157917 4.23938 0.467083 3.93021L4.27042 0.126875C4.43958 -0.0422917 4.71958 -0.0422917 4.88875 0.126875C5.05792 0.296042 5.05792 0.576042 4.88875 0.745208L1.08542 4.54854C0.805417 4.82854 0.805417 5.28354 1.08542 5.56354L4.88875 9.36688C5.05792 9.53604 5.05792 9.81604 4.88875 9.98521C4.71958 10.1544 4.43958 10.1544 4.27042 9.98521L0.467083 6.18188C0.157917 5.87271 0.000417483 5.46438 0.000417483 5.05604Z" fill="#658092"/>
              </svg>
              </div>
              <div>History page</div>
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
            <ManageRequests setShowHistoryPage={setShowHistoryPage}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyRequests;