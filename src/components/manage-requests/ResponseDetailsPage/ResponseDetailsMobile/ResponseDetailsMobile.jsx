import s from './ResponseDetailsMobile.module.scss';
import {useLocation, useNavigate} from "react-router-dom";
import {useRef, useState} from "react";
import RequestHeader from "@/components/RequestDetailsPage/request-components/RequestHeader/RequestHeader.jsx";
import RequestDesc from "@/components/RequestDetailsPage/request-components/RequestDesc/RequestDesc.jsx";
import RequestTags from "@/components/RequestDetailsPage/request-components/RequestTags/RequestTags.jsx";
import RequestFiles from "@/components/RequestDetailsPage/request-components/RequestFiles/RequestFiles.jsx";
import RequestHistory from "@/components/RequestDetailsPage/request-components/RequestHistory/RequestHistory.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import ResponseButtonsAndStatus
  from "@/components/manage-requests/ResponseDetailsPage/response-components/ResponseButtonsAndStatus/ResponseButtonsAndStatus.jsx";
import DropdownResponse
  from "@/components/manage-requests/ResponseDetailsPage/ResponseDetailsMobile/DropdownResponse/DropdownResponse.jsx";

const ResponseDetailsMobile = ({request, loading, setViewed}) => {

  const location = useLocation()
  const navigate = useNavigate()

  // handleClickBack - кнопка Назад в хедере
  const handleClickBack = () => {
    if (location.state?.fromApp) {
      navigate(-1, {
        state: {fromApp: true}
      });
    } else {
      navigate('/manage-requests/my-responses');
    }
  }

  const tabs = [
    {
      name: "description",
      label: "Описание"
    },
    {
      name: "History",
      label: "История"
    }
  ]

  const [currentTab, setCurrentTab] = useState(tabs[0])
  const [showMenu, setShowMenu] = useState(false)

  const menuBtnRef = useRef(null);

  const handleMenuClick = (e) => {
    e.stopPropagation();
    setShowMenu(prev => !prev)
  }

  const onClose = () => {
    setShowMenu(false)
  }

  return (
    <div className={s.mobilePageWrapper}>
      <div className={s.mobileHeader}>
        <button onClick={handleClickBack}>
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="36" height="36" rx="4" fill="#F7F8FB"/>
            <path d="M21 24L15 18L21 12" stroke="#131D2A" strokeWidth="2" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </button>
        <div className={s.text}>
          <span>Отклик на заявку</span>
          {
            <div className={s.subtitle}> {!loading && <span>#{request.requestNumber}</span>}</div>
          }
        </div>

        <div className={s.btnWrapper}>
          <button ref={menuBtnRef} className={s.menuButton} onClick={handleMenuClick}>
            <svg width="5" height="22" viewBox="0 0 5 22" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2.5 12.25C3.32843 12.25 4 11.6904 4 11C4 10.3096 3.32843 9.75 2.5 9.75C1.67157 9.75 1 10.3096 1 11C1 11.6904 1.67157 12.25 2.5 12.25Z"
                fill="#131D2A"/>
              <path
                d="M2.5 3.5C3.32843 3.5 4 2.94036 4 2.25C4 1.55964 3.32843 1 2.5 1C1.67157 1 1 1.55964 1 2.25C1 2.94036 1.67157 3.5 2.5 3.5Z"
                fill="#131D2A"/>
              <path
                d="M2.5 21C3.32843 21 4 20.4404 4 19.75C4 19.0596 3.32843 18.5 2.5 18.5C1.67157 18.5 1 19.0596 1 19.75C1 20.4404 1.67157 21 2.5 21Z"
                fill="#131D2A"/>
              <path
                d="M2.5 12.25C3.32843 12.25 4 11.6904 4 11C4 10.3096 3.32843 9.75 2.5 9.75C1.67157 9.75 1 10.3096 1 11C1 11.6904 1.67157 12.25 2.5 12.25Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M2.5 3.5C3.32843 3.5 4 2.94036 4 2.25C4 1.55964 3.32843 1 2.5 1C1.67157 1 1 1.55964 1 2.25C1 2.94036 1.67157 3.5 2.5 3.5Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M2.5 21C3.32843 21 4 20.4404 4 19.75C4 19.0596 3.32843 18.5 2.5 18.5C1.67157 18.5 1 19.0596 1 19.75C1 20.4404 1.67157 21 2.5 21Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {
            showMenu && (
              <DropdownResponse
                inMobileHeader={true}
                menuBtnRef={menuBtnRef}
                request={request}
                onClose={onClose}
              />
            )
          }
        </div>
      </div>
      {
        request && request.hasChanges && (
          <div className={s.notification}>
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M7 0C5.61553 0 4.26216 0.410543 3.11101 1.17971C1.95987 1.94888 1.06266 3.04213 0.532846 4.32122C0.00303299 5.6003 -0.13559 7.00776 0.134506 8.36563C0.404603 9.7235 1.07129 10.9708 2.05026 11.9497C3.02922 12.9287 4.2765 13.5954 5.63437 13.8655C6.99224 14.1356 8.3997 13.997 9.67879 13.4672C10.9579 12.9373 12.0511 12.0401 12.8203 10.889C13.5895 9.73785 14 8.38447 14 7C13.998 5.14409 13.2599 3.36475 11.9476 2.05242C10.6353 0.740087 8.85592 0.00195988 7 0ZM7 12.9231C5.82853 12.9231 4.68336 12.5757 3.70932 11.9249C2.73527 11.274 1.9761 10.349 1.52779 9.26666C1.07949 8.18436 0.962193 6.99343 1.19074 5.84446C1.41928 4.6955 1.9834 3.64011 2.81175 2.81175C3.64011 1.98339 4.6955 1.41928 5.84447 1.19073C6.99343 0.96219 8.18436 1.07949 9.26667 1.52779C10.349 1.97609 11.274 2.73527 11.9249 3.70931C12.5757 4.68336 12.9231 5.82853 12.9231 7C12.9213 8.57035 12.2967 10.0759 11.1863 11.1863C10.0759 12.2967 8.57035 12.9213 7 12.9231ZM6.46154 7.53846V3.76923C6.46154 3.62642 6.51827 3.48946 6.61925 3.38848C6.72023 3.2875 6.85719 3.23077 7 3.23077C7.14281 3.23077 7.27977 3.2875 7.38075 3.38848C7.48173 3.48946 7.53846 3.62642 7.53846 3.76923V7.53846C7.53846 7.68127 7.48173 7.81823 7.38075 7.91921C7.27977 8.02019 7.14281 8.07692 7 8.07692C6.85719 8.07692 6.72023 8.02019 6.61925 7.91921C6.51827 7.81823 6.46154 7.68127 6.46154 7.53846ZM7.80769 9.96154C7.80769 10.1213 7.76032 10.2774 7.67157 10.4103C7.58282 10.5431 7.45668 10.6466 7.30909 10.7077C7.16151 10.7689 6.99911 10.7849 6.84243 10.7537C6.68575 10.7225 6.54183 10.6456 6.42888 10.5327C6.31592 10.4197 6.23899 10.2758 6.20783 10.1191C6.17666 9.96243 6.19266 9.80003 6.25379 9.65245C6.31492 9.50486 6.41845 9.37872 6.55127 9.28997C6.6841 9.20121 6.84026 9.15384 7 9.15384C7.21422 9.15384 7.41965 9.23894 7.57113 9.39041C7.7226 9.54188 7.80769 9.74732 7.80769 9.96154Z" fill="#D97706"/>
            </svg>
            <span>Заказчик внёс изменения в заявку. Проверьте актуальность условий перед ответом.</span>
            <button onClick={setViewed} className={s.closeNotification}><svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M0.184662 0.182526C0.42874 -0.0615522 0.824468 -0.061552 1.06855 0.182526L3.71951 2.83349L6.37047 0.182526C6.61448 -0.0611776 7.01034 -0.0611911 7.25435 0.182526C7.49833 0.426508 7.49814 0.822308 7.25435 1.06641L4.60339 3.71737L7.25573 6.36971C7.49981 6.61379 7.49981 7.00952 7.25573 7.25359C7.01164 7.49751 6.61587 7.49762 6.37185 7.25359L3.71951 4.60125L1.06716 7.25359C0.823087 7.49767 0.427359 7.49767 0.183281 7.25359C-0.060531 7.00949 -0.0607082 6.6137 0.183281 6.36971L2.83562 3.71737L0.184662 1.06641C-0.0593632 0.822384 -0.0592582 0.426616 0.184662 0.182526Z" fill="#3E5067"/>
            </svg>
            </button>
          </div>
        )
      }

      {
        loading && <div className={s.underHeaderContentWrapper}>
          <Spinner/>
        </div>
      }

      {
        !loading && (
          <div className={s.underHeaderContentWrapper}>
            <ul className={s.tabs}>
              {
                tabs.map((itemTab, i) => <li
                  onClick={() => setCurrentTab(itemTab)}
                  key={i}
                  className={`${s.tab} ${itemTab.name === currentTab.name ? s.tabActive : ''}`}
                >
                  {itemTab.label}
                </li>)
              }
            </ul>

            {
              currentTab.name === "description" && (
                <div className={s.descriptionWrapper}>
                  <RequestHeader request={request} forResponse={true}/>
                  <RequestDesc request={request}/>
                  <RequestTags request={request}/>
                  {
                    request.attachments && request.attachments.length > 0 && <RequestFiles request={request}/>
                  }
                </div>
              )
            }

            {
              currentTab.name === "History" && (
                <div>
                  <RequestHistory request={request}/>
                </div>
              )
            }
            <ResponseButtonsAndStatus request={request} />
          </div>
        )
      }
    </div>
  )
}

export default ResponseDetailsMobile;