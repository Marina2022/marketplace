import s from './CreateMessage.module.scss';
import {useParams} from "react-router-dom";
const CreateMessage = () => {
  
  const {productHandle, sku} = useParams()
  console.log({productHandle, sku})
  
  return (
    <div>
      CreateMessage
    </div>
  );
};

export default CreateMessage;