import s from './Questions.module.scss';
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Button from "@/components/ui/Button/Button.jsx";
import penIcon from '@/assets/img/penIcon.svg'
import QuestionList from "@/components/ProductPage/DetailedInfo/tabsContent/Questions/QuestionList/QuestionList.jsx";

const Questions = ({product}) => {


  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  const [cursor, setCursor] = useState(null)
  const [questions, setQuestions] = useState(null)

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

        // задержка, чтобы на спиннер посмотреть
        // await new Promise((res)=>{
        //   return setTimeout(()=>res(), 1000)
        // })

        const productResponse = await axiosInstance(requestString)

        console.log(productResponse)
        if (productResponse.status === 200) {
          setQuestions(productResponse.data.productQuestions)
          setCursor(productResponse.data.cursor)
        } else throw new Error('response status not equal 200')
      } catch (err) {
        console.log('err = ', err)

        if (err.response.status === 400) {  // message в ошибке не приходит, как для Отзывов
          setError('Ответов пока еще нет')
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


  if (isLoading) return <Spinner className={s.spinner}/>
  if (error) return <div className={s.noQuestions}>{error}</div>

  return (
    <div className={s.reviews}>
      <div className={s.globalWrapper}>
        <div className={s.sideBlock}>
          <Button className={s.writeQuestionBtn}>
            <img src={penIcon} alt="icon"/>
            <span>Задать&nbsp;вопрос</span>
          </Button>
        </div>

        <div className={s.mainBlock}>
          <QuestionList questions={questions} productId ={product.productId} />
        </div>
      </div>
    </div>
  );
};

export default Questions;