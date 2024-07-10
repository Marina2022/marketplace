import s from './CollapsableText.module.scss';
import {useState} from "react";

const CollapsableText = ({text, className, maxLength, buttonClassName}) => {


  const textFullParagraphs = text.split(`\r\n`)

  const textCutParagraphs = (text.slice(0, maxLength) + '...').split(`\r\n`)

  // если текст <= maxLength, showAll = true
  const [showAll, setShowAll] = useState(text.length <= maxLength)
  
  return (
    <div className={s.wrapper}>
      <div>
        {
          showAll ?
            (textFullParagraphs.map((par, i) => {
              return <p className={className} key={i}>{par}</p>
            }))
            : (
              textCutParagraphs.map((par, i) => {
                return <p className={className} key={i}>{par}</p>
              })
            )
        }
      </div>

      {!showAll && <button className={`${s.readFull} ${buttonClassName}`} onClick={() => setShowAll(true)}>Читать полностью</button>}
    </div>
  );
};

export default CollapsableText;