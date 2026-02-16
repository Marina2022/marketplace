import s from './LkRequestsPage.module.scss';
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequestsTab} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import LeftSideMenuRequests
  from "@/components/lk-InnerPages/LkRequestsPage/LeftSideMenuRequests/LeftSideMenuRequests.jsx";
import ManageRequests from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/ManageRequests.jsx";
import RightPanelDetails from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/RightPanelDetails.jsx";

const LkRequestsPage = () => {
  const {rightBarRef, rightPanelOpen} = useOutletContext();
  const tab = useSelector(getRequestsTab)

  useEffect(() => {
    if (!rightBarRef.current) return
  }, [rightBarRef]);


  const {requestDetails, setRequestDetails} =  useOutletContext()

  const handleCardClick = (request) => {
    setRequestDetails(request)
    if (requestDetails) setRequestDetails(null)
  }

  return (
    <>
      {
        requestDetails && rightBarRef.current && <div className={s.rightBarAdditionalItem} style={{top: rightBarRef.current.getBoundingClientRect().bottom}}>
          {requestDetails?.name}

        </div>
      }

      <div className={s.requestsPage}>

        {
          requestDetails && <RightPanelDetails />
        }


        <LeftSideMenuRequests  />

        <div className={`${s.contentWrapper} ${rightPanelOpen || requestDetails ? s.contentWrapperRightPanelOpen : ''}`}>
          <div className={s.content}>

            {
              tab === 1 && <ManageRequests handleCardClick={handleCardClick} />
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