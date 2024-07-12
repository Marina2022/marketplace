import {useParams, useSearchParams} from "react-router-dom";
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

function findClosestOption(options, targetValues, requiredOptionHandle) {

  let bestMatch = null;
  let bestMatchScore = -1;

  function getOptionValue(values, handle) {
    const value = values.find(v => v.optionHandle === handle);
    return value ? value.value.val : null;
  }

  const targetMemory = getOptionValue(targetValues, requiredOptionHandle);

  options.forEach(option => {
    const optionMemory = getOptionValue(option.values, requiredOptionHandle);

    if (optionMemory !== targetMemory) {
      return;
    }

    let score = 0;

    targetValues.forEach(targetValue => {
      const matchingValue = option.values.find(v => v.optionHandle === targetValue.optionHandle);
      if (matchingValue && matchingValue.value.val === targetValue.value.val) {
        score++;
      }
    });

    if (score > bestMatchScore) {
      bestMatch = option;
      bestMatchScore = score;
    }
  });

  return bestMatch ? {sku: bestMatch.sku, option: bestMatch.values} : null;
}


const ProductPage = () => {

  const [searchParams, setSearchParams] = useSearchParams()

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [path, setPath] = useState([])
  const [product, setProduct] = useState(null)
  const {slug: productHandle} = useParams()


  const [sku, setSku] = useState(null)
  // const [sku, setSku] = useState('58745219')


  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      setError(false)

      try {

        let requestString = `products/${productHandle}`
        const mySku = searchParams.get('sku')

        if (mySku) {
          requestString += `?sku=${mySku}`
        }

        const productResponse = await axiosInstance(requestString)
        
        const breadCrumbsPath = productResponse.data.meta.path
      
        setProduct(productResponse.data)

        if (breadCrumbsPath) {

           breadCrumbsPath[0].name = breadCrumbsPath[0].name + ' ' + productResponse.data.brand
           breadCrumbsPath[0].handle = breadCrumbsPath[0].handle + '?' + `brand=${productResponse.data.brand.toLowerCase()}`
        }

        setPath(breadCrumbsPath)
        

        if (!sku) {
          setSku(productResponse.data.options[0].sku)
        }

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
  }, [searchParams]);


  const handleOptionClick = ({optionName, optionValue, optionLabel}) => {

    const currentOptionValues = product.options.find(item => item.sku === sku).values

    const wantedOptionValues = JSON.parse(JSON.stringify(currentOptionValues))

    const wantedItemToChange = wantedOptionValues.find(item => item.optionHandle === optionName)
    wantedItemToChange.value.val = optionValue

    wantedItemToChange.value.label = optionLabel


    // // хотим получить комбинацию максимально близкую к этой: 
    // //console.log('wantedOptionValues', wantedOptionValues)

    const newSku = findClosestOption(product.options, wantedOptionValues, optionName)
    console.log("новый sku будет таким: ", newSku)
    console.log("новый sku sku будет таким: ", newSku.sku)


    // после засета подкгрузка пойдет, пока не сетай
    // setSku(newSku)


    setSearchParams({sku: newSku.sku})
    setSku(newSku.sku)
    // setPath([])
  }


  if (!product)
    return <Spinner className={s.spinner}/>


  return (

    <div className={s.productPageWrapper}>
      <div className='container'>


        <BreadCrumbs path={path} productBreadCrumbs={true} className={s.breadCrumbs} loading={isLoading}/>


        <div className={s.productMain}>
          <div className={s.productWrapper}>

            <ProductHeader product={product}/>
            <ProductPageSlider images={product.productImages} productId={product.productVariantId}
                               isFavourite={product.isFavourite}/>
            <Details product={product} sku={sku} handleOptionClick={handleOptionClick}/>
            <DetailedInfo product={product}/>
          </div>
          <RightSidebar product={product}/>
        </div>

        <MobileBottomMenu/>

      </div>
    </div>
  );
};


export default ProductPage;