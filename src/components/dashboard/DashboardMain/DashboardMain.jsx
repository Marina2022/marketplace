import s from './DashboardMain.module.scss';
import {useMediaQuery} from "react-responsive";
import {useEffect, useState} from "react";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";
import DashboardDesktop from "@/components/dashboard/DashboardMain/DashboardDesktop/DashboardDesktop.jsx";
import DashboardTablet from "@/components/dashboard/DashboardMain/DashboardTablet/DashboardTablet.jsx";
import DashboardMobile from "@/components/dashboard/DashboardMain/DashboardMobile/DashboardMobile.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {getActiveProfileId} from "@/store/userSlice.js";
import {useSelector} from "react-redux";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";
import {getPreviewPayload} from "@/utils/requests.js";
import placeHolderImg from "@/assets/img/chat/placeholderChat.jpg";

const DashboardMain = () => {

  const isMobile = useMediaQuery({maxWidth: 960})
  const isDesktop = useMediaQuery({minWidth: 1341})
  const isTablet = useMediaQuery({minWidth: 961, maxWidth: 1340})
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState(null)

  const profileId = useSelector(getActiveProfileId)

  const getData = async () => {

    try {
      setLoading(true)
      const result = await axiosInstance('dashboard')

      // картинки для заявок
      const payload = getPreviewPayload(result.data.recentRequests)
      const pictures = await axiosInstance.post(`/requests/preview`, payload)

      result.data.recentRequests.forEach(request => {
        if (pictures.data.items[request.requestId]) {
          request.picture = pictures.data.items[request.requestId].url
        } else {
          request.picture = placeHolderImg
        }
      })

      // картинки для откликов

      const payload2 = getPreviewPayload(result.data.recentResponses)
      const pictures2 = await axiosInstance.post(`/requests/preview`, payload2)

      result.data.recentResponses.forEach(response => {
        if (pictures2.data.items[response.requestId]) {
          response.picture = pictures2.data.items[response.requestId].url
        } else {
          response.picture = placeHolderImg
        }
      })

      setData(result.data)
    } catch (err) {
      console.log(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getData()
  }, [profileId])

  const [requestToEdit, setRequestToEdit] = useState(null)

  if (loading ) return (
    <div>
      <Spinner/>
    </div>
  )

  return (
    <div className={`${s.dashboardGlobalWrapper} `}>

      {
        isDesktop && <DashboardDesktop data={data} getData={getData} setRequestToEdit={setRequestToEdit} />
      }

      {
        isTablet && <DashboardTablet data={data} getData={getData} setRequestToEdit={setRequestToEdit} />
      }

      {
        isMobile && <DashboardMobile data={data} getData={getData} setRequestToEdit={setRequestToEdit}/>
      }

      {requestToEdit && (
        <EditRequest
          requestToEdit={requestToEdit}
          resetRequests={getData}
          setRequestToEdit={setRequestToEdit}
        />
      )}
    </div>
  )
}

export default DashboardMain;


