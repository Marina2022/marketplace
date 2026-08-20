import {ImSpinner2} from "react-icons/im";
import s from './MiniSpinner.module.scss'

const MiniSpinner = ({black = false}) => {

  if (black) return (
    <span className={s.spinnerBlack}><ImSpinner2 className={s.svgBlack}/></span>
  )

  return (
    <span className={s.spinner}><ImSpinner2 className={s.svg}/></span>
  );
};

export default MiniSpinner;

