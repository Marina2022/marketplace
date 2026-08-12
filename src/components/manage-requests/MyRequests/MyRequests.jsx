import s from './MyRequests.module.scss';
import {useState} from "react";
import ManageRequests from "@/components/manage-requests/MyRequests/ManageRequests/ManageRequests.jsx";

const MyRequests = () => {

  const {requestDetails, setRequestDetails} = useState(null)

  return (
    <>
      <div className={s.requestsPage}>
        <div className={s.contentWrapper}>
          <div className={s.content}>
            <ManageRequests setRequestDetails={setRequestDetails} requestDetails={requestDetails}/>
          </div>
        </div>
      </div>
    </>
  )
}

export default MyRequests;