import s from './Overview.module.scss';
import {useState} from "react";
import {BASE_URL} from "@/consts/baseURL.js";

const Overview = ({product}) => {

  const TEXT_SIZE = 1000
  //const TEXT_SIZE = 380

  
  const textFullParagraphs = product.productDescription.split(`\r\n`)
  
  const textCutParagraphs = (product.productDescription.slice(0, TEXT_SIZE) + '...').split(`\r\n`)


  //1380 символов 

  // если текст <= 1380 символов - showAll = true
  const [showAll, setShowAll] = useState(product.productDescription.length <= TEXT_SIZE)

  return (
    <div className={s.overview}>
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

      {!showAll && <button className={s.readFull} onClick={() => setShowAll(true)}>Читать полностью</button>}
      
      <div className={s.images}>
        {
          product.overviewImages.map((image, i)=>{
            return <img className={s.image} key={i} src={`${BASE_URL}${image.imageUrl}`} alt={image.imageName}/>
          })
        }
      </div>


    </div>
  );
};

export default Overview;