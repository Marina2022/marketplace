import s from './Button.module.scss'
const Button = ({children, className, onClick, type="button", disabled, black=false, white=false, grey=false, ...props}) => {
  
  return (
      <button type={type} disabled={disabled} onClick={onClick} className={`${s.btn} ${black ? s.blackBtn : ''} ${grey ? s.greyBtn : ''} ${white ? s.whiteBtn : ''}   ${className}`} {...props} >
        {children}
      </button>
  )
}

export default Button;