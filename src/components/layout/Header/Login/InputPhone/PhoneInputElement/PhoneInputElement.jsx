import s from './PhoneInputElement.module.scss';

const PhoneInputElement = ({phoneValue, setPhoneValue}) => {

  const placeholder = '000 000-00-00'
  const onInputChange = (e) => {
    console.log(e.target.value)

  }

  return (
    <div className={s.wrapper}>
      <div>+7</div>

      <div className={s.inputWrapper}>
        <input onChange={onInputChange}/>
        <div className={s.placeholder}>{placeholder}</div>
      </div>

    </div>


  );
};

export default PhoneInputElement;