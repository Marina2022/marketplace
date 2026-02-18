import s from "./RightPanelDetails.module.scss";
// import BrowserPanel
//   from "@/pages/Lk/LkMenus/LkRightSideMenuItem/RightPanelContent/panels/BrowserPanel/BrowserPanel.jsx";
import {useEffect, useRef, useState} from "react";
import {statusColors} from "@/consts/lk-consts.js";

// const RightPanelDetails = ({currentRightPanelItem, collapse}) => {
const RightPanelDetails = ({requestDetails, setRequestDetails}) => {

  const [showTooltip, setShowTooltip] = useState(false)

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
    <div className={s.rightPanel} ref={panelRef} >

      <div className={s.header}>
        <div className={s.heading}>Заявка №{requestDetails.requestNumber}</div>


        <div className={s.rightPartHeader}>

          <div
            className={s.requestStatus}
            style={{
              color: statusColors[requestDetails.status.theme].color,
              background: statusColors[requestDetails.status.theme].backgroundColor,
            }}
          >
            {requestDetails.status.label}
          </div>

          <div className={s.hideBtnWrapper}>
            <button className={s.hideBtn}
                    // onClick={collapse}
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4.57367 11.9943V5.5678H9.95028V7.8582H6.44556V11.9943H4.57367ZM2.78889 0H21.2115C21.976 0 22.6725 0.384522 23.1795 1.00396L23.1814 1.00157C23.6865 1.61958 24 2.47322 24 3.41242V20.5881C24 21.5215 23.6865 22.374 23.1814 22.9936L23.1758 23.0011C22.6687 23.6176 21.9738 24 21.2115 24H2.78889C2.02111 24 1.32364 23.6164 0.818561 22.9984C0.797467 22.9729 0.777741 22.9461 0.758991 22.9186C0.28887 22.3056 0 21.4845 0 20.5878V3.41218C0 2.47251 0.313479 1.6191 0.818366 1.00133C1.32345 0.383566 2.02072 0 2.78889 0ZM21.2115 2.3284H2.78889C2.54631 2.3284 2.32502 2.45076 2.16388 2.64768C2.00295 2.84484 1.90295 3.11561 1.90295 3.41242V20.5881C1.90295 20.8662 1.9881 21.1198 2.12736 21.3098L2.16388 21.3523C2.32502 21.5497 2.54631 21.6721 2.78869 21.6721H21.2113C21.4562 21.6721 21.6771 21.5512 21.8357 21.3571L21.8396 21.3523C21.9984 21.158 22.0971 20.8875 22.0971 20.5883V3.41266C22.0971 3.11609 21.9971 2.84508 21.8357 2.64816L21.8377 2.64601L21.8357 2.64362C21.6775 2.44909 21.4562 2.3284 21.2115 2.3284ZM19.4265 12.0057V18.4324H14.0497V16.142H17.5546V12.0057H19.4265Z" fill="#AAB7BF"/>
              </svg>

            </button>
            {
              showTooltip && <div className={s.tooltip}>Развернуть</div>
            }
          </div>

          <button className={s.menuBtn}>
            <svg width="4" height="18" viewBox="0 0 4 18" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" fill="#AAB7BF"/>
              <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" fill="#AAB7BF"/>
              <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" fill="#AAB7BF"/>
              <path d="M2 10C2.55228 10 3 9.55228 3 9C3 8.44772 2.55228 8 2 8C1.44772 8 1 8.44772 1 9C1 9.55228 1.44772 10 2 10Z" stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 3C2.55228 3 3 2.55228 3 2C3 1.44772 2.55228 1 2 1C1.44772 1 1 1.44772 1 2C1 2.55228 1.44772 3 2 3Z" stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M2 17C2.55228 17 3 16.5523 3 16C3 15.4477 2.55228 15 2 15C1.44772 15 1 15.4477 1 16C1 16.5523 1.44772 17 2 17Z" stroke="#AAB7BF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>


          </button>



        </div>

      </div>

      {/*{*/}
      {/*  currentRightPanelItem.name === "browser" && <BrowserPanel data={currentRightPanelItem.data}/>*/}
      {/*}*/}
    </div>
  );
};

export default RightPanelDetails;