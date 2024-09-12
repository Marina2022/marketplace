import s from './EditRating.module.scss';
import Star from "@/components/ProductPage/CreateReview/ReviewForm/EditRating/Star.jsx";
import {useState} from "react";

const EditRating = ({rating, setRating}) => {

  const [tempRating, setTempRating] = useState(1)  
  const [isInside, setIsInside] = useState(false)  
  const arr = Array.from({length: 5}, () => 1)
  
  return (
    <ul onMouseLeave={()=>setIsInside(false)} onMouseEnter={()=>setIsInside(true)} className={s.startList}>      
      {
        arr.map((item, i) => <Star 
          setTempRating={setTempRating} 
          setRating={setRating}
          rating={rating}
          tempRating={tempRating}
          index={i}          
          key={i}
          isInside={isInside}
        />)
      }
    </ul>
  );
};

export default EditRating;