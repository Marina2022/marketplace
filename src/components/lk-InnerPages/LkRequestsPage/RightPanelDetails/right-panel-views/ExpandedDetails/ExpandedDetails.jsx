import s from './ExpandedDetails.module.scss';
import {statusColors} from "@/consts/lk-consts.js";
import collapseButton from "@/assets/img/lk/lk-requests/collapseButton.svg";
import {formatDate} from "@/utils/lkRequests.js";
import placeholder from "@/assets/img/lk/lk-requests/placeholder.png";
import FilesBlockExpanded
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/FilesBlockExpanded/FilesBlockExpanded.jsx";
import RequestCardTags
  from "@/components/lk-InnerPages/LkRequestsPage/1_ManageRequests/RequestCard/RequestCardTags/RequestCardTags.jsx";


const ExpandedDetails = ({request, setExpanded, setShowTooltip, showTooltip, requestDetails}) => {
  return (
    <div className={s.detailsWrapper}>
      <div className={s.header}>
        <div className={s.headerLeftPart}>
          <div className={s.topLeftHeaderBlock}>
            <div className={s.heading}>Заявка №{request.requestNumber}</div>
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
        </div>

        <div className={s.responses}>
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
        <div className={s.hideBtnWrapper}>
          <button className={s.hideBtn}
                  onClick={() => setExpanded(false)}
                  onMouseEnter={() => setShowTooltip(true)}
                  onMouseLeave={() => setShowTooltip(false)}
          >

            <img src={collapseButton} alt="btn"/>

            {
              showTooltip && <div className={s.tooltip}>Свернуть</div>
            }
          </button>
        </div>
        <button className={s.menuBtn}>
          <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
              fill="#AAB7BF"/>
            <path
              d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
              fill="#AAB7BF"/>
            <path
              d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
              fill="#AAB7BF"/>
            <path
              d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z"
              stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z"
              stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z"
              stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>


      <div className={s.responsesTablet}>
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

      <h3 className={s.title}>{request.title}</h3>
      <RequestCardTags tags={request.tags} showAll={true}/>

      <div className={s.descWrapper}>
        <img className={s.img} src={request.picture ? request.picture.url : placeholder} alt="image"/>
        <p>
          {request.description}
        </p>
      </div>

      <div className={s.filesBlock}>
        <FilesBlockExpanded files={request.attachments}/>
      </div>

    </div>
  );
};

export default ExpandedDetails;