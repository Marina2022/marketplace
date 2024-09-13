import s from './Characteristics.module.scss';
import docImg from '@/assets/img/doc.png'
import {BASE_URL} from "@/consts/baseURL.js";
const Characteristics = ({product}) => {
  return (
    <div className={s.characteristics}>
      <div className={s.titleMobile}>Характеристики</div>
      <h3 className={s.title}>Основные характеристики</h3>
      <div className={s.table}>
        {
          product.characteristics.map((item, i) => {
            return (
              <div className={s.row} key={i}>
                <div className={s.label}>{item.name}</div>
                <div className={s.value}>{item.value}</div>
              </div>
            )
          })
        }
      </div>

      <h3 className={s.title}>Документация</h3>
      <ul className={s.docs}>
        {
          product.documents.map((doc, i) => {
            return (
              <li className={s.docItem} key={i}>
                <a target="_blank" href={`${BASE_URL}${doc.documentPath}`} className={s.docUpload} download>
                  <span className={s.circle}>
                    <img src={docImg} alt="doc icon"/>
                  </span>
                  <span>{doc.documentName}</span>
                </a>
              </li>
            )
          })
        }
      </ul>
    </div>
  );
};

export default Characteristics;