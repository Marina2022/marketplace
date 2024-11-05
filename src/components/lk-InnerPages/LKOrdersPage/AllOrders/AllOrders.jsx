import axios from "@/api/axiosInstance.js";
import s from './AllOrders.module.scss';
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";
import SortBlock from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/SortBlock/SortBlock.jsx";
import OneOfAllOrder from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/OneOfAllOrder/OneOfAllOrder.jsx";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import EmptyPageAllOrders
  from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/EmptyPageAllOrders/EmptyPageAllOrders.jsx";

const AllOrders = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allOrders, setAllOrders] = useState(null)

  const profileId = useSelector(getActiveProfileId)
  const userProfiles = useSelector(getUserProfilesData)

  // этот стейт контролирует значения, которые уйдут в запрос (а не открытие/закрытие списка)
  const [sortingType, setSortingType] = useState('product')
  const [dateSort, setDateSort] = useState(null)

  const isMobile = useMobileScreen()

  useEffect(() => {
    const getData = async (profileId, type) => {
      setIsLoading(true)
      setError(false)

      let url = `all-orders?profileId=${profileId}&profileType=${type}`

      if (dateSort) {
        url += `&orderType=${sortingType}&dateSort=${dateSort}`
      }

      try {
        const response = await axios(url)
        if (response.data.description === 'No product in order') {
          throw new Error('No product in order')
        }
        setAllOrders(response.data)

        // активный год, если в АПИ он всего один 
        const sortingArr = response.data.sortingData

        if (sortingArr[0].years.length === 1 && sortingArr[1].years.length === 0) {
          setDateSort(sortingArr[0].years[0])
        }

        if (sortingArr[1].years.length === 1 && sortingArr[0].years.length === 0) {
          setDateSort(sortingArr[1].years[0])
          setSortingType('services')
        }

      } catch (err) {
        console.log('err = ', err)
        setError(err)
      } finally {
        setIsLoading(false)
      }
    }

    if (profileId && userProfiles) {
      const currentProfile = userProfiles.find(item => item.profileId === profileId)
      const type = currentProfile.type
      getData(profileId, type)
    }
  }, [profileId, userProfiles, dateSort, sortingType]);

  let mobileNavigateToSortTitle
  if (allOrders) {
    mobileNavigateToSortTitle = allOrders.sortingData.find(item => item.sortingOrderType === sortingType).sortingOrderTypeDisplay
  }

  const [isMobileSortOpened, setIsMobileSortOpened] = useState(false)
  const handleMobileToSortClick = () => {
    setIsMobileSortOpened(true)
  }

  if (!allOrders && isLoading) return <Spinner className={s.spinner}/>

  if (error) {
    return error.message === 'No product in order' ? <EmptyPageAllOrders/> : <div>{error.message}</div>
  }
  
  return (
    <div className={s.globalWrapper}>
      {
        isMobile && <div className={isMobileSortOpened ? s.mobileSorting : s.notVisible}>
          <SortBlock sortingType={sortingType}
                     setSortingType={setSortingType}
                     dateSort={dateSort}
                     setDateSort={setDateSort}
                     sortingData={allOrders.sortingData}
                     setIsMobileSortOpened={setIsMobileSortOpened}
          />
        </div>
      }
      {
        (!isMobile || (isMobile && !isMobileSortOpened)) &&
        (
          <div>
            <div onClick={handleMobileToSortClick} className={s.mobileNavigateToSort}>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M14 3.5H2C1.72667 3.5 1.5 3.27333 1.5 3C1.5 2.72667 1.72667 2.5 2 2.5H14C14.2733 2.5 14.5 2.72667 14.5 3C14.5 3.27333 14.2733 3.5 14 3.5Z"
                  fill="#292D32"/>
                <path
                  d="M8.31333 6.83337H2C1.72667 6.83337 1.5 6.60671 1.5 6.33337C1.5 6.06004 1.72667 5.83337 2 5.83337H8.31333C8.58667 5.83337 8.81333 6.06004 8.81333 6.33337C8.81333 6.60671 8.59333 6.83337 8.31333 6.83337Z"
                  fill="#292D32"/>
                <path
                  d="M14 10.1666H2C1.72667 10.1666 1.5 9.93996 1.5 9.66663C1.5 9.39329 1.72667 9.16663 2 9.16663H14C14.2733 9.16663 14.5 9.39329 14.5 9.66663C14.5 9.93996 14.2733 10.1666 14 10.1666Z"
                  fill="#292D32"/>
                <path
                  d="M8.31333 13.5H2C1.72667 13.5 1.5 13.2733 1.5 13C1.5 12.7267 1.72667 12.5 2 12.5H8.31333C8.58667 12.5 8.81333 12.7267 8.81333 13C8.81333 13.2733 8.59333 13.5 8.31333 13.5Z"
                  fill="#292D32"/>
              </svg>
              <span>{mobileNavigateToSortTitle}</span>
              <img src="" alt=""/>
              <svg className={s.arrow} width="16" height="16" viewBox="0 0 16 16" fill="none"
                   xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M5.99656 2.21999C6.12323 2.21999 6.2499 2.26665 6.3499 2.36665L10.6966 6.71332C11.4032 7.41999 11.4032 8.57999 10.6966 9.28665L6.3499 13.6333C6.15656 13.8267 5.83656 13.8267 5.64323 13.6333C5.4499 13.44 5.4499 13.12 5.64323 12.9267L9.9899 8.57999C10.3099 8.25999 10.3099 7.73999 9.9899 7.41999L5.64323 3.07332C5.4499 2.87999 5.4499 2.55999 5.64323 2.36665C5.74323 2.27332 5.8699 2.21999 5.99656 2.21999Z"
                  fill="#292D32"/>
              </svg>
            </div>
            <div className={s.allOrdersWrapper}>
              <div className={s.mainPart}>
                <ul>
                  {
                    isLoading ? <Spinner/>
                      : allOrders.orders.map(order => <OneOfAllOrder order={order} key={order.orderId}/>)
                  }
                </ul>
              </div>
              <div className={s.mobileHidden}>
                <SortBlock sortingType={sortingType}
                           setSortingType={setSortingType}
                           dateSort={dateSort}
                           setDateSort={setDateSort}
                           sortingData={allOrders.sortingData}
                />
              </div>
            </div>
          </div>
        )
      }
    </div>
  );
};

export default AllOrders;