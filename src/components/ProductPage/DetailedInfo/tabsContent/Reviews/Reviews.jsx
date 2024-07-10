import s from './Reviews.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import Rating from "@/components/ui/Rating/Rating.jsx";
import {getQuestionsString, getReviewsString} from "@/utils/reviews.js";
import ReviewsSort from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewSort/ReviewSort.jsx";
import ReviewsList from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/ReviewsList.jsx";
import {getCursor, getReviews, setCursor, setRequestString, setReviews} from "@/store/reviewsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import penIcon from '@/assets/img/penIcon.svg'


const Reviews = ({product}) => {


  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const cursor = useSelector(getCursor)

  const dispatch = useDispatch()
  const reviews = useSelector(getReviews)

  //sortColumn=rating&sortOrder=asc
  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  // console.log({sortColumn, sortOrder})

  let requestString = useSelector(getQuestionsString)
  
  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      setError(false)

      // let requestString

      if (cursor) {
        requestString = `products/${product.productId}/reviews?cursor=${cursor}`
      } else {
        requestString = `products/${product.productId}/reviews?`
      }
      
      if (sortColumn) {
        requestString+= `sortColumn=${sortColumn}&sortOrder=${sortOrder}`
      }

      // console.log('requestString - ', requestString)
      
      dispatch(setRequestString(requestString)) 

      try {

        // задержка, чтобы на спиннер посмотреть
        // await new Promise((res)=>{
        //   return setTimeout(()=>res(), 1000)
        // })

        const productResponse = await axiosInstance(requestString)
        if (productResponse.status === 200) {
          dispatch(setReviews(productResponse.data.reviews))
          setCursor(productResponse.data.cursor)
        } else throw new Error('response status not equal 200')
      } catch (err) {
        console.log('err = ', err)

        if (err.response.data.error.description == 'No found reviews') {
          setError('Отзывов пока еще нет')
        } else {
          setError('Произошла ошибка')
        }
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [sortColumn, sortOrder]);


  if (isLoading) return <Spinner className={s.spinner}/>
  if (error) return <div className={s.noReviews}>{error}</div>

  return (
    <div className={s.reviews}>
      <div className={s.globalWrapper}>
        <div className={s.sideBlock}>
          <div className={s.forTabletLeftBlock}>
            <div className={s.averageRating}>{product.reviewsRating}</div>

            <div className={s.ratingWrapper}>
              <Rating rating={product.reviewsRating}/>
              <div>{getReviewsString(product.reviewsCount)}</div>
            </div>
          </div>
          <Button className={s.writeReviewBtn}>
            <img src={penIcon} alt="icon"/>
            <span>Написать&nbsp;отзыв</span>
          </Button>
        </div>

        <div className={s.mainBlock}>
          <ReviewsSort sortColumn={sortColumn} setSortColumn={setSortColumn} sortOrder={sortOrder} setSortOrder={setSortOrder} />
          <ReviewsList reviews={reviews} productId={product.productId}/>
        </div>
      </div>
    </div>
  );
};

export default Reviews;