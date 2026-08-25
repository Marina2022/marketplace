import s from './ResponseDetailsTablet.module.scss';
import RequestHeader from "@/components/RequestDetailsPage/request-components/RequestHeader/RequestHeader.jsx";
import RequestDesc from "@/components/RequestDetailsPage/request-components/RequestDesc/RequestDesc.jsx";
import RequestTags from "@/components/RequestDetailsPage/request-components/RequestTags/RequestTags.jsx";
import RequestFiles from "@/components/RequestDetailsPage/request-components/RequestFiles/RequestFiles.jsx";
import RequestHistory from "@/components/RequestDetailsPage/request-components/RequestHistory/RequestHistory.jsx";
import ResponseButtonsAndStatus
  from "@/components/manage-requests/ResponseDetailsPage/response-components/ResponseButtonsAndStatus/ResponseButtonsAndStatus.jsx";
import ClientBlock
  from "@/components/manage-requests/ResponseDetailsPage/response-components/ClientBlock/ClientBlock.jsx";
import RequestDetailsBlock
  from "@/components/RequestDetailsPage/request-components/RequestDetailsBlock/RequestDetailsBlock.jsx";

const ResponseDetailsTablet = ({request, resetRequest, setViewed}) => {

  return (
    <div className={s.wrapper}>
      <div className={s.mainBlock}>
        <RequestHeader request={request} forResponse={true} setViewed={setViewed}/>
        <RequestDesc request={request}/>
        <RequestTags request={request}/>
        {
          request.attachments && request.attachments.length > 0 && <RequestFiles request={request}/>
        }
        <RequestHistory request={request}/>
      </div>
      <div className={s.rightBlock}>
        <ResponseButtonsAndStatus request={request} resetRequest={resetRequest}/>
        <ClientBlock request={request}/>
        <RequestDetailsBlock request={request} forResponse={true}/>
      </div>
    </div>
  )
}

export default ResponseDetailsTablet;