import s from './MobilePagination.module.scss';
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {PAGE_SIZE} from "@/consts/pageSize.js";
import MiniSpinner from "@/components/ui/miniSpinner/MiniSpinner.jsx";

const MobilePagination = ({products, setProducts, allFilters, pageCountTotal}) => {

  const {category} = useParams()
  const [searchParams] = useSearchParams();

  // при каждом клике на кнопку "Показать еще" увеличиваем счетчик на 1
  const [pagesToAdd, setPagesToAdd] = useState(1)

  const [isLoading, setIsLoading] = useState(false)

  let currentPage = searchParams.get('page')
  if (!currentPage) currentPage = 1

  const [pageIsFinal, setPageIsFinal] = useState(currentPage > pageCountTotal)
  
  useEffect(() => {
    if (currentPage >= pageCountTotal){
      setPageIsFinal(true)
    } else {
      setPageIsFinal(false)
    }
  }, [pageCountTotal]);
     
  const onShowMoreClick = async () => {

    setPagesToAdd(prev => prev + 1)

    let queryString = ''

    //добавляем фильтры в строку запроса на АПИ  
    allFilters.map(filter => {
      const queryParam = searchParams.get(filter.nameHandle)
      if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
    })

    // добавляем сортировку в строку запроса на АПИ    
    const sortColumn = searchParams.get('sortColumn')
    let sortOrder = searchParams.get('sortOrder')
    if (!sortOrder) {
      if (sortColumn === 'price') {
        sortOrder = 'asc'
      } else {
        sortOrder = 'desc'
      }
    }
    if (sortColumn) {
      queryString = `${queryString}&sortColumn=${sortColumn}&sortOrder=${sortOrder}`
    }

    // добавляем страницу в строку запроса на АПИ 
    queryString = `${queryString}&page=${+currentPage + pagesToAdd}`

    // добавляем в строку запроса на АПИ - цену
    let minPrice = searchParams.get('minPrice')
    let maxPrice = searchParams.get('maxPrice')
    if (minPrice && maxPrice) {
      queryString = `${queryString}&minPrice=${minPrice}&maxPrice=${maxPrice}`
    }

    try {
      setIsLoading(true)
      const productsResponse = await axiosInstance(`category/${category}/products?pageSize=${PAGE_SIZE}${queryString}`)            
      const newProducts = [...products, ...productsResponse.data.products]
      setProducts(newProducts)           
      if (productsResponse.data.meta.pages.page >= productsResponse.data.meta.pages.totalCount) setPageIsFinal(true)

    } catch (err) {
      console.log(err)
    } finally {
      setIsLoading(false)
    }
  }
  
  if (pageIsFinal) return <></>

  return (
      <button disabled={pageIsFinal} onClick={onShowMoreClick} className={s.btn}>
        {
          isLoading ? <MiniSpinner /> : <span>Показать еще</span> 
        }        
      </button>
  );
};

export default MobilePagination;