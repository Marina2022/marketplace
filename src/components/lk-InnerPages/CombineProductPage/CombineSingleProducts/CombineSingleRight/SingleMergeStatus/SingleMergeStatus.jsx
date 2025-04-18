import s from './SingleMergeStatus.module.scss';
import Annotation from "@/components/ui/Annotation/Annotation.jsx";
import {useState} from "react";

const SingleMergeStatus = ({status}) => {

  let isGood = false
  if (status === 'Готов к объеденению') isGood = true
  
  const [showAnnotation, setShowAnnotation] = useState(false)
  
  
  return (
    <div 
      className={s.wrapperForAnnotation}
      onMouseEnter={() => setShowAnnotation(true)}
      onMouseLeave={() => setShowAnnotation(false)}
    >
      <div className={isGood ? s.goodStatus : s.badStatus}>
        {
          isGood ? 'Готов к объединению' : 'Невозможно объединить'
        }
      </div>

      {
        showAnnotation && <Annotation position="fromLeft">
          {
            isGood && <div className={s.annot}>Товар можно объединить с другими вариантами. В списке появится объединенная карточка товаров, содержащая все связанные позиции. После прохождения модерации товар станет доступен для дальнейших действий.</div>
          }

          {
            !isGood && <div className={s.annot}>Товар не может быть объединен с другими вариантами. Чтобы объединение стало возможным, проверьте соответствие данных. Тип товара, категория и бренд должны совпадать, и хотябы одна вариативная характеристика у вариантов - отличаться.</div>
          }
        </Annotation>
      }
      
    </div>
  
)
  ;
};

export default SingleMergeStatus;