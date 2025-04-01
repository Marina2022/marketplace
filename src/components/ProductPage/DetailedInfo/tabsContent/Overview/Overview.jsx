import s from './Overview.module.scss';
import {useState} from "react";

const Overview = ({product, textSize = 1000}) => {
  
  const textFullParagraphs = product.productDescription.split(`\r\n`)
  const textCutParagraphs = (product.productDescription.slice(0, textSize) + '...').split(`\r\n`)
  const [showAll, setShowAll] = useState(product.productDescription.length <= textSize)
  const handleClick = ()=>{
    setShowAll(true)
  }
  
  const cutText = product.productDescription.slice(0, textSize) + '...'
  
  return (
    <div className={s.overview}>
      <h3 className={s.overviewTitleMobile}>Обзор</h3>
      {/*<div className={s.text}>*/}
      {/*  {*/}
      {/*    showAll ?*/}
      {/*      (textFullParagraphs.map((par, i) => {*/}
      {/*        return <p className={s.paragraph} key={i}>{par}</p>*/}
      {/*      }))*/}
      {/*      : (*/}
      {/*        textCutParagraphs.map((par, i) => {*/}
      {/*          return <p className={s.paragraph} key={i}>{par}</p>*/}
      {/*        })*/}
      {/*      )*/}
      {/*  }*/}
      {/*</div>*/}


      <div className={s.text}>
        {
          showAll ? (
              <div dangerouslySetInnerHTML={{__html: product.productDescription}}></div>
          )
            : (
              <div dangerouslySetInnerHTML={{__html: cutText}}></div>
            )
            
        }
      </div>

      {!showAll && <button className={s.readFull} onClick={handleClick}>Читать полностью</button>}

      <div className={s.images}>
        {
          product.overviewImages.map((image, i) => {
            return <img className={s.image} key={i} src={image.imageUrl} alt="image"/>
          })
        }
      </div>
    </div>
  );
};

export default Overview;