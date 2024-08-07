import s from './Button.module.scss'
const Button = ({children, className, onClick, disabled}) => {
  return (
      <button disabled={disabled} onClick={onClick} className={`${s.btn} ${className}`}>
        {children}
      </button>
  );
};

export default Button;