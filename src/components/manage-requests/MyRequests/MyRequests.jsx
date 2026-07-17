import s from './MyRequests.module.scss';
import {useState} from "react";
import {getRequestsTab} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import ManageRequests from "@/components/manage-requests/MyRequests/ManageRequests/ManageRequests.jsx";

const MyRequests = () => {
  // const {rightBarRef, rightPanelOpen} = useOutletContext();
  const tab = useSelector(getRequestsTab)

  // useEffect(() => {
  //   if (!rightBarRef.current) return
  // }, [rightBarRef]);

  // const {requestDetails, setRequestDetails} =  useOutletContext()

  const {requestDetails, setRequestDetails} = useState(null)

  return (
    <>
      {/*{*/}
      {/*  requestDetails && rightBarRef.current && <div*/}
      {/*    className={s.rightBarAdditionalItem}*/}
      {/*    style={{top: rightBarRef.current.getBoundingClientRect().bottom}}*/}
      {/*  >*/}
      {/*    Заявка #{requestDetails.requestNumber}*/}
      {/*  </div>*/}
      {/*}*/}

      <div className={s.requestsPage}>

        {/*<LeftSideMenuRequests  />*/}

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