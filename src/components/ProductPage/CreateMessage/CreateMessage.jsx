import s from './CreateMessage.module.scss';
import {Link, useParams} from "react-router-dom";
import backArrow from "@/assets/img/back-arror.svg";
import axios from "@/api/axiosInstance.js";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import ProductCardForMessage
  from "@/components/ProductPage/CreateMessage/ProductCardForMessage/ProductCardForMessage.jsx";

const CreateMessage = () => {

  const {productHandle, sku} = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  // console.log('product from createMessage', product)

  useEffect(() => {
    const getProduct = async () => {

      try {
        const resp = await axios(`/products/${productHandle}?sku=${sku}`)
        setProduct(resp.data)

      } catch (err) {
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getProduct()
  }, [])

  const MAX_NUMBER = 4000
  const [currentNumber, setCurrentNumber] = useState(0)
  const [messageValue, setMessageValue] = useState('')
  
  const inputMessageHandler = (e)=> {
    if(+e.target.value.length > MAX_NUMBER) return
      
    setMessageValue(e.target.value)
    setCurrentNumber(e.target.value.length)
  }

  
  if (isLoading) return <Spinner/>


  return (
    <div className="container">
      <Link className={s.backLink} to={`/product/${productHandle}?sku=${sku}`}>
        <img src={backArrow} alt="back arror"/>
        <span>Назад к карточке товара</span>
      </Link>
      <h1 className={s.title}>Сообщение продавцу</h1>
      <div className={s.shopNameBlock}>
        {product.productVendor.shopName}
      </div>
      <ProductCardForMessage product={product}/>

      <form>
        <div className={s.messageWrapper}>
        <textarea
          value={messageValue}
          onChange={inputMessageHandler}
          className={s.message}
          placeholder="Пожалуйста, напишите ваше сообщение. Укажите детали, спецификации и другие требования.">          
        </textarea>

          <div className={s.symbolsQuantity}>{currentNumber}/{MAX_NUMBER}</div>
        </div>


        <div className={s.fileInputBlock}></div>

      </form>

    </div>
  );
};

export default CreateMessage;