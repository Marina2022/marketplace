import s from './ChooseReviewer.module.scss';
import {useState} from "react";
import pencil from '@/assets/img/lk/lk-main/pencil.svg'
const ChooseReviewer = ({chosenProfileIndex, reviewers}) => {
  console.log('chosenProfileIndex',chosenProfileIndex)
  const [editing, setEditing] = useState(false)
  
  if (!editing) {
    return (
      <div>
        <p className={s.firstText}>Вы оставляете отзыв как: </p>
        <div className={s.nameBlock}>
          <span >{reviewers[chosenProfileIndex].reviewerName}</span>
          <img src={pencil} alt="edit"/>
        </div>
      </div>
    );  
  }


  if (editing) {
    return (
      <div>
        
        hello

      </div>
    );
  }
  
};

export default ChooseReviewer;