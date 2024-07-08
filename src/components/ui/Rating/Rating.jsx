import s from './Rating.module.scss';
import starFull from '@/assets/img/starFull.svg'
import starEmpty from '@/assets/img/starEmpty.svg'
const Rating = ({rating}) => {  
  const arr = [1,1,1,1,1]
  return (   
   
    <div className={s.wrapper}>
      {
        arr.map((item, i)=>{
          return <img src={rating >= i+1 ? starFull : starEmpty} key={i} /> 
        })    
      }
    
      
      
    </div>
  );
};

export default Rating;