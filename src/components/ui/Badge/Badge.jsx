import s from './Badge.module.scss';
const Badge = ({children, bgColor}) => {
  return (
      <div className={s.badge} style={{background: bgColor}}>
        {children}
      </div>
  );
};

export default Badge;