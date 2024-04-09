import BreadCrumbs from "@/components/CategoryBlock/BreadCrumbs/BreadCrumbs.jsx";
import s from "./TopBlock.module.scss"
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Error from "@/components/Error/Error.jsx";

const TopBlock = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchParams] = useSearchParams();
  const [path, setPath] = useState([])
 const [pageCountTotal, setPageCountTotal] = useState(0)
  const {category} = useParams()

  // useEffect - загрузка списка товаров
  useEffect(() => {

    const getData = async () => {

      setIsLoading(true)
      setError(false)
      try {
        
        const productsResponse = await axiosInstance(`category/${category}/products`)
         setPath(productsResponse.data.meta.path)
        
        setPageCountTotal(productsResponse.data.meta.pages.totalCount)

      } catch (err) {
        // setProducts([])
        //setAllFilters([])
        setPath([])
        setPageCountTotal(0)

        // это будет работать, если статус 405 приходит только! в случае, если не найдена страница
        if (err.response.status === '405') {
          setError('Нет такой страницы')
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

  // if (isLoading) return <Spinner/>
  if (isLoading) return <p className={s.placeholder}></p>
  if (error) return <Error>Нет такой страницы</Error>
  
  return (
      <>
        <BreadCrumbs path={path}/>
        <h1 className={s.title}>{path[0].name}</h1> 
      </>
  );
};

export default TopBlock;