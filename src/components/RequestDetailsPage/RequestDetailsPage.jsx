import {useEffect, useState} from "react";
import s from "./RequestDetailsPage.module.scss"
import useMobileScreen from "@/hooks/useMobileScreen.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useParams} from "react-router-dom";

const RequestDetailsPage = () => {


  const { id } = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMobileScreen()
  const activeProfileId = useSelector(getActiveProfileId)

  console.log("request = ", request)

  const resetRequest = async () => {
    try {
      setLoading(true)
      const requestResponse = await axiosInstance(`/requests/${id}/details`)
      let requestToState = requestResponse.data

      const filesForRequest = await axiosInstance(`/requests/${id}/files`)

      if (filesForRequest.data.preview) {
        requestToState.picture = filesForRequest.data.preview
      } else {
        requestToState.picture = null
      }
      requestToState.attachments = filesForRequest.data.attachments

      setRequest(requestToState)

    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!activeProfileId) return

    const getRequest = async () => {
      resetRequest()
    }
    getRequest()
  }, [activeProfileId])

  if (loading && !request && !isMobile) return (
      <div >
        <Spinner/>
      </div>
  )

  return (
    <div>
      RequestDetailsPage
    </div>
  );
};

export default RequestDetailsPage;