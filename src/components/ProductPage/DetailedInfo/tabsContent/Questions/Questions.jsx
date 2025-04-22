import s from './Questions.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import penIcon from '@/assets/img/penIcon.svg'
import QuestionList from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/QuestionList/QuestionList.jsx";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";
import {useSelector} from "react-redux";
import {getIsAuthenticated} from "@/store/userSlice.js";
import {useNavigate} from "react-router-dom";

const Questions = ({product, questionsRef}) => {

  const PAGE_SIZE = 10
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [questions, setQuestions] = useState(null)
  const [cursorPaging, setCursorPaging] = useState(null)
  const [cursor, setCursor] = useState(0)
  const [pagesCount, setPagesCount] = useState(0)

  let showMoreBtn = false

  const isAuthenticated = useSelector(getIsAuthenticated)

  if (cursorPaging) {
    showMoreBtn = cursorPaging.cursorLimit > pagesCount * PAGE_SIZE
  }

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      setError(false)

      let requestString
      if (cursor) {
        requestString = `products/${product.productId}/questions?cursor=${cursor}`
      } else {
        requestString = `products/${product.productId}/questions?`
      }

      try {
        const productResponse = await axiosInstance(requestString)
        if (productResponse.status === 200) {
          setQuestions(productResponse.data.productQuestions)
          setCursorPaging(productResponse.data.cursorPaging)
          setPagesCount(prev => prev + 1)
        } else throw new Error('response status not equal 200')
      } catch (err) {
        console.log('err = ', err)

        if (err.response.data.error.description === "No found product questions") {  // description в ошибке не приходит, как для Отзывов
          setError('Вопросов пока еще нет')
        } else {
          setError('Произошла ошибка')
        }
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [cursor]);

  const showMoreHandler = () => {
    setCursor((pagesCount + 1) * PAGE_SIZE)
  }

  const navigate = useNavigate()
  const createQuestion = () => {
    navigate('new-question')
  }

  if (isLoading && pagesCount === 0) return <Spinner className={s.spinner}/>

  if (error) return <div className={s.globalWrapper} ref={questionsRef}>
    <div className={s.sideBlock}>
      <h3 className={s.mobileHeader}>Вопросы</h3>
      <Button onClick={createQuestion} disabled={!isAuthenticated} className={s.writeQuestionBtn}>
        <img src={penIcon} alt="icon"/>
        <span>Задать&nbsp;вопрос</span>
      </Button>
    </div>
    {
      window.innerWidth > 960 && !(questions?.length > 0) && <div className={s.noQuestions}>{error}</div>
    }
  </div>

  return (
    <div className={s.reviews}>
      <div className={s.globalWrapper}>
        <div className={s.sideBlock}>
          <h3 className={s.mobileTitle}>Вопросы</h3>
          <Button onClick={createQuestion} disabled={!isAuthenticated} className={s.writeQuestionBtn}>
            <img src={penIcon} alt="icon"/>
            <span>Задать&nbsp;вопрос</span>
          </Button>
        </div>
        <div className={s.mainBlock}>
          <QuestionList questions={questions} productId={product.productId}/>
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

export default Questions;