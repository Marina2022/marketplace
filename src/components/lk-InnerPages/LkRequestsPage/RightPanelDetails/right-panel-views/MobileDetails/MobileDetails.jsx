import s from './MobileDetails.module.scss';
import {statusColors} from "@/consts/lk-consts.js";
import {formatDate} from "@/utils/lkRequests.js";
import placeholder from "@/assets/img/lk/lk-requests/placeholder.png";
import RequestCardTags
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestCard/RequestCardTags/RequestCardTags.jsx";
import FilesBlockMobile
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/FilesBlockMobile/FilesBlockMobile.jsx";
import DropdownRequestActions
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/DropdownRequestActions/DropdownRequestActions.jsx";
import {useState} from "react";


const MobileDetails = ({request, requestDetails, setRequestDetails, resetRequests, resetRequest}) => {

  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = (e) => {
    setShowMenu(true)
    e.stopPropagation();
  }

  return (
    <div className={s.detailsWrapper}>
      <div className={s.topFixedBlock} onClick={() => setRequestDetails(null)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        <span>Заявка №{request.requestNumber}</span>
        <div className={s.menuBtnWrapper}>
          <button className={s.menuBtn} onClick={handleMenuClick}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                fill="#131D2A"/>
              <path
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                fill="#131D2A"/>
              <path
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                fill="#131D2A"/>
              <path
                d="M12 13C12.5523 13 13 12.5523 13 12C13 11.4477 12.5523 11 12 11C11.4477 11 11 11.4477 11 12C11 12.5523 11.4477 13 12 13Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M12 6C12.5523 6 13 5.55228 13 5C13 4.44772 12.5523 4 12 4C11.4477 4 11 4.44772 11 5C11 5.55228 11.4477 6 12 6Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path
                d="M12 20C12.5523 20 13 19.5523 13 19C13 18.4477 12.5523 18 12 18C11.4477 18 11 18.4477 11 19C11 19.5523 11.4477 20 12 20Z"
                stroke="#131D2A" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          {
            showMenu && (
              <DropdownRequestActions
                request={request}
                mobileFixed={true}
                onClose={() => setShowMenu(false)}
                requestDetails={requestDetails}
                resetRequests={resetRequests}
                resetRequest={resetRequest}
              />
            )
          }
        </div>
      </div>
      <div className={s.responsesAndStatus}>
        <div className={s.responsesMobile}>
          <span>Откликов получено: {requestDetails.responsesCount}</span>
          <button>
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" fill="white"/>
              <rect x="0.5" y="0.5" width="19" height="19" rx="1.5" stroke="#D1D5DB"/>
              <path
                d="M12.975 10C12.975 10.4846 12.7881 10.9691 12.4212 11.336L7.90778 15.8494C7.70703 16.0502 7.37475 16.0502 7.174 15.8494C6.97325 15.6487 6.97325 15.3164 7.174 15.1157L11.6874 10.6023C12.0197 10.27 12.0197 9.73003 11.6874 9.39775L7.174 4.88434C6.97325 4.68359 6.97325 4.35131 7.174 4.15056C7.37475 3.94981 7.70703 3.94981 7.90778 4.15056L12.4212 8.66397C12.7881 9.03086 12.975 9.51543 12.975 10Z"
                fill="black"/>
            </svg>
          </button>
        </div>
        <div
          className={s.requestStatus}
          style={{
            color: statusColors[request.status.theme].color,
            background: statusColors[request.status.theme].backgroundColor,
          }}
        >
          {request.status.label}
        </div>
      </div>
      <div className={s.dates}>
        <div className={s.activeTo}>Активна до: {formatDate(requestDetails.expiration)}</div>
        <div>Дата создания: {formatDate(requestDetails.createdAt)}</div>
      </div>
      <h3 className={s.title}>{request.title}</h3>
      <RequestCardTags tags={request.tags} showAll={true}/>
      <div className={s.descWrapper}>
        <img className={s.img} src={request.picture ? request.picture.url : placeholder} alt="image"/>
        <p>
          {request.description}
        </p>
      </div>
      <div className={s.filesBlock}>
        <FilesBlockMobile files={request.attachments}/>
      </div>
    </div>
  );
};

export default MobileDetails;