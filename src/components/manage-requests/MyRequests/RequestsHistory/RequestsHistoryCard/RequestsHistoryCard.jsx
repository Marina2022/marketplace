import s from './RequestsHistoryCard.module.scss';
import placeholderImg from '@/assets/img/lk/lk-requests/placeholder.png'
import Button from "@/components/ui/Button/Button.jsx";
import RequestStatus from "@/components/ui/RequestStatus/RequestStatus.jsx";
import Participants
  from "@/components/manage-requests/MyRequests/RequestsHistory/RequestsHistoryCard/Participants/Participants.jsx";
import GeoCloseInfo
  from "@/components/manage-requests/MyRequests/RequestsHistory/RequestsHistoryCard/GeoCloseInfo/GeoCloseInfo.jsx";

const RequestsHistoryCard = ({request}) => {

  return (
    <div className={s.card}>
      <div className={s.photoDescBlock}>
        <img className={s.img} src={request.picture ? request.picture : placeholderImg} alt=""/>
        <div className={s.desc}>
          <div className={s.title}>{request.title}</div>
          <div className="mobile-hidden">
            <GeoCloseInfo request={request}/>
          </div>
          <div className="mobile-hidden">
            <Participants participants={request.participants}/>
          </div>
          <div className="mobile-visible">
            <div className={s.requestNumber}>#{request.requestNumber}</div>
          </div>
        </div>
      </div>

      {/* только на мобилке */}
      <div className={s.numberAndStatus}>
        <Participants participants={request.participants}/>
        <RequestStatus request={request}/>
      </div>
      <div className="mobile-hidden">
        <div className={s.requestNumber}>#{request.requestNumber}</div>
      </div>
      <div className={s.rightCardPart}>
        <div className={s.topRightBlock}>
          <div className="mobile-hidden">
            <RequestStatus request={request}/>
          </div>
          {
            request.viewsCount > 0 && request.totalChats > 0 && (
              <div className={s.views}>
                {
                  request.viewsCount > 0 && (
                    <div className={s.viewsRow}>
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M1.18644 7.18783C1.14619 7.06684 1.14619 6.93607 1.18644 6.81508C1.99553 4.38083 4.29211 2.625 6.99878 2.625C9.70428 2.625 11.9997 4.37908 12.8105 6.81217C12.8514 6.93292 12.8514 7.06358 12.8105 7.18492C12.002 9.61917 9.70544 11.375 6.99878 11.375C4.29328 11.375 1.99728 9.62092 1.18644 7.18783Z"
                          stroke="#9AA1AC" strokeLinecap="round" strokeLinejoin="round"/>
                        <path
                          d="M8.75 7C8.75 7.46413 8.56563 7.90925 8.23744 8.23744C7.90925 8.56563 7.46413 8.75 7 8.75C6.53587 8.75 6.09075 8.56563 5.76256 8.23744C5.43437 7.90925 5.25 7.46413 5.25 7C5.25 6.53587 5.43437 6.09075 5.76256 5.76256C6.09075 5.43437 6.53587 5.25 7 5.25C7.46413 5.25 7.90925 5.43437 8.23744 5.76256C8.56563 6.09075 8.75 6.53587 8.75 7Z"
                          stroke="#9AA1AC" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>

                      <span>{request.viewsCount}</span>

                    </div>
                  )
                }
                {
                  request.totalChats > 0 && (
                    <div className={s.viewsRow}>
                      <svg width="12" height="11" viewBox="0 0 12 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path
                          d="M10.5 0H0.875016C0.642951 0 0.420392 0.0921872 0.256297 0.256282C0.0922031 0.420376 1.58453e-05 0.642936 1.58453e-05 0.875V9.625C-0.000993182 9.79185 0.0462085 9.95545 0.135947 10.0961C0.225686 10.2368 0.354142 10.3486 0.505875 10.418C0.621501 10.4718 0.74747 10.4998 0.875016 10.5C1.08042 10.4995 1.27902 10.4263 1.43556 10.2933L1.44048 10.2895L3.22658 8.75H10.5C10.7321 8.75 10.9546 8.65781 11.1187 8.49372C11.2828 8.32962 11.375 8.10706 11.375 7.875V0.875C11.375 0.642936 11.2828 0.420376 11.1187 0.256282C10.9546 0.0921872 10.7321 0 10.5 0ZM10.5 7.875H3.06252C2.95747 7.87506 2.85594 7.91291 2.7765 7.98164L0.875016 9.625V0.875H10.5V7.875Z"
                          fill="#9AA1AC"/>
                      </svg>


                      <span>{request.totalChats}</span>
                    </div>
                  )
                }
              </div>
            )
          }
          <div className="mobile-visible">
            <GeoCloseInfo request={request}/>
          </div>
        </div>
        <Button white className={s.btn}>
          <svg className={s.icon} width="14" height="14" viewBox="0 0 14 14" fill="none"
               xmlns="http://www.w3.org/2000/svg">
            <path
              d="M11.0846 4.66406H5.83464C5.1903 4.66406 4.66797 5.1864 4.66797 5.83073V11.0807C4.66797 11.7251 5.1903 12.2474 5.83464 12.2474H11.0846C11.729 12.2474 12.2513 11.7251 12.2513 11.0807V5.83073C12.2513 5.1864 11.729 4.66406 11.0846 4.66406Z"
              stroke="#3A3F49" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
            <path
              d="M9.33333 4.66667V2.91667C9.33333 2.60725 9.21042 2.3105 8.99162 2.09171C8.77283 1.87292 8.47609 1.75 8.16667 1.75H2.91667C2.60725 1.75 2.3105 1.87292 2.09171 2.09171C1.87292 2.3105 1.75 2.60725 1.75 2.91667V8.16667C1.75 8.47609 1.87292 8.77283 2.09171 8.99162C2.3105 9.21042 2.60725 9.33333 2.91667 9.33333H4.66667"
              stroke="#3A3F49" strokeWidth="1.06667" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Создать похожую</span>
        </Button>
      </div>
    </div>
  )
}

export default RequestsHistoryCard;