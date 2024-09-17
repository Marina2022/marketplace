import s from './CreateReview.module.scss'
import backArror from "@/assets/img/back-arror.svg"
import {Link, useNavigate, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {BASE_URL} from "@/consts/baseURL.js";
import ReviewForm from "@/components/ProductPage/CreateReview/ReviewForm/ReviewForm.jsx";

const CreateReview = () => {
  const {slug} = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    const getEligibility = async () => {

      try {
        const resp1 = await axios(`/products/${slug}`)
        const resp2 = await axios.post('reviews/eligibility', {productId: resp1.data.productId})

        if (!resp2.data.isEligible) {
          navigate('/')
          return
        }
        setProduct(resp1.data)

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getEligibility()
  }, [])

  if (isLoading) return <Spinner/>

  return (
    <div className="container-review">

      <Link className={s.backLink} to={`/product/${slug}`}>
        <img className={s.img} src={backArror} alt="back arror"/>
        <span>Назад к карточке товара</span>
      </Link>
      <div className={s.header}>
        <div className={s.imageWrapper}>
          <img className={s.headerImage} src={`${BASE_URL}${product.productImages[0].imageUrl}`}
               alt={product.productImages[0].imageName}/>
        </div>
        <span className={s.headerText}>Отзыв о товаре {product.productName.slice(0, 33) + '...'}</span>
      </div>
      <ReviewForm productId={product.productId} slug={slug}/>
    </div>
  );
};

export default CreateReview;
