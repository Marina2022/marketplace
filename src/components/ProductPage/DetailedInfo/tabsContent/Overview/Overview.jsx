import s from './Overview.module.scss';
import {useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";

const Overview = ({product, textSize = 1000}) => {
  
  const textFullParagraphs = product.productDescription.split(`\r\n`)
  const textCutParagraphs = (product.productDescription.slice(0, textSize) + '...').split(`\r\n`)

  const [showAll, setShowAll] = useState(product.productDescription.length <= textSize)

  const handleClick = ()=>{
    setShowAll(true)
  }
  
  return (
    <div className={s.overview}>
      <h3 className={s.overviewTitleMobile}>Обзор</h3>
      <div className={s.text}>
        {
          showAll ?
            (textFullParagraphs.map((par, i) => {
              return <p className={s.paragraph} key={i}>{par}</p>
            }))
            : (
              textCutParagraphs.map((par, i) => {
                return <p className={s.paragraph} key={i}>{par}</p>
              })
            )
        }
      </div>

      {!showAll && <button className={s.readFull} onClick={handleClick}>Читать полностью</button>}

      <div className={s.images}>
        {
          product.overviewImages.map((image, i) => {
            return <img className={s.image} key={i} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
          })
        }
      </div>
    </div>
  );
};

export default Overview;