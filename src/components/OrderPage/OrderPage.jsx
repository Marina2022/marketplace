import {useEffect, useState} from 'react';
import axios from "@/api/axiosInstance.js";
import {useParams} from "react-router-dom";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

import s from './OrderPage.module.scss'
import MainPartOrderDetails from "@/components/OrderPage/MainPartOrderDetails/MainPartOrderDetails.jsx";
import AdditionalPart from "@/components/OrderPage/MainPartOrderDetails/AdditionalPart/AdditionalPart.jsx";

const OrderPage = () => {

  const {orderId} = useParams()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [order, setOrder] = useState(null)
  
  useEffect(() => {
    const getData = async () => {
      setIsLoading(true)
      setError(false)


      try {
        const response = await axios(`orders/${orderId}/details`)
        setOrder(response.data)

      } catch (err) {
        console.log('err = ', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    getData()
  }, [])


  if (isLoading) return <Spinner/>

  if (error) {
    return <div>{error.message}</div>
  }

  return (
    <div className={s.orderPageWrapper}>
      
      <MainPartOrderDetails order={order} />
      
      <AdditionalPart order={order} />
    </div>
  );
};

export default OrderPage;