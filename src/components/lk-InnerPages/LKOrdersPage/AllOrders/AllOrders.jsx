import s from './AllOrders.module.scss';
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";
import SortBlock from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/SortBlock/SortBlock.jsx";
import OneOfAllOrder from "@/components/lk-InnerPages/LKOrdersPage/AllOrders/OneOfAllOrder/OneOfAllOrder.jsx";

const AllOrders = () => {

  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const [allOrders, setAllOrders] = useState(null)

  const profileId = useSelector(getActiveProfileId)
  const userProfiles = useSelector(getUserProfilesData)

  console.log('allOrders', allOrders)
  
  useEffect(() => {
    const getData = async (profileId, type) => {
      setIsLoading(true)
      setError(false)

      try {
        const response = await axios(`all-orders?profileId=${profileId}&profileType=${type}`)
        console.log('response', response)
        if (response.data.description === 'No product in order') {
          throw new Error('No product in order')
        }
        setAllOrders(response.data)
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
  }, [profileId, userProfiles]);

  // этот стейт контролирует значения, которые уйдут в запрос (а не открытие/закрытие списка)
  const [sortingType, setSortingType] = useState('product')
  
  const [dateSort, setDateSort] = useState(null)
  

  if (isLoading) return <Spinner className={s.spinner}/>
  
  if (error) return <div >{error.message}</div>

  return (
    <div className={s.allOrdersTabWrapper}>
      
      <div className={s.mainPart}>
        
        <ul>
          {
            allOrders.orders.map(order=><OneOfAllOrder order={order} key={order.orderId} />)
          }
          
        </ul>
        
      </div>

      <SortBlock sortingType={sortingType} setSortingType={setSortingType} dateSort={dateSort} setDateSort={setDateSort} sortingData={allOrders.sortingData} />
      
      
    </div>
  );
};

export default AllOrders;