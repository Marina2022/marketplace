import {useEffect, useState} from "react";
import s from "./RequestDetailsPage.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import RequestDetailsDesktop from "@/components/RequestDetailsPage/RequestDetailsDesktop/RequestDetailsDesktop.jsx";
import RequestDetailsTablet from "@/components/RequestDetailsPage/RequestDetailsTablet/RequestDetailsTablet.jsx";
import RequestDetailsMobile from "@/components/RequestDetailsPage/RequestDetailsMobile/RequestDetailsMobile.jsx";
import {useMediaQuery} from "react-responsive";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";
import {getTabs, setTabs} from "@/store/tabsSlice.js";

const RequestDetailsPage = () => {
  const {id} = useParams();

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeProfileId = useSelector(getActiveProfileId)

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})
  const tabs = useSelector(getTabs)
  const dispatch = useDispatch()
  const location = useLocation()

  const navigate = useNavigate();

  const getRequest = async (reload) => {

    // не всегда нужно перезагружать всю страницу - reload передаем в параметре (перезагружать ли)
    reload && setLoading(true)
    try {
      const requestResponse = await axiosInstance(`/requests/${id}/details`)
      let requestToState = requestResponse.data

      const filesForRequest = await axiosInstance(`/requests/${id}/files`)

      requestToState.picture = filesForRequest.data.preview || null
      requestToState.attachments = filesForRequest.data.attachments

      setRequest(requestToState)
    } catch (err) {
      if (err.response?.data?.errors?.[0]?.code === "Request.NotFound") {
        const newTabs = tabs.filter(tabItem => tabItem !== location.pathname)
        dispatch(setTabs(newTabs))
        navigate("/manage-requests/my-requests")
      }
      throw err // пробрасываем дальше
    } finally {
      reload && setLoading(false)
    }
  }
  const [responses, setResponses] = useState(null)
  const [chatsLoading, setChatsLoading] = useState(true)

  useEffect(() => {
    const getResponses = async () => {
      setChatsLoading(true)
      try {
        const result = await axiosInstance(`/responses/chat-links/by-request/${id}`)
        setResponses(result.data)
      } catch (err) {
        console.log(err)
      } finally {
        setChatsLoading(false)
      }
    }
    getResponses()
  }, [request])

  const [requestToEdit, setRequestToEdit] = useState(null);

  const getRequestData = async (reload = true) => {

    try {
      await getRequest(reload)
    } catch (err) {
      console.log(err)
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
      isDesktop && <RequestDetailsDesktop
        request={request}
        setRequestToEdit={setRequestToEdit}
        resetRequest={getRequestData}
        responses={responses}
        chatsLoading={chatsLoading}
      />
    }

    {
      isTablet && <RequestDetailsTablet
        request={request}
        setRequestToEdit={setRequestToEdit}
        resetRequest={getRequestData}
        responses={responses}
        chatsLoading={chatsLoading}
      />
    }

    {
      isMobile && <RequestDetailsMobile
        request={request}
        loading={loading}
        setRequestToEdit={setRequestToEdit}
        resetRequest={getRequestData}
        responses={responses}
        chatsLoading={chatsLoading}
      />
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