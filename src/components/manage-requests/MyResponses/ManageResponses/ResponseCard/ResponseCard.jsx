import s from './ResponseCard.module.scss';
import placeHolderImg from "@/assets/img/lk/lk-requests/placeholder.png";

const ResponseCard = ({response, isLast}) => {
  return (
    <div className={`${s.card} ${isLast ? s.lastCard : ''}`}>
      <div className={s.leftBlock}>
        <img className={`${s.img} ${response.picture ? '' : s.imgWithBorder}`} src={response.picture ? response.picture : placeHolderImg} alt=""/>

        <div className={s.descBlock}>
          <div className={s.title}>
            {response.title}
          </div>
          <div className={s.geoCat}>
            <div className={s.city}>{response.regionName}</div>
            <ul className={s.cats}>
              {
                response.categoryNames.map((cat, i) => <li className={s.cat} key={i}>{cat}</li>)
              }
            </ul>

          </div>
        </div>

      </div>

      <div className={s.middleBlock}>
        <div className={s.clientCell}>заказчик</div>
        <div className={s.statusCell}>статус чата 3</div>
      </div>

      <div className={s.rightBlock}>
        <div className={s.lastMessageCell}>Последнее сообщение</div>
        <div className={s.dateCell}>Дата</div>
        <div>ic</div>
      </div>
    </div>
  );
};

export default ResponseCard;