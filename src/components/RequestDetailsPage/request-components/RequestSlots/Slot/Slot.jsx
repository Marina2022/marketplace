import s from './Slot.module.scss';
import {getInitials} from "@/utils/oneRequest.js";

const Slot = ({pinnedSlots, index}) => {

  const currentPinnedSlot = pinnedSlots[index]

  if (currentPinnedSlot) return (
    <li className={s.slotPinned}>
      {getInitials(currentPinnedSlot.displayName)}
    </li>
  )

  return (
    <li className={s.slot}>
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M6.5 0.5V12.5M12.5 6.5H0.5" stroke="#CFD4DB" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    </li>
  );
};

export default Slot;