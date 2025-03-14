import s from './Products.module.scss';
import ProductCard from "@/components/ProductCard/ProductCard.jsx";
import {useSelector} from "react-redux";
import {getCartView} from "@/store/catalogSlice.js";
import {useParams, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import Error from "@/components/Error/Error.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {PAGE_SIZE} from "@/consts/pageSize.js";
import Pagination from "@/components/CategoryBlock/Pagination/Pagination.jsx";
import Sort from "@/components/CategoryBlock/Sort/Sort.jsx";
import CardView from "@/components/CategoryBlock/CardView/CardView.jsx";
import MobileFilters from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilters.jsx";
import MobileFilterListBlock
  from "@/components/CategoryBlock/Filters/MobileFilters/MobileFilterListBlock/MobileFilterListBlock.jsx";
import {getIsAuthenticated} from "@/store/userSlice.js";

const Products = ({isBigScreen, allFilters, rightPartRef}) => {

  const [searchParams] = useSearchParams();
  const [pageCountTotal, setPageCountTotal] = useState(0)
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false)
  const {category} = useParams()
  
  const isAuthenticated = useSelector(getIsAuthenticated)
   
  // useEffect - загрузка списка товаров
  useEffect(() => {    
    if (allFilters.length === 0) return
    const getData = async () => {

      setIsLoading(true)
      setError(false)
      
      try {
        let queryString = ''

        // добавляем в строку запроса на АПИ - фильтры
        allFilters.map(filter => {
          const queryParam = searchParams.get(filter.nameHandle)
          if (queryParam) queryString = `${queryString}&${filter.nameHandle}=${queryParam}`
        })

        // добавляем в строку запроса на АПИ - сортировку
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
        
        // добавляем в строку запроса на АПИ - page
        let page = searchParams.get('page')
        if (!page) page = 1
        queryString = `${queryString}&page=${page}`

        // добавляем в строку запроса на АПИ - цену
        let minPrice = searchParams.get('minPrice')
        let maxPrice = searchParams.get('maxPrice')
        if (minPrice && maxPrice) {
          queryString = `${queryString}&minPrice=${minPrice}&maxPrice=${maxPrice}`  
        }        
        
        // запрос
        const productsResponse = await axiosInstance(`category/${category}/products?pageSize=${PAGE_SIZE}${queryString}`)
        
        setProducts(productsResponse.data.products)
        setPageCountTotal(productsResponse.data.meta.pages.totalCount)
        
      } catch (err) {
        setProducts([])        

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
  }, [searchParams, location, allFilters, isAuthenticated]);


  useEffect(() => {
    // если товаров мало пришло в запросе, уменьшаем скролл    
    const rightPartHeight =  rightPartRef.current.getBoundingClientRect().height  - window.innerHeight + 240  // скролл до низа каталога

    if (rightPartHeight < window.scrollY) window.scrollTo(0, rightPartHeight)
  }, [products]);
  
  const cardView = useSelector(getCartView)
  
  if (isLoading) return <Spinner/>
  if (error) return <Error>Нет такой страницы</Error>

  //const manyProducts  = [...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products, ...products] //todo убрать
  
  return (
      <>
        <div className={s.sortAndView}>
          <Sort/>
          {
              isBigScreen && <CardView/>
          }

          {
            <MobileFilters isMobileFiltersOpen={isMobileFiltersOpen} setIsMobileFiltersOpen={setIsMobileFiltersOpen} allFilters={allFilters} />
          }
        </div>

        <MobileFilterListBlock filters={allFilters} isMobileFiltersOpen={isMobileFiltersOpen} setIsMobileFiltersOpen={setIsMobileFiltersOpen} />
        
        <div
            className={`${s.productsWrapper} ${(cardView === 'vertical' || !isBigScreen) && s.verticalViewCardWrapper}`}>
         
          {
             products.map((product, i) => {
              // manyProducts.map((product, i) => {  // для тестирование - много карточек
              return <ProductCard key={i} isBigScreen={isBigScreen} product={product}/>
            })
          }
        </div>

        {
            products.length > 0 &&
            <Pagination pageCountTotal={pageCountTotal} setProducts={setProducts} products={products}
                        allFilters={allFilters}  />
        }
      </>

  );
};

export default Products;