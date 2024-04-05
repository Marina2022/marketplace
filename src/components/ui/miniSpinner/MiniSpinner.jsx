import {ImSpinner2} from "react-icons/im";
import s from './MiniSpinner.module.scss'
const MiniSpinner = () => {
  return (
      <span className={s.spinner}><ImSpinner2 className={s.svg}/></span>
  );
};

export default MiniSpinner;

