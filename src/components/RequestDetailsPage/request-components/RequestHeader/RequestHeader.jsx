import s from './RequestHeader.module.scss';
import {statusColors} from "@/consts/requests.jsx";
import {formatDatShortMonth, getExpireText} from "@/utils/oneRequest.js";

const RequestHeader = ({request}) => {

  const showCreateDate = request.status.code !== 'completed' && request.status.code !== 'cancelled'
  const showExpireDate = request.status.code !== 'completed' && request.status.code !== 'cancelled' && request.status.code !== 'draft'

  return (
    <div className={s.header}>
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
          request.expireAt && request.status.code !=="draft" && (
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
          request.createdAt && showCreateDate &&  (
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