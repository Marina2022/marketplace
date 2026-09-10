import s from './LoadingPicture.module.scss';
import loadingPicture from '@/assets/img/chat/loadingBg.jpg'
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const LoadingPicture = ({onePicture= false}) => {
  return (
    <div className={`${s.loadingPicture} ${onePicture ? s.onePicture : ''} }`}  >
      <img className={s.bgImg} src={loadingPicture} alt="bg"/>
      <MiniSpinner black />
    </div>
  );
};

export default LoadingPicture;