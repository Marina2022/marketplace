import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useParams, useSearchParams} from "react-router-dom";
import CategoryPage from "@/components/CategoryPage/CategoryPage.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const Category = () => {

  const {category} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  
  const [page, setPage] = useState(1)  
  const [allFilters, setAllFilters] = useState([])
  const [path,setPath] = useState([])
  
  console.log('allFilters', allFilters)
 
  useEffect(() => {
    const getData = async () => {

      setIsLoading(true)
      
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
        console.log( err)
      } finally {
        setIsLoading(false)
      }  
     }
    
    getData()
  }, [searchParams]);
 
  console.log(products)
  if (isLoading) return <Spinner />
  
  return (   
       <CategoryPage products={products} filters={allFilters} path={path} />
  );
};

export default Category;