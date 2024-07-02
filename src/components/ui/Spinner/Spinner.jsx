import s from './Spinner.module.scss'
import {TailSpin } from 'react-loader-spinner';
const Spinner = ({className}) => {  
  return (
      <div className={`${s.spinner} ${className}`}>
         <TailSpin
            color="#658092"
            height="60"
            width="60"
         />        
            {/*color="#E32636"/>*/}
      </div>
  );
};

export default Spinner;
