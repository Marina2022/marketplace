import s from './RequestSlots.module.scss';
import Slot from "@/components/RequestDetailsPage/request-components/RequestSlots/Slot/Slot.jsx";

const RequestSlots = ({request, responses}) => {

  if (!responses) return null

  const arr = Array.from({length: request.maxPinnedChats})

  return (
    <div className={s.requestSlots}>

      <div className={s.header}>
        <h3 className={s.title}>Слоты закреплённых</h3>
        {
          arr.length > 0 && <div className={s.headerTotal}>{responses.pinnedSlots.length} из {arr.length}</div>
        }
      </div>

      <ul className={s.slotsGrid}>
        {
          arr.length > 0 && arr.map((item, index) => <Slot key={index} index={index} pinnedSlots={responses.pinnedSlots} />)
        }
      </ul>

      <div className={s.subText}>Закрепите исполнителя — занесите в&nbsp;слот для&nbsp;отслеживания сделки</div>
    </div>
  );
};

export default RequestSlots;