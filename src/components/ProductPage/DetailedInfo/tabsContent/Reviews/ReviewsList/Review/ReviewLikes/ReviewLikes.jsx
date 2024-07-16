import s from './ReviewLikes.module.scss';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getLikes, updateLikes} from "@/store/reviewsSlice.js";

const ReviewLikes = ({review, productId}) => {

  const dispatch = useDispatch()

  const likesCount = review.likes
  const dislikesCount = review.dislikes

  const [userLikesIt, setUserLikesIt] = useState(null)
  const [userDislikesIt, setUserDislikesIt] = useState(null)

  let likesObj = useSelector(getLikes)

  // если объект пришел null (в LS ничего не найдено)
  if (!likesObj) likesObj = {
    reviewLikes: [],
    reviewDislikes: [],
    answerLikes: [],
    answerDislikes: [],
  }

// этот объект будет отправлен на api opinion
  let opinionApiObj = {
    type: 'reviewLikes',
    reviewId: review.reviewId,
    likes: review.likes,
    dislikes: review.dislikes
  }

  useEffect(() => {
    if (likesObj.reviewLikes.includes(review.reviewId)) {
      setUserLikesIt(true)
    } else {
      setUserLikesIt(false)
    }

    if (likesObj.reviewDislikes.includes(review.reviewId)) {
      setUserDislikesIt(true)
    } else {
      setUserDislikesIt(false)
    }
  }, [likesObj]);

  const handleLikeClick = async () => {
    let newLikesObj = {...likesObj}
    
    if (userLikesIt) {      
      newLikesObj.reviewLikes = newLikesObj.reviewLikes.filter(item => item !== review.reviewId)
      opinionApiObj.likes--
    }  
                      
    else if (userDislikesIt) {
      // апдейт объекта - убрать айди Отзыва из массива дизлайков, добавить в массив лайков
      newLikesObj.reviewDislikes = newLikesObj.reviewDislikes.filter(item => item !== review.reviewId)
      newLikesObj.reviewLikes = [...newLikesObj.reviewLikes, review.reviewId]

      opinionApiObj.likes++
      opinionApiObj.dislikes--
    
    } else {
      // апдейт объекта - добавить айди Отзыва в массив лайков      
      newLikesObj.reviewLikes = [...newLikesObj.reviewLikes, review.reviewId]
      opinionApiObj.likes++     
    }    
    dispatch(updateLikes({newLikesObj, opinionApiObj, productId}))
  }
  const handleDislikeClick = async () => {
    let newLikesObj = {...likesObj}
   
    if (userDislikesIt) {
      newLikesObj.reviewDislikes = newLikesObj.reviewDislikes.filter(item => item !== review.reviewId)
      opinionApiObj.dislikes--
    }    
    
    else if (userLikesIt) {
      // апдейт объекта - убрать айди Отзыва из массива лайков, добавить в массив дизлайков
      newLikesObj.reviewLikes = newLikesObj.reviewLikes.filter(item => item !== review.reviewId)
      newLikesObj.reviewDislikes = [...newLikesObj.reviewDislikes, review.reviewId]

      opinionApiObj.dislikes++
      opinionApiObj.likes--

    } else {
      // апдейт объекта - добавить айди Отзыва в массив дизлайков
      newLikesObj.reviewDislikes = [...newLikesObj.reviewDislikes, review.reviewId]
      opinionApiObj.dislikes++
    }

    dispatch(updateLikes({newLikesObj, opinionApiObj, productId}))
  }

  return (
    <div className={s.wrapper}>
      <div className={s.likesGroup}>
        <button onClick={handleLikeClick} className={s.likeBtn}>
          <svg className={userLikesIt ? s.likeActive : s.like} width="24" height="24" viewBox="0 0 24 24" fill="3E5067"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M16.28 22.1H12.48C11.92 22.1 10.7 21.93 10.05 21.28L7.02 18.94L7.94 17.75L11.04 20.15C11.29 20.39 11.92 20.59 12.48 20.59H16.28C17.18 20.59 18.15 19.87 18.35 19.06L20.77 11.71C20.93 11.27 20.9 10.87 20.69 10.58C20.47 10.27 20.07 10.09 19.58 10.09H15.58C15.06 10.09 14.58 9.86999 14.25 9.48999C13.91 9.09999 13.76 8.57999 13.84 8.03999L14.34 4.82999C14.46 4.26999 14.08 3.63999 13.54 3.45999C13.05 3.27999 12.42 3.53999 12.2 3.85999L8.1 9.95999L6.86 9.12999L10.96 3.02999C11.59 2.08999 12.97 1.63999 14.05 2.04999C15.3 2.45999 16.1 3.83999 15.82 5.11999L15.33 8.26999C15.32 8.33999 15.32 8.43999 15.39 8.51999C15.44 8.56999 15.51 8.59999 15.59 8.59999H19.59C20.57 8.59999 21.42 9.00999 21.92 9.71999C22.41 10.41 22.51 11.32 22.19 12.2L19.8 19.48C19.43 20.93 17.89 22.1 16.28 22.1Z"
            />
            <path
              d="M5.38 20.9999H4.38C2.53 20.9999 1.63 20.1299 1.63 18.3499V8.5499C1.63 6.7699 2.53 5.8999 4.38 5.8999H5.38C7.23 5.8999 8.13 6.7699 8.13 8.5499V18.3499C8.13 20.1299 7.23 20.9999 5.38 20.9999ZM4.38 7.3999C3.29 7.3999 3.13001 7.6599 3.13001 8.5499V18.3499C3.13001 19.2399 3.29 19.4999 4.38 19.4999H5.38C6.47001 19.4999 6.63 19.2399 6.63 18.3499V8.5499C6.63 7.6599 6.47001 7.3999 5.38 7.3999H4.38Z"
            />
          </svg>
        </button>
        <span className={s.text}>{likesCount}</span>
      </div>

      <div className={s.likesGroup}>
        <button onClick={handleDislikeClick} className={s.likeBtn}>
          <svg className={userDislikesIt ? s.likeActive : s.like} width="24" height="24" viewBox="0 0 24 24"
               fill="3E5067"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M10.8 22.0999C10.51 22.0999 10.22 22.0499 9.95 21.9499C8.7 21.5399 7.9 20.1599 8.18 18.8799L8.67 15.7299C8.68 15.6599 8.68 15.5599 8.61 15.4799C8.56 15.4299 8.49 15.3999 8.41 15.3999H4.41C3.43 15.3999 2.58 14.9899 2.08 14.2799C1.59 13.5899 1.49 12.6799 1.81 11.7999L4.2 4.5199C4.57 3.0699 6.12 1.8999 7.72 1.8999H11.52C12.08 1.8999 13.3 2.0699 13.95 2.7199L16.98 5.0599L16.06 6.2499L12.96 3.8499C12.71 3.5999 12.08 3.3999 11.52 3.3999H7.72C6.82 3.3999 5.85 4.1199 5.65 4.9299L3.23 12.2799C3.07 12.7199 3.1 13.1199 3.31 13.4099C3.53 13.7199 3.93 13.8999 4.42 13.8999H8.42C8.94 13.8999 9.42 14.1199 9.75 14.4999C10.09 14.8899 10.24 15.4099 10.16 15.9499L9.66 19.1599C9.54 19.7199 9.92 20.3499 10.46 20.5299C10.94 20.7099 11.58 20.4499 11.8 20.1299L15.9 14.0299L17.14 14.8699L13.04 20.9699C12.57 21.6699 11.68 22.0999 10.8 22.0999Z"
            />
            <path
              d="M19.62 18.1H18.62C16.77 18.1 15.87 17.23 15.87 15.45V5.65C15.87 3.87 16.77 3 18.62 3H19.62C21.47 3 22.37 3.87 22.37 5.65V15.45C22.37 17.23 21.47 18.1 19.62 18.1ZM18.62 4.5C17.53 4.5 17.37 4.76 17.37 5.65V15.45C17.37 16.34 17.53 16.6 18.62 16.6H19.62C20.71 16.6 20.87 16.34 20.87 15.45V5.65C20.87 4.76 20.71 4.5 19.62 4.5H18.62Z"/>
          </svg>
        </button>
        <span className={s.text}> {dislikesCount !== 0 ? '- ' + dislikesCount : '' + dislikesCount} </span>
      </div>
    </div>
  );
};

export default ReviewLikes;