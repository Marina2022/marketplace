import s from './Tariff.module.scss';

import Button from "@/components/ui/Button/Button.jsx";
import questionIcon from "@/assets/img/lk/lk-main/questionIcon.svg";

const Tariff = () => {
  return (
    <div className={s.tariff}>
      <h2 className={s.tariffTitle}>Тарифный план</h2>
      <div className={s.tariffBottomWrapper}>
        <div className={s.something}>Не выбран</div>
        <Button className={s.btn}>Выбрать&nbsp;тариф</Button>
      </div>
      <div className={s.chooseTariff}>
        <span className={s.chooseTariffText}>Подобрать тариф</span>
        <img className={s.chooseTariffIcon} src={questionIcon} alt="icon"/>
      </div>
    </div>
  );
};

export default Tariff;