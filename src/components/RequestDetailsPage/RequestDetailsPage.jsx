import {useEffect, useState} from "react";
import s from "./RequestDetailsPage.module.scss"
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useNavigate, useParams} from "react-router-dom";
import RequestDetailsDesktop from "@/components/RequestDetailsPage/RequestDetailsDesktop/RequestDetailsDesktop.jsx";
import RequestDetailsTablet from "@/components/RequestDetailsPage/RequestDetailsTablet/RequestDetailsTablet.jsx";
import RequestDetailsMobile from "@/components/RequestDetailsPage/RequestDetailsMobile/RequestDetailsMobile.jsx";
import {useMediaQuery} from "react-responsive";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";

const RequestDetailsPage = () => {
  const {id} = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeProfileId = useSelector(getActiveProfileId)

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})

  console.log("request = ", request)

  const navigate = useNavigate();

  const getRequest = async () => {
    setLoading(true)
    try {
      const requestResponse = await axiosInstance(`/requests/${id}/details`)
      let requestToState = requestResponse.data

      const filesForRequest = await axiosInstance(`/requests/${id}/files`)

      requestToState.picture = filesForRequest.data.preview || null
      requestToState.attachments = filesForRequest.data.attachments

      setRequest(requestToState)
    } catch (err) {
      if (err.response?.data?.errors?.[0]?.code === "Request.NotFound") {
        navigate("/manage-requests/my-requests")
      }

      throw err // пробрасываем дальше
    } finally {
      setLoading(false)
    }
  }

  const [requestToEdit, setRequestToEdit] = useState(null);

  const getRequestData = async () => {

    try {
      await getRequest()
      // выполнится ТОЛЬКО если resetRequest успешен
      await Promise.all([
        //axiosInstance(`/requests/${id}/history`),  //
        //axiosInstance(`/requests/${id}/something-else`)
      ])

    } catch (e) {
      // сюда попадём если resetRequest упал
      console.log("Основной запрос не прошёл, остальные не вызываем")
    }
  }

  useEffect(() => {
    if (!activeProfileId) return

    getRequestData()
  }, [activeProfileId, id])

  if (loading && !isMobile) return (
    <div>
      <Spinner/>
    </div>
  )

  return <div className={`${s.requestDetailsGlobalWrapper} scroll`}>

    {
      isDesktop && <RequestDetailsDesktop request={request} setRequestToEdit={setRequestToEdit} resetRequest={getRequestData} />
    }

    {
      isTablet && <RequestDetailsTablet request={request} setRequestToEdit={setRequestToEdit} resetRequest={getRequestData}/>
    }

    {
      isMobile && <RequestDetailsMobile request={request} loading={loading} setRequestToEdit={setRequestToEdit} resetRequest={getRequestData} />
    }

    {requestToEdit && (
      <EditRequest
        requestToEdit={requestToEdit}
        resetRequests={getRequestData}
        setRequestToEdit={setRequestToEdit}
      />
    )}
  </div>
}

export default RequestDetailsPage;