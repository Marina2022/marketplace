import {useParams} from "react-router-dom";
import s from './ProductPage.module.scss'
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import {useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import useBigScreen from "@/hooks/useBigScreen.js";
import useMobileScreen from "@/hooks/useMobileScreen.js";

const ProductPage = () => {

  // const isBigScreen = useBigScreen()
  // const isMobile = useMobileScreen()
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [path, setPath] = useState([])
  const [product, setProduct] = useState([])
  const {slug: productHandle} = useParams()

  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      setError(false)

      try {
        const productResponse = await axiosInstance(`products/${productHandle}`)
        setPath(productResponse.data.meta.path)
        setProduct(productResponse.data)
      } catch (err) {

        console.log('err = ', err.response.status)

        setPath([])

        // это будет работать, если статус 405 приходит только! в случае, если не найдена страница
        if (err.response.status === '405') {
          setError('Товар не найден')
        } else {
          setError('Произошла ошибка')
        }
        console.log(err)
      } finally {
        setIsLoading(false)
      }
    }
    getData()
  }, [location]);

  console.log(product)

  const breadCrumbsPath = [...path]

  if (breadCrumbsPath[0]) {
    breadCrumbsPath[0].name = breadCrumbsPath[0].name + ' ' + product.brand
    breadCrumbsPath[0].handle = breadCrumbsPath[0].handle + '?' + `brand=${product.brand.toLowerCase()}`

    console.log(breadCrumbsPath[0])
  }


  return (
      <div className='container'>
        <BreadCrumbs path={path} productBreadCrumbs={true}/>

        <div className={s.productMain}>

          <div className={s.productWrapper}>
            <div className={s.header}>
              <h1>Смартфон Xiaomi Redmi A2+ 3/64 Gb</h1>
            </div>

            <div className={s.sliderBlock}>
              <div className={s.thumbnails}>thumbs</div>
              <div className={s.bigPicture}>big picture</div>
            </div>
            <div className={s.details}>details</div>            

            <div className={s.tabs}>Компонент с табами или с аккордеоном</div>
          </div>


          <div className={s.rightSidebar}>right sidbar</div>

        </div>


      </div>
  );
};

export default ProductPage;