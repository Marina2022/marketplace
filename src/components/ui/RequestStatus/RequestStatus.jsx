import s from './RequestStatus.module.scss';
import {statusColors} from "@/consts/requests.jsx";

const RequestStatus = ({request}) => {
  return (
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
  )
}

export default RequestStatus;