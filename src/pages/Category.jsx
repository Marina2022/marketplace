import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import CategoryBlock from "@/components/CategoryBlock/CategoryBlock.jsx";
import Error from '@/components/Error/Error.jsx'
const Category = () => {
  const {category} = useParams()
  const [products, setProducts] = useState(null)  
  const [error, setError] = useState(null)  
  const [isFiltersLoading, setIsFiltersLoading] = useState(true)

  const [allFilters, setAllFilters] = useState([])
 

  const location = useLocation();

  // загрузка фильтров при первом заходе на страницу
  useEffect(() => {
    const getFilters = async () => {
      setIsFiltersLoading(true)
      setError(false)
      try {
        const filtersFromServer = await axiosInstance(`category/${category}/filters`)
        setAllFilters(filtersFromServer.data.filters)

      } catch (err) {
        console.log(err)
        setError('Произошла ошибка')
      } finally {
        setIsFiltersLoading(false)
      }
    }
    getFilters()
  }, [location]);
  
  if (error) return <Error></Error>
  
  return (
      <CategoryBlock
          products={products}
          setProducts={setProducts}                    
          allFilters={allFilters}
      />
  );
};

export default Category;