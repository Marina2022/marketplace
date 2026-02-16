import s from './RequestCard.module.scss';
import {statusColors} from "@/consts/lk-consts.js";

const RequestCard = ({request, handleCardClick}) => {

  return (
    <li
      className={s.requestCard}
      onClick={() => handleCardClick(request)}
    >

      <div className={s.cardHeader}>
        <div className={s.requestNumber}>№{request.requestNumber}</div>
        <div
          className={s.requestStatus}
          style={{
            color: statusColors[request.status.theme].color,
            background: statusColors[request.status.theme].backgroundColor,
          }}
        >
          {request.status.label}
        </div>

        <div className={s.menu}>...</div>
      </div>

      {request.title}

    </li>
  );
};

export default RequestCard;