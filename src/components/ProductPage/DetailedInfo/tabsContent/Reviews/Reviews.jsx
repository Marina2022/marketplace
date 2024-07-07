import s from './Reviews.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";


const Reviews = ({product}) => {


  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [reviews, setReviews] = useState([])
  const [cursor, setCursor] = useState(null)


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
          setReviews(productResponse.data.reviews)
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
              <div>*****</div>
              <div>{product.reviewsCount}</div>
            </div>
          </div>
          <Button>Написать&nbsp;отзыв</Button>


        </div>


      </div>

    </div>
  );
};

export default Reviews;