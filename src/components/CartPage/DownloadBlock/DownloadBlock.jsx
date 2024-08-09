import s from './DownloadBlock.module.scss';
import docIcon from '@/assets/img/cart/doc.svg'
import {BASE_URL} from "@/consts/baseURL.js";
const DownloadBlock = ({links}) => {
  return (
    links?.summaryUrl && <div className={s.downloadBlock}>
      <a href={`${BASE_URL}${links.summaryUrl}`} className={s.downloadCart}>
        <img src={docIcon} alt="download cart"/>
        <span>Скачать корзину exel</span>
      </a>
      <a className={s.downloadSpecs}>
        <img src={docIcon} alt="download cart"/>
        <span>Скачать спецификации</span>
      </a>
    </div>
  );
};

export default DownloadBlock;