import s from './Switch.module.scss';

const Switch = ({label, setChecked, checked}) => {
  return (
    <div className={s.wrapper} onClick={() => setChecked(prev => !prev)}>
      <div className={checked ? s.switchOuterChecked : s.switchOuter}>
        <div className={checked ? s.innerChecked : s.inner}></div>
      </div>
      <div className={s.text}>{label}</div>
      
    </div>
  );
};

export default Switch;