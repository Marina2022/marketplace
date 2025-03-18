import s from './Button.module.scss'
const Button = ({children, className, onClick, disabled, ...props}) => {
  
  return (
      <button disabled={disabled} onClick={onClick} className={`${s.btn} ${className}`} {...props} >
        {children}
      </button>
  );
};

export default Button;