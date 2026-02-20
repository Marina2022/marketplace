import s from "./RightPanelDetails.module.scss";
// import BrowserPanel
//   from "@/pages/Lk/LkMenus/LkRightSideMenuItem/RightPanelContent/panels/BrowserPanel/BrowserPanel.jsx";
import {useEffect, useRef, useState} from "react";
import CollapsedDetails
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/CollapsedDetails/CollapsedDetails.jsx";
import ExpandedDetails
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/ExpandedDetails/ExpandedDetails.jsx";
import axiosInstance from "@/api/axiosInstance.js";
import {useSelector} from "react-redux";
import {getActiveProfileId} from "@/store/userSlice.js";
import {getPreviewPayload, getRequestsWithPictures} from "@/utils/lkRequests.js";
import Spinner from "@/components/ui/Spinner/Spinner.jsx";

// const RightPanelDetails = ({currentRightPanelItem, collapse}) => {
const RightPanelDetails = ({requestDetails, setRequestDetails}) => {

  const [request, setRequest] = useState(null);
  const [loading, setLoading] = useState(true);
  const activeProfileId = useSelector(getActiveProfileId)

  useEffect(()=>{
    if (!activeProfileId) return

    const getRequest = async () => {

      try {
        setLoading(true)
        const requestResponse = await axiosInstance(`/requests/${requestDetails.requestId}/details?profileId=${activeProfileId}`)
        let requestToState = requestResponse.data

        const filesForRequest = await axiosInstance(`/requests/${requestResponse.data.requestId}/files?profileId=${activeProfileId}`)

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

    getRequest()
  }, [activeProfileId])

  // тест - edit-info
  // useEffect(() => {
  //   console.log('requestDetails.requestId = ', requestDetails.requestId)
  //
  //   try {
  //     const res = axiosInstance(`/requests/${requestDetails.requestId}/edit-info`)
  //     console.log("res.data = ", res.data)
  //   } catch(err) {
  //     console.log(err)
  //   }
  //
  // }, []);

  const [showTooltip, setShowTooltip] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const panelRef = useRef(null);

  // клик вне окна
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target)
      ) {
        setRequestDetails(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setRequestDetails]);

  console.log('request = ', request)

  if (loading) return (
      <div className={s.rightPanel} ref={panelRef} style={{width: expanded ? '40%' : 'unset'}}>
        <div style={{width: 365}}>
        <Spinner />
        </div>
      </div>
    )

  return (
    <div className={s.rightPanel} ref={panelRef} style={{width: expanded ? '40%' : 'unset'}}>

      {
        !expanded && <CollapsedDetails requestDetails={requestDetails} request={request} setExpanded={setExpanded} setShowTooltip={setShowTooltip} showTooltip={showTooltip} />
      }

      {
        expanded && <ExpandedDetails requestDetails={requestDetails} request={request} setExpanded={setExpanded} setShowTooltip={setShowTooltip} showTooltip={showTooltip}/>
      }
    </div>
  );
};

export default RightPanelDetails;