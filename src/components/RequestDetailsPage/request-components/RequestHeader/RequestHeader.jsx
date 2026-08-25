import s from './RequestHeader.module.scss';
import {statusColors} from "@/consts/requests.jsx";
import {formatDatShortMonth, getExpireText} from "@/utils/oneRequest.js";

const RequestHeader = ({request, forResponse= false, setViewed}) => {

  const showCreateDate = request.status.code !== 'completed' && request.status.code !== 'cancelled'
  const showExpireDate = request.status.code !== 'completed' && request.status.code !== 'cancelled' && request.status.code !== 'draft'

  return (
    <div className={s.header}>

      {
        forResponse && request.hasChanges && (
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

      <div className={s.topHeader}>
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

        <div className={s.number}>#{request.requestNumber}</div>

        {
          request.expireAt && request.status.code !=="draft" && !forResponse && (
            <div className={s.expires}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3.5V7H9.625M12.25 7C12.25 7.68944 12.1142 8.37213 11.8504 9.00909C11.5865 9.64605 11.1998 10.2248 10.7123 10.7123C10.2248 11.1998 9.64605 11.5865 9.00909 11.8504C8.37213 12.1142 7.68944 12.25 7 12.25C6.31056 12.25 5.62787 12.1142 4.99091 11.8504C4.35395 11.5865 3.7752 11.1998 3.28769 10.7123C2.80018 10.2248 2.41347 9.64605 2.14963 9.00909C1.8858 8.37213 1.75 7.68944 1.75 7C1.75 5.60761 2.30312 4.27226 3.28769 3.28769C4.27226 2.30312 5.60761 1.75 7 1.75C8.39239 1.75 9.72774 2.30312 10.7123 3.28769C11.6969 4.27226 12.25 5.60761 12.25 7Z" stroke="#565C68" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{getExpireText(request.expireAt)}</span>
            </div>
          )
        }
      </div>

      <h1 className={s.mainTitle}>{request.title}</h1>

      <div className={s.headerBottom}>
        {
          request.regionName && (
            <div className={s.item}>
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.5 5.25C7.5 5.64782 7.34196 6.02936 7.06066 6.31066C6.77936 6.59196 6.39782 6.75 6 6.75C5.60218 6.75 5.22064 6.59196 4.93934 6.31066C4.65804 6.02936 4.5 5.64782 4.5 5.25C4.5 4.85218 4.65804 4.47064 4.93934 4.18934C5.22064 3.90804 5.60218 3.75 6 3.75C6.39782 3.75 6.77936 3.90804 7.06066 4.18934C7.34196 4.47064 7.5 4.85218 7.5 5.25Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.75 5.25C9.75 8.821 6 10.875 6 10.875C6 10.875 2.25 8.821 2.25 5.25C2.25 4.25544 2.64509 3.30161 3.34835 2.59835C4.05161 1.89509 5.00544 1.5 6 1.5C6.99456 1.5 7.94839 1.89509 8.65165 2.59835C9.35491 3.30161 9.75 4.25544 9.75 5.25Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>{request.regionName}</span>
            </div>
          )
        }

        {
          request.createdAt && showCreateDate && !forResponse &&  (
            <div className={s.item}>
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.0269 2.32031H2.96975C2.35435 2.32031 1.85547 2.8192 1.85547 3.4346V10.0275C1.85547 10.6429 2.35435 11.1417 2.96975 11.1417H10.0269C10.6423 11.1417 11.1412 10.6429 11.1412 10.0275V3.4346C11.1412 2.8192 10.6423 2.32031 10.0269 2.32031Z" stroke="#6B7280" strokeWidth="1.11429"/>
                <path d="M1.85547 5.10491H11.1412M4.1769 1.39062V3.24777M8.81975 1.39062V3.24777" stroke="#6B7280" strokeWidth="1.11429" strokeLinecap="round"/>
              </svg>
              <span>Создана {formatDatShortMonth(request.createdAt)}</span>
            </div>
          )
        }

        {
          request.expireAt && showExpireDate && (
            <div className={s.item}>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7 3.5V7H9.625M12.25 7C12.25 7.68944 12.1142 8.37213 11.8504 9.00909C11.5865 9.64605 11.1998 10.2248 10.7123 10.7123C10.2248 11.1998 9.64605 11.5865 9.00909 11.8504C8.37213 12.1142 7.68944 12.25 7 12.25C6.31056 12.25 5.62787 12.1142 4.99091 11.8504C4.35395 11.5865 3.7752 11.1998 3.28769 10.7123C2.80018 10.2248 2.41347 9.64605 2.14963 9.00909C1.8858 8.37213 1.75 7.68944 1.75 7C1.75 5.60761 2.30312 4.27226 3.28769 3.28769C4.27226 2.30312 5.60761 1.75 7 1.75C8.39239 1.75 9.72774 2.30312 10.7123 3.28769C11.6969 4.27226 12.25 5.60761 12.25 7Z" stroke="#6B7280" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span>Срок до {formatDatShortMonth(request.expireAt)}</span>
            </div>
          )
        }
      </div>

    </div>
  );
};

export default RequestHeader;