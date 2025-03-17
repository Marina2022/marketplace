import s from './StepsNav.module.scss';
const StepsNav = ({navItems, setStep, step}) => {
  const onSelectStep = (name) => {
    setStep(name)
  }

  return (
    <ul className={s.stepsNavWrapper}>
      {
        navItems.map((item, i) => {
          return (
            <li onClick={() => onSelectStep(item.name)} key={i} className={item.name === step ? s.stepActive : s.step}>
              <div className={s.number}>{i + 1}</div>
              <div className={s.itemText}>{item.label}</div>
            </li>
          )
        })
      }
    </ul>
  );
};

export default StepsNav;