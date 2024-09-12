import s from './TimePeriod.module.scss';
import radioBtn from '@/assets/img/radioBtn.svg'
import activeRadioBtn from '@/assets/img/activeRadioBtn.svg'

const TimePeriod = ({setPeriod, period}) => {

  const periods = [
    'Меньше месяца',
    'Несколько месяцев',
    'Больше года'
  ]

  return (
    <ul>
      {
        periods.map((item, i) => <li
          key={i}
          onClick={() => setPeriod(i)}
          className={s.item}
        >
          
          <img src={period === i ? activeRadioBtn : radioBtn} alt=""/>
          <div className={s.text}>{item}</div>
        </li>)
      }

    </ul>
  );
};

export default TimePeriod;