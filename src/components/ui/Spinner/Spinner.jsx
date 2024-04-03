import s from './Spinner.module.scss'
import {RotatingLines} from 'react-loader-spinner';
const Spinner = ({className}) => {
  return (
      <div className={`${s.spinner} ${className}`}>
        <RotatingLines
            strokeColor="#E32636"/>
      </div>
  );
};

export default Spinner;
