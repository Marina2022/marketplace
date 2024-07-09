import s from './Reviews.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import Rating from "@/components/ui/Rating/Rating.jsx";
import {getReviewsString} from "@/utils/reviews.js";
import ReviewsSort from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewSort/ReviewSort.jsx";
import ReviewsList from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/ReviewsList.jsx";
import {getCursor, getReviews, setCursor, setReviews} from "@/store/reviewsSlice.js";
import {useDispatch, useSelector} from "react-redux";



const Reviews = ({product}) => {


  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  
  // const [reviews, setReviews] = useState([])
  
  // const [cursor, setCursor] = useState(null)
  
  const cursor = useSelector(getCursor)

  const dispatch = useDispatch()
  const reviews = useSelector(getReviews)
  
  
  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      setError(false)

      let requestString

      if (cursor) {
        requestString = `products/${product.productId}/reviews?cursor=${cursor}`
      } else {
        requestString = `products/${product.productId}/reviews`
      }

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
        console.log(productResponse)
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
  }, []);
  
  const [sort, setSort] = useState('date')
  
  console.log(reviews.length)
  console.log(reviews)
  console.log('product- ', product)

  if (isLoading) return <Spinner className={s.spinner}/>

  if (error) return <div className={s.noReviews}>{error}</div>
    
  
  return (
    <div className={s.reviews}>
      <div className={s.globalWrapper}>
        <div className={s.sideBlock}>
          <div className={s.forTabletLeftBlock}>
            <div className={s.averageRating}>{product.reviewsRating}</div>

            <div className={s.ratingWrapper}>
              <Rating rating={product.reviewsRating} />
              <div>{ getReviewsString(product.reviewsCount)}</div>
            </div>
          </div>
          <Button className={s.writeReviewBtn}>Написать&nbsp;отзыв</Button>          
        </div>
        
        <div className={s.mainBlock}>          
          <ReviewsSort  sort={sort} setSort={setSort} />
          <ReviewsList reviews={reviews} productId={product.productId}  />
        </div>
        
        
      </div>

    </div>
  );
};

export default Reviews;