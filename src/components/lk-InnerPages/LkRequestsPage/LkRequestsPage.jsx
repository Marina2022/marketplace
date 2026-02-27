import s from './LkRequestsPage.module.scss';
import {useOutletContext} from "react-router-dom";
import {useEffect} from "react";
import {getRequestsTab} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import LeftSideMenuRequests
  from "@/components/lk-InnerPages/LkRequestsPage/LeftSideMenuRequests/LeftSideMenuRequests.jsx";
import ManageRequests from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/ManageRequests.jsx";

const LkRequestsPage = () => {
  const {rightBarRef, rightPanelOpen} = useOutletContext();
  const tab = useSelector(getRequestsTab)

  useEffect(() => {
    if (!rightBarRef.current) return
  }, [rightBarRef]);

  const {requestDetails, setRequestDetails} =  useOutletContext()

  return (
    <>
      {
        requestDetails && rightBarRef.current && <div
          className={s.rightBarAdditionalItem}
          style={{top: rightBarRef.current.getBoundingClientRect().bottom}}
        >
          Заявка #{requestDetails.requestNumber}
        </div>
      }

      <div className={s.requestsPage}>

        <LeftSideMenuRequests  />

        <div className={`${s.contentWrapper} ${rightPanelOpen || requestDetails ? s.contentWrapperRightPanelOpen : ''}`}>
          <div className={s.content}>

            {
              tab === 1 && <ManageRequests setRequestDetails={setRequestDetails} requestDetails={requestDetails} />
            }

            {
              tab === 2 && <div>Предложения по заявкам</div>
            }

            {
              tab === 3 && <div>Заявки в работе</div>
            }

            {
              tab === 4 && <div>История заявок</div>
            }

            {
              tab === 5 && <div>Предложения</div>
            }

            {
              tab === 6 && <div>Предложения в работе</div>
            }

            {
              tab === 7 && <div>История</div>
            }

          </div>
        </div>
      </div>
    </>
  )
}

export default LkRequestsPage;