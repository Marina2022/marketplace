import s from './ClientBlock.module.scss';
import {getInitials} from "@/utils/oneRequest.js";
import {formatDisputes, formatRequests} from "@/utils/oneRespons.js";

const ClientBlock = ({request}) => {

  const yearSince = request.owner.memberSince.split("-")[0]
  return (
    <div className={s.clientBlock}>
      <h3 className={s.title}>Заказчик</h3>
      <div className={s.clientDesc}>
        <div className={s.initialsCircle}>
          {getInitials(request.owner.displayName)}
        </div>
        <div className={s.clientText}>
          <div className={s.name}>{request.owner.displayName}</div>
          <div className={s.since}>на платформе с {yearSince}</div>
        </div>
      </div>
      <ul className={s.values}>
        <li className={s.item}>
          <div className={s.value}>{request.owner.totalRequests}</div>
          <div className={s.label}>{formatRequests(request.owner.totalRequests)}</div>
        </li>
        <li className={s.item}>
          <div className={s.value}>{request.owner.completedRequests}</div>
          <div className={s.label}>завершено</div>
        </li>
        <li className={s.item}>
          <div className={s.value}>{request.owner.ownerDisputesCount}</div>
          <div className={s.label}>{formatDisputes(request.owner.ownerDisputesCount)}</div>
        </li>
      </ul>
    </div>
  )
}

export default ClientBlock;