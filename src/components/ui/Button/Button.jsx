import s from './Button.module.scss'
const Button = ({children, className, onClick, type="button", disabled, ...props}) => {
  
  return (
      <button type={type} disabled={disabled} onClick={onClick} className={`${s.btn} ${className}`} {...props} >
        {children}
      </button>
  );
};

export default Button;