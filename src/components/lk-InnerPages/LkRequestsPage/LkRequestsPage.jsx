import s from './LkRequestsPage.module.scss';
import {useOutletContext} from "react-router-dom";
import {useEffect, useState} from "react";
import {getRequestsTab} from "@/store/requestsSlice.js";
import {useSelector} from "react-redux";
import LeftSideMenuRequests
  from "@/components/lk-InnerPages/LkRequestsPage/LeftSideMenuRequests/LeftSideMenuRequests.jsx";

const LkRequestsPage = () => {
  const {rightBarRef, rightPanelOpen} = useOutletContext();

  useEffect(() => {
    if (!rightBarRef.current) return
    console.log('rightBarRef = ', rightBarRef.current.getBoundingClientRect().bottom);
  }, [rightBarRef]);

  const [showRightBarItem, setShowRightBarItem] = useState(false);

  const handlePushClick = () => {
    setShowRightBarItem(prev => !prev)
  }

  const tab = useSelector(getRequestsTab)

  return (
    <>
      {
        showRightBarItem && rightBarRef.current && <div className={s.rightBarAdditionalItem} style={{top: rightBarRef.current.getBoundingClientRect().bottom}}>Y</div>
      }

      <div className={s.requestsPage}>
        <LeftSideMenuRequests />

        <div className={`${s.contentWrapper} ${rightPanelOpen ? s.contentWrapperRightPanelOpen : ''}`}>
          <div className={s.content}>

            {
              tab === 1 && <div>Управление заявками</div>
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