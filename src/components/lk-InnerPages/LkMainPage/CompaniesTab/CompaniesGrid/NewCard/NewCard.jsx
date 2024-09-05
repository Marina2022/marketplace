import s from './NewCard.module.scss';
import bigPlus from '@/assets/img/lk/lk-main/big-plus.svg'

const NewCard = () => {
  return (
    <li className={s.newCard}>
      <img src={bigPlus} alt=""/>
      
      <div className={s.cornerOne}></div>
      <div className={s.cornerTwo}></div>
      <div className={s.cornerThree}></div>
      <div className={s.cornerFour}></div>
      
    </li>
  );
};

export default NewCard;