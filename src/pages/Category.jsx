import {useEffect, useRef, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useParams, useSearchParams} from "react-router-dom";

const Category = () => {

  const {category} = useParams()
  const [searchParams, setSearchParams] = useSearchParams();

  const [products, setProducts] = useState(null)
  const [page, setPage] = useState(1)  
  const [allFilters, setAllFilters] = useState([])

       
 
  useEffect(() => {
    const getData = async () => {
      const filtersFromServer = await axiosInstance(`category/${category}/filters`)
      setAllFilters(filtersFromServer.data.filters)
      
      let queryString = ''
      filtersFromServer.data.filters.map(filter => {
        console.log('filter.nameHandle', filter.nameHandle)
        const queryParam = searchParams.get(filter.nameHandle)
        if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
      })

      const productsResponse = await axiosInstance(`category/${category}/products?page=${page}&pageSize=36${queryString}`)
      setProducts(productsResponse.data.products)          
      
    }
    
    getData()
  }, []);
 

  console.log(products)

  return (
      <div>
        Category

        <br/>
        <br/>
        <button onClick={() => {
          console.log(products)
          searchParams.set('page',2)
          setSearchParams(searchParams)
        }}>btn</button>
      </div>
  );
};

export default Category;