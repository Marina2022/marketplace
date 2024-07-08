import {useParams} from "react-router-dom";
import s from './ProductPage.module.scss'
import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import ProductPageSlider from "@/components/ProductPage/ProductPageSlider/ProductPageSlider.jsx";
import ProductHeader from "@/components/ProductPage/ProductHeader/ProductHeader.jsx";
import Details from "@/components/ProductPage/Details/Details.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import RightSidebar from "@/components/ProductPage/RightSidebar/RightSidebar.jsx";
import MobileBottomMenu from "@/components/ProductPage/MobileBottomMenu/MobileBottomMenu.jsx";
import DetailedInfo from "@/components/ProductPage/DetailedInfo/DetailedInfo.jsx";

const ProductPage = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [path, setPath] = useState([])
  const [product, setProduct] = useState(null)
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
  }

  if (!product)
    return <Spinner className={s.spinner}/>


  return (
    <div className={s.productPageWrapper}>
      <div className='container'>
        <BreadCrumbs path={path} productBreadCrumbs={true} className={s.breadCrumbs}/>
        <div className={s.productMain}>
          <div className={s.productWrapper}>

            <ProductHeader product={product}/>
            <ProductPageSlider images={product.productImages} productId={product.productVariantId}
                               isFavourite={product.isFavourite}/>
            <Details product={product}/>
            <DetailedInfo product={product} />
          </div>
          <RightSidebar product={product}/>
        </div>

        <MobileBottomMenu />
        
      </div>
    </div>
  );
};

export default ProductPage;