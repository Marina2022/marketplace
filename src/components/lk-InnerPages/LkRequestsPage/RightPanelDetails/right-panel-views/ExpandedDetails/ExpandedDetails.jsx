import s from './ExpandedDetails.module.scss';
import {statusColors} from "@/consts/lk-consts.js";
import collapseButton from "@/assets/img/lk/lk-requests/collapseButton.svg";

const ExpandedDetails = ({request, setExpanded, setShowTooltip, showTooltip}) => {
  return (
    <div className={s.detailsWrapper}>
      <div className={s.header}>
        <div className={s.heading}>Заявка №{request.requestNumber}</div>
        <div className={s.rightPartHeader}>
          <div
            className={s.requestStatus}
            style={{
              color: statusColors[request.status.theme].color,
              background: statusColors[request.status.theme].backgroundColor,
            }}
          >
            {request.status.label}
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
      </div>
    </div>
  );
};

export default ExpandedDetails;