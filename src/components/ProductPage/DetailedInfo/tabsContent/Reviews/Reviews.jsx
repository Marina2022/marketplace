import s from './Reviews.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import Rating from "@/components/ui/Rating/Rating.jsx";
import {getQuestionsString, getReviewsString} from "@/utils/reviews.js";
import ReviewsSort from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewSort/ReviewSort.jsx";
import ReviewsList from "@/components/ProductPage/DetailedInfo/tabsContent/Reviews/ReviewsList/ReviewsList.jsx";
import {getReviews, setRequestString, setReviews} from "@/store/reviewsSlice.js";
import {useDispatch, useSelector} from "react-redux";
import penIcon from '@/assets/img/penIcon.svg'
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";


const Reviews = ({product, reviewsRef}) => {

  const PAGE_SIZE = 10

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const dispatch = useDispatch()
  const reviews = useSelector(getReviews)

  const [sortColumn, setSortColumn] = useState(null)
  const [sortOrder, setSortOrder] = useState(null)

  const [cursorPaging, setCursorPaging] = useState(null)
  const [cursor, setCursor] = useState(0)

  const [pagesCount, setPagesCount] = useState(0)

  let showMoreBtn = false

  if (cursorPaging) {
    showMoreBtn = cursorPaging.cursorLimit > pagesCount * PAGE_SIZE
  }

  let requestString = useSelector(getQuestionsString)

  useEffect(() => {
    const getData = async () => {

      // тестим задержку загрузки
      // await new Promise(res=>setTimeout(()=>res(),700))

      setIsLoading(true)
      setError(false)

      if (cursor) {
        requestString = `products/${product.productId}/reviews?cursor=${cursor}&`
      } else {
        requestString = `products/${product.productId}/reviews?`
      }

      if (sortColumn) {
        requestString += `sortColumn=${sortColumn}&sortOrder=${sortOrder}`
      }

      dispatch(setRequestString(requestString))

      try {
        const productResponse = await axiosInstance(requestString)
        if (productResponse.status === 200) {

          dispatch(setReviews(productResponse.data.reviews))
          setCursorPaging(productResponse.data.cursorPaging)

          setPagesCount(prev => prev + 1)

        } else throw new Error('response status not equal 200')
      } catch (err) {
        console.log('err = ', err)

        if (err.response.data.error && err.response.data.error.description == 'No found reviews') {
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
  }, [sortColumn, sortOrder, cursor]);


  // useEffect(() => {
  //
  //   console.log('юз эффект reviews')
  //
  //   if (reviewsRef.current) {
  //     reviewsRef.current.scrollIntoView({behavior: "smooth"})
  //   }
  // }, [reviewsRef.current])

  const showMoreHandler = () => {
    setCursor((pagesCount + 1) * PAGE_SIZE)
  }

  if (isLoading && pagesCount === 0) return <Spinner className={s.spinner}/>
  if (error) return <div className={s.globalWrapper} ref={reviewsRef}>
    <div className={s.sideBlock}>
      <h3 className={s.mobileHeader}>Отзывы</h3>
      <Button className={s.writeReviewBtn}>
        <img src={penIcon} alt="icon"/>
        <span>Написать&nbsp;отзыв</span>
      </Button>
    </div>
    {
      window.innerWidth > 960 && !(reviews.length > 0) && <div className={s.noReviews}>{error}</div>
    }
  </div>


  return (
    <div className={s.reviews}>
      <div className={s.globalWrapper}>
        <div className={s.sideBlock}>
          <div className={s.forTabletLeftBlock}>
            <h3 className={s.overviewTitleMobile}>Отзывы</h3>
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
          <ReviewsSort sortColumn={sortColumn} setSortColumn={setSortColumn} sortOrder={sortOrder}
                       setSortOrder={setSortOrder}/>
          <ReviewsList reviews={reviews} productId={product.productId}/>
          {
            showMoreBtn && <button className={s.moreBtn} onClick={showMoreHandler}>
              {
                isLoading && (pagesCount > 0) ? <MiniSpinner/> : 'Показать еще'
              }
            </button>
          }
        </div>
      </div>
    </div>
  );
};

export default Reviews;