import s from './Description.module.scss';
import {useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";

const Description = ({text, images}) => {

  const MAX_LENGTH = 694

  const textFullParagraphs = text.split(`\r\n`)
  const textCutParagraphs = (text.slice(0, MAX_LENGTH) + '...').split(`\r\n`)

  // если текст <= maxLength, showAll = true
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
              <div className={s.images}>
                {
                  images.map((image, i) => {
                    return (
                      <img className={s.img} key={i} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
                    )
                  })
                }
              </div>
            </>

          
          : (
          textCutParagraphs.map((par, i) => {
          return <p className={s.text} key={i}>{par}</p>
      })
      )
      }
    </div>

{/*<div className={s.images}>*/
}
{/*  {*/
}
{/*    images.map((image, i) => {*/
}
{/*      return (*/
}
{/*        <img className={s.img} key={i} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>*/
}
{/*      )*/
}
{/*    })*/
}
{/*  }*/
}

{/*</div>*/
}


{
  !showAll && <button className={s.readFull} onClick={() => setShowAll(true)}>Читать полностью</button>
}
</div>
)
  ;
};

export default Description;