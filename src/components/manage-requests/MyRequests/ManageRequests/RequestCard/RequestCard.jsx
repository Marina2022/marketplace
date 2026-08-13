import s from './RequestCard.module.scss';
import {statusColors} from "@/consts/lk-consts.js";
import placeHolderImg from "@/assets/img/lk/lk-requests/placeholder.png";

import {formatDate} from "@/utils/requests.js";
import {useState} from "react";
import RequestCardTags
  from "@/components/manage-requests/MyRequests/ManageRequests/RequestCard/RequestCardTags/RequestCardTags.jsx";
import DropdownRequestActions
  from "@/components/manage-requests/MyRequests/ManageRequests/DropdownRequestActions/DropdownRequestActions.jsx";


const RequestCard = ({request, setRequestDetails, resetRequests, setRequestToEdit}) => {

  const [showTooltip, setShowTooltip] = useState(false)
  const [showMenu, setShowMenu] = useState(false)

  const handleMenuClick = (e) => {
    setShowMenu(true)
    e.stopPropagation();
  }

  return (
    <li
      className={s.requestCard}
      //onClick={() => setRequestDetails(request)}
    >

      <div className={s.pictureBlock}>
        <div className={s.cardHeader}>
          <div
            className={s.requestStatus}
            style={{
              color: statusColors[request.status.theme].color,
              background: statusColors[request.status.theme].backgroundColor,
              border: statusColors[request.status.theme].border
            }}
          >
            <svg width="6" height="6" viewBox="0 0 6 6" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect width="6" height="6" rx="3" fill="currentColor"/>
            </svg>
            <span>{request.status.label}</span>
          </div>
          <div className={s.requestNumber}>{request.requestNumber}</div>
        </div>

        <img className={s.img} src={request.picture ? request.picture : placeHolderImg} alt=""/>


      </div>

      <div className={s.cardContent}>
        <div className={s.title}>{request.title}</div>

        <div className={s.tagsWrapper}>
          <RequestCardTags tags={request.tags} extraTagCount={request.extraTagCount}/>
        </div>


        <div className={s.dateBlock}>
          <div className={s.date}>
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10.0269 2.32031H2.96975C2.35435 2.32031 1.85547 2.8192 1.85547 3.4346V10.0275C1.85547 10.6429 2.35435 11.1417 2.96975 11.1417H10.0269C10.6423 11.1417 11.1412 10.6429 11.1412 10.0275V3.4346C11.1412 2.8192 10.6423 2.32031 10.0269 2.32031Z"
                stroke="#8A8F98" strokeWidth="1.11429"/>
              <path d="M1.85547 5.10491H11.1412M4.1769 1.39062V3.24777M8.81975 1.39062V3.24777" stroke="#8A8F98"
                    strokeWidth="1.11429" strokeLinecap="round"/>
            </svg>
            <span>Дата создания: {formatDate(request.createdAt)}</span>
          </div>

          {
            request.expireAt && request.status.code !== "draft" && (
              <div className={s.date}>
                <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M10.0269 2.32031H2.96975C2.35435 2.32031 1.85547 2.8192 1.85547 3.4346V10.0275C1.85547 10.6429 2.35435 11.1417 2.96975 11.1417H10.0269C10.6423 11.1417 11.1412 10.6429 11.1412 10.0275V3.4346C11.1412 2.8192 10.6423 2.32031 10.0269 2.32031Z"
                    stroke="#8A8F98" strokeWidth="1.11429"/>
                  <path d="M1.85547 5.10491H11.1412M4.1769 1.39062V3.24777M8.81975 1.39062V3.24777" stroke="#8A8F98"
                        strokeWidth="1.11429" strokeLinecap="round"/>
                </svg>
                <span>Активная до: {formatDate(request.createdAt)}</span>
              </div>
            )
          }


        </div>

        <div className={s.bottomBlock}>
          <div className={s.activeTo}>
            <span>Активна до</span>
            <span>{formatDate(request.expiration)}</span>
          </div>
          <div>Отклики ({request.responsesCount})</div>
          <div className={s.responseBtnWrapper}>
            {/*<button className={s.bottomButton}*/}
            {/*        onMouseEnter={() => setShowTooltip(true)}*/}
            {/*        onMouseLeave={() => setShowTooltip(false)}*/}
            {/*>*/}
            {/*  <svg width="9" height="18" viewBox="0 0 9 18" fill="none" xmlns="http://www.w3.org/2000/svg">*/}
            {/*    <path*/}
            {/*      d="M8.5975 8.66844C8.5975 9.36844 8.3275 10.0684 7.7975 10.5984L1.2775 17.1184C0.987499 17.4084 0.5075 17.4084 0.2175 17.1184C-0.0725 16.8284 -0.0725 16.3484 0.2175 16.0584L6.7375 9.53844C7.2175 9.05844 7.2175 8.27844 6.7375 7.79844L0.2175 1.27844C-0.0725 0.988438 -0.0725 0.508438 0.2175 0.218437C0.5075 -0.0715637 0.987499 -0.0715637 1.2775 0.218437L7.7975 6.73844C8.3275 7.26844 8.5975 7.96844 8.5975 8.66844Z"*/}
            {/*      fill="black"/>*/}
            {/*  </svg>*/}
            {/*</button>*/}
            {/*{*/}
            {/*  showTooltip && <div className={s.tooltip}>Перейти&nbsp;к&nbsp;откликам</div>*/}
            {/*}*/}


            <div className={s.menuBtnWrapper}>
              <button className={s.menuButton} onClick={handleMenuClick}>
                <svg width="4" height="14" viewBox="0 0 4 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M3.05682 12.2573C3.05682 12.6792 2.90767 13.0414 2.60938 13.3439C2.30682 13.6422 1.9446 13.7914 1.52273 13.7914C1.10511 13.7914 0.747159 13.6422 0.448864 13.3439C0.150568 13.0414 0.00142026 12.6792 0.00142026 12.2573C0.00142026 11.8482 0.150568 11.4902 0.448864 11.1834C0.747159 10.8766 1.10511 10.7232 1.52273 10.7232C1.80398 10.7232 2.06179 10.7956 2.29616 10.9405C2.52628 11.0811 2.71165 11.2665 2.85227 11.4966C2.98864 11.7267 3.05682 11.9803 3.05682 12.2573ZM3.05682 6.89595C3.05682 7.31783 2.90767 7.68004 2.60938 7.9826C2.30682 8.28089 1.9446 8.43004 1.52273 8.43004C1.10511 8.43004 0.747159 8.28089 0.448864 7.9826C0.150568 7.68004 0.00142026 7.31783 0.00142026 6.89595C0.00142026 6.48686 0.150568 6.12891 0.448864 5.82209C0.747159 5.51527 1.10511 5.36186 1.52273 5.36186C1.80398 5.36186 2.06179 5.4343 2.29616 5.57919C2.52628 5.71982 2.71165 5.90518 2.85227 6.1353C2.98864 6.36541 3.05682 6.61896 3.05682 6.89595ZM3.05682 1.53462C3.05682 1.9565 2.90767 2.31871 2.60938 2.62127C2.30682 2.91957 1.9446 3.06871 1.52273 3.06871C1.10511 3.06871 0.747159 2.91957 0.448864 2.62127C0.150568 2.31871 0.00142026 1.9565 0.00142026 1.53462C0.00142026 1.12553 0.150568 0.767578 0.448864 0.46076C0.747159 0.153942 1.10511 0.000532597 1.52273 0.000532597C1.80398 0.000532597 2.06179 0.0729758 2.29616 0.217862C2.52628 0.358487 2.71165 0.543856 2.85227 0.77397C2.98864 1.00408 3.05682 1.25763 3.05682 1.53462Z"
                    fill="#676767"/>
                </svg>
              </button>
              {
                showMenu && (
                  <DropdownRequestActions
                    request={request}
                    onClose={() => setShowMenu(false)}
                    resetRequests={resetRequests}
                    setRequestToEdit={setRequestToEdit}/>
                )
              }
            </div>

          </div>
        </div>
      </div>
    </li>
  );
};

export default RequestCard;