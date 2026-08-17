import s from './RequestDetailsTablet.module.scss';
import RequestHeader from "@/components/RequestDetailsPage/request-components/RequestHeader/RequestHeader.jsx";
import RequestDesc from "@/components/RequestDetailsPage/request-components/RequestDesc/RequestDesc.jsx";
import RequestTags from "@/components/RequestDetailsPage/request-components/RequestTags/RequestTags.jsx";
import RequestFiles from "@/components/RequestDetailsPage/request-components/RequestFiles/RequestFiles.jsx";
import RequestHistory from "@/components/RequestDetailsPage/request-components/RequestHistory/RequestHistory.jsx";
import RequestIndicators
  from "@/components/RequestDetailsPage/request-components/RequestIndicators/RequestIndicators.jsx";
import RequestChart from "@/components/RequestDetailsPage/request-components/RequestChart/RequestChart.jsx";
import RequestResponses from "@/components/RequestDetailsPage/request-components/RequestResponses/RequestResponses.jsx";
import RequestButtons from "@/components/RequestDetailsPage/request-components/RequestButtons/RequestButtons.jsx";
import RequestSlots from "@/components/RequestDetailsPage/request-components/RequestSlots/RequestSlots.jsx";

const RequestDetailsTablet = ({request, setRequestToEdit, resetRequest}) => {
  return (
    <div className={s.wrapper}>

      <div className={s.mainBlock}>
        <RequestHeader request={request}/>
        <RequestDesc request={request}/>
        <RequestTags request={request}/>
        {
          request.attachments && request.attachments.length > 0 && <RequestFiles request={request}/>
        }
        <RequestHistory request={request}/>
      </div>

      <div className={s.rightBlock}>
        <RequestButtons request={request} setRequestToEdit={setRequestToEdit} resetRequest={resetRequest} />
        <RequestIndicators request={request}/>
        <RequestChart request={request}/>
        <RequestSlots request={request}/>
        <RequestResponses request={request}/>
      </div>
    </div>
  )
}

export default RequestDetailsTablet;