import {useEffect, useState} from "react";
import s from "./ResponseDetailsPage.module.scss"
import {useDispatch, useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import axiosInstance from "@/api/axiosInstance.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import {useLocation, useNavigate, useParams} from "react-router-dom";
import {useMediaQuery} from "react-responsive";
import {getTabs, setTabs} from "@/store/tabsSlice.js";
import ResponseDetailsDesktop
  from "@/components/manage-requests/ResponseDetailsPage/ResponseDetailsDesktop/ResponseDetailsDesktop.jsx";
import ResponseDetailsTablet
  from "@/components/manage-requests/ResponseDetailsPage/ResponseDetailsTablet/ResponseDetailsTablet.jsx";
import ResponseDetailsMobile
  from "@/components/manage-requests/ResponseDetailsPage/ResponseDetailsMobile/ResponseDetailsMobile.jsx";

const ResponseDetailsPage = () => {
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

  const getResponse = async (reload) => {

    // не всегда нужно перезагружать всю страницу - reload передаем в параметре (перезагружать ли)
    reload && setLoading(true)
    try {
      const requestResponse = await axiosInstance(`/responses/${id}`)
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

  const getResponseData = async (reload = true) => {
    try {
      await getResponse(reload)
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    if (!activeProfileId) return

    getResponseData()
  }, [activeProfileId, id])

  const setViewed = async ()=>{
    try {
      await axiosInstance.post(`/responses/${request.requestId}/changes/viewed`)
      await getResponseData()
    } catch (err) {
      console.log(err)
    }
  }

  if (loading && !isMobile) return (
    <div>
      <Spinner/>
    </div>
  )

  return <div className={`${s.requestDetailsGlobalWrapper} scroll`}>

    {
      isDesktop && <ResponseDetailsDesktop
        request={request}
        resetRequest={getResponseData}
        setViewed={setViewed}
      />
    }

    {
      isTablet && <ResponseDetailsTablet
        request={request}
        resetRequest={getResponseData}
        setViewed={setViewed}
      />
    }

    {
      isMobile && <ResponseDetailsMobile
        request={request}
        loading={loading}
        setViewed={setViewed}
      />
    }
  </div>
}

export default ResponseDetailsPage;