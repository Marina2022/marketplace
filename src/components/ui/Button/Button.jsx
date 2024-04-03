import s from './Button.module.scss'
const Button = ({children, className, onClick}) => {
  return (
      <button onClick={onClick} className={`${s.btn} ${className}`}>
        {children}
      </button>
  );
};

export default Button;