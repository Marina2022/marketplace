import axios from "@/api/axiosInstance.js";
import s from './CreateQuestion.module.scss';
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import backArrow from "@/assets/img/back-arror.svg";
import {BASE_URL} from "@/consts/baseURL.js";
import QuestionForm from "@/components/ProductPage/CreateQuestion/ReviewFormQuestion/QuestionForm.jsx";

const CreateQuestion = () => {
  const {slug} = useParams()

  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  
  useEffect(() => {
    const getProduct = async () => {

      try {
        const resp = await axios(`/products/${slug}`)       
        setProduct(resp.data)

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getProduct()
  }, [])

  if (isLoading) return <Spinner/>

  return (
    <div className="container-review">

      <Link className={s.backLink} to={`/product/${slug}`}>
        <img src={backArrow} alt="back arror"/>
        <span>Назад к карточке товара</span>
      </Link>
      <div className={s.header}>
        <div className={s.imageWrapper}>
          {/*<img className={s.headerImage} src={`${BASE_URL}${product.productImages[0].imageUrl}`}*/}
          <img className={s.headerImage} src={product.productImages[0].imageUrl}
               alt="image"/>
        </div>
        <span className={s.headerText}>Вопросы о товаре {product.productName.slice(0, 33) + '...'}</span>
      </div>
      <QuestionForm productId={product.productId} slug={slug}/>
    </div>
  );
};

export default CreateQuestion;