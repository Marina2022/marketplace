import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

const LkProductsCards = () => {

  const profileId = useSelector(getActiveProfileId)
  const {statusTab} = useParams()
  const [productsLoading, setProductsLoading] = useState(true)

  useEffect(() => {
    if (!profileId) return

    let url = `seller/${profileId}/products`
    if (statusTab) url + '?' + `statusTab=${statusTab}`

    try {
      setProductsLoading(true)
      const resp = axiosInstance(`seller/${profileId}/products`)
      console.log(resp)
    } catch (err) {
      console.log(err)
    } finally {
      setProductsLoading(false)
    }
  }, [profileId]);

  if (productsLoading) return <Spinner/>

  return (
    <div>
      LkProductsCards
    </div>
  );
};

export default LkProductsCards;