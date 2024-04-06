import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import {useLocation, useParams, useSearchParams} from "react-router-dom";
import CategoryBlock from "@/components/CategoryBlock/CategoryBlock.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Error from "@/components/Error/Error.jsx";
import {PAGE_SIZE} from "@/consts/pageSize.js";

const Category = () => {

  const {category} = useParams()
  const [searchParams] = useSearchParams();

  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isFiltersLoading, setIsFiltersLoading] = useState(true)

  const [allFilters, setAllFilters] = useState([])
  const [path, setPath] = useState([])
  const [error, setError] = useState(null)

  const [pageCountTotal, setPageCountTotal] = useState(0)


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
  }, []);
  
  // Второй useEffect - загрузка списка товаров
  useEffect(() => {
    console.log('allFilters', allFilters)

    if (allFilters.length === 0) return
    const getData = async () => {

      setIsLoading(true)
      setError(false)
      try {
        let queryString = ''

        // добавляем в строку запроса на АПИ фильтры
        allFilters.map(filter => {
          const queryParam = searchParams.get(filter.nameHandle)
          if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
        })

        // добавляем в строку запроса на АПИ сортировку
        const sortColumn = searchParams.get('sortColumn')
        let sortOrder = searchParams.get('sortOrder')
        if (!sortOrder) {
          if (sortColumn === 'price') {
            sortOrder = 'asc'
          } else {
            sortOrder = 'desc'
          }
        }

        // добавляем в строку запроса на АПИ page
        let page = searchParams.get('page')
        if (!page) page = 1
        queryString = `${queryString}&page=${page}`

        const productsResponse = await axiosInstance(`category/${category}/products?pageSize=${PAGE_SIZE}${queryString}`)
        console.log('products', productsResponse.data.products)
        console.log('productsResponse', productsResponse)
        setPath(productsResponse.data.meta.path)
        setProducts(productsResponse.data.products)
        setPageCountTotal(productsResponse.data.meta.pages.totalCount)

      } catch (err) {
        setProducts([])
        setAllFilters([])
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
  }, [searchParams, location, allFilters]);

  
  if (isLoading || isFiltersLoading) return <Spinner/>
  if (error) return <Error>Нет такой страницы</Error>

  return (
      <CategoryBlock
          products={products}
          setProducts={setProducts}
          path={path}
          pageCountTotal={pageCountTotal}
          allFilters={allFilters}
      />
      
      // Блок "Вы смотрели"
  );
};

export default Category;