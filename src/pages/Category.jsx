import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useParams, useSearchParams} from "react-router-dom";
import CategoryPage from "@/components/CategoryPage/CategoryPage.jsx";

const Category = () => {

  const {category} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(null)
  const [page, setPage] = useState(1)  
  const [allFilters, setAllFilters] = useState([])
  const [path,setPath] = useState([])
  
  console.log('allFilters', allFilters)
 
  useEffect(() => {
    const getData = async () => {
      const filtersFromServer = await axiosInstance(`category/${category}/filters`)
      setAllFilters(filtersFromServer.data.filters)
      
      let queryString = ''
      filtersFromServer.data.filters.map(filter => {
       // console.log('filter.nameHandle', filter.nameHandle)
        const queryParam = searchParams.get(filter.nameHandle)
        if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
      })

      const productsResponse = await axiosInstance(`category/${category}/products?page=${page}&pageSize=36${queryString}`)

      console.log(productsResponse.data)

      setPath(productsResponse.data.meta.path)
      
      setProducts(productsResponse.data.products)
    }
    
    getData()
  }, [searchParams]);
 
  console.log(products)
  
  
  return (
      // <p>hello</p>
      
       <CategoryPage products={products} filters={allFilters} path={path} />

  );
};

export default Category;