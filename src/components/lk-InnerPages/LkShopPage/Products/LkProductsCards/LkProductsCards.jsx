import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {useNavigate, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import s from './LkProductsCards.module.scss'
import Button from "@/components/ui/Button/Button.jsx";
import Tabs from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/Tabs/Tabs.jsx";
import ContentPart from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ContentPart/ContentPart.jsx";
import SearchProductCard
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/SearchProductCard/SearchProductCard.jsx";
import ProductCardFilters
  from "@/components/lk-InnerPages/LkShopPage/Products/LkProductsCards/ProductCardFilters/ProductCardFilters.jsx";

const LkProductsCards = () => {

  const profileId = useSelector(getActiveProfileId)
  const [productsLoading, setProductsLoading] = useState(true)
  const [productsData, setProductsData] = useState(null)

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate()

  const getProducts = async () => {
       

    let url = `seller/${profileId}/products?`

    const statusTab = searchParams.get('statusTab')
    if (statusTab && statusTab !== 'all') url += `statusTab=${statusTab}&`

    const searchTerms = searchParams.get('searchTerms')
    if (searchTerms) url += `searchTerms=${searchTerms}&`

    const sortColumn = searchParams.get('sortColumn')
    if (sortColumn) url += `sortColumn=${sortColumn}&`
    const sortOrder = searchParams.get('sortOrder')
    if (sortOrder) url += `sortOrder=${sortOrder}&`
    
    const filterNames = ['status', 'brand', 'category', 'rating']

    filterNames.forEach(filterName=>{      
      const currentFilter = searchParams.get(filterName)
      if (currentFilter) url += `${filterName}=${currentFilter}&`      
    })


    try {
      setProductsLoading(true)
      const resp = await axiosInstance(url)
      setProductsData(resp.data)
      console.log(resp.data)
    } catch (err) {
      console.log(err)
    } finally {
      setProductsLoading(false)
    }
  }

  useEffect(() => {
    if (!profileId) return
    getProducts()

  }, [profileId, searchParams]);



  return (
    <div className={s.productsCardsWrapper}>

      <div className={s.topPart}>
        <div className={s.header}>
          <h1 className={s.mainTitle}>Список товаров</h1>
          <Button onClick={() => navigate('/lk/edit-product/new')} className={s.createProductBtn}>Создать товар</Button>
        </div>
        {
          productsData && <div className={s.underHeader}>
            <Tabs tabsCount={productsData.tabsCount}/>
            <div className={s.searchAndFilters}>
              <SearchProductCard/>
              <ProductCardFilters filters={productsData.filters} />
            </div>
          </div>
        }
      </div>

      
      <ContentPart productsLoading={productsLoading} products={productsData?.products} getProducts={getProducts}/>


    </div>
  );
};

export default LkProductsCards;