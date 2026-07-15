import s from './CompanyBalance.module.scss';
import Button from "@/components/ui/Button/Button.jsx";

const CompanyBalance = () => {
  const balance = 1347489
  const dollarBalance = 17489

  return (
    <div className={s.companyBalance}>
      <h2 className={s.title}>Баланс организации:</h2>
      <div className={s.wrapper}>
        <div className={s.text}>
          <p className={s.rubBalance}>{balance.toLocaleString()}&nbsp;₽</p>
          <p className={s.dollarBalance}>{dollarBalance.toLocaleString()}&nbsp;$</p>
        </div>
        <Button className={s.btn}>Пополнить&nbsp;счет </Button>
      </div>
    </div>
  );
};

export default CompanyBalance;