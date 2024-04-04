import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import CategoryBlock from "@/components/CategoryBlock/CategoryBlock.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Error from "@/components/Error/Error.jsx";

const Category = () => {

  const {category} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [page, setPage] = useState(1)  
  const [allFilters, setAllFilters] = useState([])
  const [path,setPath] = useState([])
  const [error, setError] = useState(null)

  
  const location = useLocation();
  
  console.log('allFilters', allFilters)
 
  
  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      setError(false)     
      try {

        const filtersFromServer = await axiosInstance(`category/${category}/filters`)
        setAllFilters(filtersFromServer.data.filters)

        let queryString = ''
        filtersFromServer.data.filters.map(filter => {
          const queryParam = searchParams.get(filter.nameHandle)
          if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
        })
        const productsResponse = await axiosInstance(`category/${category}/products?page=${page}&pageSize=36${queryString}`)
        console.log(productsResponse.data)
        setPath(productsResponse.data.meta.path)
        setProducts(productsResponse.data.products)
      } catch (err) {
        setProducts([])
        setAllFilters([])
        setPath([])
        setError('Нет такой страницы')
        console.log( err)
      } finally {
        setIsLoading(false)
      }  
     }
    
    getData()
  }, [searchParams, location]);
 
  if (isLoading) return <Spinner />
  
  if (error) return  <Error>Нет такой страницы</Error>
  
  return (   
       <CategoryBlock products={products} filters={allFilters} path={path} />
     // Вы смотрели
  );
};

export default Category;