import s from './CartInput.module.scss'
import {useState} from "react";
import Button from "@/components/ui/Button/Button.jsx";

// const CartInput = ({className, value, onChange}) => {
const CartInput = ({className}) => {

  const [value, setValue] = useState(1)

  const onInputChange = (e) => {

    // только цифры вводим
    // if (e.target.value.match(/\D/g)) return;

    if (e.target.value.match(/\D/)) {
      const val = e.target.value.replace(/\D/, '');
      setValue(val)
    } else {
      setValue(e.target.value)
    }
    // onChange(e)
  }

  return (
      <div className={`${s.wrapper} ${className}`}>

        <div className={s.inputWrapper}>
          <button className={s.minusBtn}>
            <svg width="6" height="3" viewBox="0 0 6 3" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M5.28409 0.697665V2.16926H0.125V0.697665H5.28409Z" fill="#3E5067"/>
            </svg>

          </button>
          <input className={s.input} type="text" value={value} onChange={onInputChange}/>
          <button className={s.plusBtn}>
            <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                  d="M3.5625 8.61244V0.930619H5.09091V8.61244H3.5625ZM0.488636 5.53289V4.00448H8.17045V5.53289H0.488636Z"
                  fill="#3E5067"/>
            </svg>
          </button>
        </div>

        <Button className={s.toCartBtn}>
          <svg width="19" height="14" viewBox="0 0 19 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
                d="M6.57352 13.4361C6.20602 13.4361 5.85691 13.2891 5.59966 13.0319L0.399648 7.83186C-0.133216 7.29899 -0.133216 6.41701 0.399648 5.88415C0.932511 5.35129 1.81449 5.35129 2.34736 5.88415L6.57352 10.1103L16.0181 0.665761C16.5509 0.132897 17.4329 0.132897 17.9658 0.665761C18.4986 1.19862 18.4986 2.0806 17.9658 2.61347L7.54737 13.0319C7.29013 13.2891 6.94101 13.4361 6.57352 13.4361Z"
                fill="white"/>
          </svg>

        </Button>


      </div>
  );
};

export default CartInput;