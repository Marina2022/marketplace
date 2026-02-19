import s from "./RightPanelDetails.module.scss";
// import BrowserPanel
//   from "@/pages/Lk/LkMenus/LkRightSideMenuItem/RightPanelContent/panels/BrowserPanel/BrowserPanel.jsx";
import {useEffect, useRef, useState} from "react";
import CollapsedDetails
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/CollapsedDetails/CollapsedDetails.jsx";
import ExpandedDetails
  from "@/components/lk-InnerPages/LkRequestsPage/RightPanelDetails/right-panel-views/ExpandedDetails/ExpandedDetails.jsx";

// const RightPanelDetails = ({currentRightPanelItem, collapse}) => {
const RightPanelDetails = ({requestDetails, setRequestDetails}) => {

  const [showTooltip, setShowTooltip] = useState(false)
  const [expanded, setExpanded] = useState(false)

  const panelRef = useRef(null);

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


  console.log('requestDetails = ', requestDetails)

  return (
    <div className={s.rightPanel} ref={panelRef} style={{width: expanded ? '40%' : 'unset'}}>
      {
        !expanded && <CollapsedDetails request={requestDetails} setExpanded={setExpanded} setShowTooltip={setShowTooltip} showTooltip={showTooltip} />
      }

      {
        expanded && <ExpandedDetails request={requestDetails} setExpanded={setExpanded} setShowTooltip={setShowTooltip} showTooltip={showTooltip}/>
      }
    </div>
  );
};

export default RightPanelDetails;