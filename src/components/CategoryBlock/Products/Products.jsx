import s from './Products.module.scss';
import ProductCard from "@/components/CategoryBlock/Products/ProductCard/ProductCard.jsx";
import {useSelector} from "react-redux";
import {getCartView, getScroll} from "@/store/catalogSlice.js";
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

const Products = ({isBigScreen, allFilters}) => {


  const [searchParams] = useSearchParams();
  const [pageCountTotal, setPageCountTotal] = useState(0)
  const [products, setProducts] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)


  const {category} = useParams()


  // useEffect - загрузка списка товаров
  useEffect(() => {
    // window.scrollTo(0, scroll)
    console.log('allFilters', allFilters)

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
        console.log('products', productsResponse.data.products)
        console.log('productsResponse', productsResponse)
        setProducts(productsResponse.data.products)
        setPageCountTotal(productsResponse.data.meta.pages.totalCount)
        


      } catch (err) {
        setProducts([])
        //setAllFilters([])

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

  const cardView = useSelector(getCartView)


  if (isLoading) return <Spinner/>
  if (error) return <Error>Нет такой страницы</Error>

  return (

      <>

        <div className={s.sortAndView}>
          <Sort/>

          {
              isBigScreen && <CardView/>
          }

          {
            <MobileFilters/>
          }
        </div>

        <div
            className={`${s.productsWrapper} ${(cardView === 'vertical' || !isBigScreen) && s.verticalViewCardWrapper}`}>

          {
            products.map((product, i) => {
              return <ProductCard key={i} isBigScreen={isBigScreen} product={product}/>
            })
          }
        </div>

        {
            products.length > 0 &&
            <Pagination pageCountTotal={pageCountTotal} setProducts={setProducts} products={products}
                        allFilters={allFilters}/>
        }
      </>

  );
};

export default Products;