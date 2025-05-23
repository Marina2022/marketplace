import s from './Description.module.scss';
import {useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";
import showMoreArrow from '@/assets/img/showMoreArrow.svg'

const Description = ({text, images}) => {
  const MAX_LENGTH = window.innerWidth > 960 ? 694 : 550
  const textFullParagraphs = text.split(`\r\n`)
  const textCutParagraphs = (text.slice(0, MAX_LENGTH) + '...').split(`\r\n`)
  const [showAll, setShowAll] = useState(text.length <= MAX_LENGTH)

  return (
    <div className={s.wrapper}>
      <div className={s.textBlock}>
        {
          showAll ?
            <>
              {
                textFullParagraphs.map((par, i) => {
                  return <p className={s.text} key={i}>{par}</p>
                })
              }

              {
                images && <div className={s.images}>
                  {
                    images.map((image, i) => {
                      return (
                        // <img className={s.img} key={i} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
                        <img className={s.img} key={i} src={image.imageUrl} alt={image.imageName}/>
                      )
                    })
                  }
                </div>
              }

            </>
            : (
              textCutParagraphs.map((par, i) => {
                return <p className={s.text} key={i}>{par}</p>
              })
            )
        }
      </div>
      {
        !showAll && <button className={s.readFull} onClick={() => setShowAll(true)}>
          <span>Показать&nbsp;полностью</span>
          <img src={showMoreArrow} alt="arrow"/>
        </button>
      }
    </div>
  )
}

export default Description;