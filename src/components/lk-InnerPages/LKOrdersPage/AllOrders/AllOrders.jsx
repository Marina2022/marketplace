import s from './AllOrders.module.scss';
import {useEffect, useState} from "react";
import axios from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useSelector} from "react-redux";
import {getActiveProfileId, getUserProfilesData} from "@/store/userSlice.js";

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
        const response = await axios(`all-orders?profileId=${profileId}&profileType=${type}`) //todo
        setAllOrders(response.data)
      } catch (err) {
        console.log('err = ', err)
        setError('Произошла ошибка')
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


  if (isLoading) return <Spinner className={s.spinner}/>
  if (error) return <div className={s.noReviews}>{error}</div>

  return (
    <div className={s.allOrdersTabWrapper}>
      
      <div className={s.mainPart}>mainPart</div>
      <div className={s.sortBlock}>sortBlock</div>
      
      
    </div>
  );
};

export default AllOrders;