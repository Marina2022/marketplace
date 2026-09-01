import s from './ChatRequestItem.module.scss';
import placeHolderImg from "@/assets/img/chat/placeholderChat.jpg";
import {useDispatch, useSelector} from "react-redux";
import {getCurrentChatRequest, setCurrentChatRequest} from "@/store/chatSlice.js";
import {getChatsLabel} from "@/utils/oneRequest.js";
import {formatArchived, getNewWord} from "@/utils/chat.js";

const ChatRequestItem = ({request}) => {

  const currentChatRequest = useSelector(getCurrentChatRequest)
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(setCurrentChatRequest(request.requestId));
  }

  const isActive = currentChatRequest === request.requestId

  return (
    <li className={`${s.requestItem} ${isActive ? s.requestItemActive : ""}`} onClick={handleClick}>
      <div className={s.mainDesc}>
        <img className={s.img} src={request.picture ? request.picture : placeHolderImg} alt="img"/>
        <div className={s.namePart}>
          <div className={s.name}>{request.title}</div>
          <div className={s.number}>{request.requestNumber}</div>
        </div>
      </div>

      <div className={s.bottomPart}>
        {
          request.role.toLowerCase() === "executor" && (
            <div className={s.executorBottom}>
              <div className={s.bullet}/>
              <div>
                {request.linkStatus}
              </div>
            </div>
          )
        }

        {
          request.role.toLowerCase() === "customer" && (
            <div className={s.customerBottom}>
              <div className={s.statItem}>
                <svg width="14" height="11" viewBox="0 0 14 11" fill="none">
                  <path
                    d="M5.26923 4.375C5.26923 4.42473 5.24897 4.47242 5.21291 4.50758C5.17684 4.54275 5.12793 4.5625 5.07692 4.5625C5.02592 4.5625 4.97701 4.54275 4.94094 4.50758C4.90488 4.47242 4.88462 4.42473 4.88462 4.375C4.88462 4.32527 4.90488 4.27758 4.94094 4.24242C4.97701 4.20726 5.02592 4.1875 5.07692 4.1875C5.12793 4.1875 5.17684 4.20726 5.21291 4.24242C5.24897 4.27758 5.26923 4.32527 5.26923 4.375ZM5.26923 4.375H5.07692M7.19231 4.375C7.19231 4.42473 7.17205 4.47242 7.13598 4.50758C7.09992 4.54275 7.051 4.5625 7 4.5625C6.949 4.5625 6.90008 4.54275 6.86402 4.50758C6.82795 4.47242 6.80769 4.42473 6.80769 4.375C6.80769 4.32527 6.82795 4.27758 6.86402 4.24242C6.90008 4.20726 6.949 4.1875 7 4.1875C7.051 4.1875 7.09992 4.20726 7.13598 4.24242C7.17205 4.27758 7.19231 4.32527 7.19231 4.375ZM7.19231 4.375H7M9.11539 4.375C9.11539 4.42473 9.09512 4.47242 9.05906 4.50758C9.02299 4.54275 8.97408 4.5625 8.92308 4.5625C8.87207 4.5625 8.82316 4.54275 8.7871 4.50758C8.75103 4.47242 8.73077 4.42473 8.73077 4.375C8.73077 4.32527 8.75103 4.27758 8.7871 4.24242C8.82316 4.20726 8.87207 4.1875 8.92308 4.1875C8.97408 4.1875 9.02299 4.20726 9.05906 4.24242C9.09512 4.27758 9.11539 4.32527 9.11539 4.375ZM9.11539 4.375H8.92308M2 5.88C2 6.68 2.5759 7.377 3.38821 7.4935C3.94564 7.5735 4.50872 7.635 5.07692 7.678V10L7.22256 7.9085C7.3288 7.80533 7.47163 7.7459 7.62154 7.7425C8.62237 7.71849 9.62078 7.63534 10.6113 7.4935C11.4241 7.377 12 6.6805 12 5.8795V2.8705C12 2.0695 11.4241 1.373 10.6118 1.2565C9.41588 1.08536 8.20873 0.99963 7 1C5.77333 1 4.56718 1.0875 3.38821 1.2565C2.5759 1.373 2 2.07 2 2.8705V5.8795V5.88Z"
                    stroke="#8A8F98" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <span className={s.notTablet}>
                  {getChatsLabel(request.totalChats)}
                </span>
                <span className={s.tablet}>{request.totalChats}</span>
              </div>

              {
                request.newChats > 0 && (
                  <div className={s.statItem}>
                    <div className={s.bullet}/>
                    <span className={s.notTablet}>
                      {getNewWord(request.newChats)}
                    </span>
                    <span className={s.tablet}>{request.newChats}</span>
                  </div>
                )
              }

              {
                request.archivedChats > 0 && (
                  <div className={s.statItem}>
                    <svg width="9" height="9" viewBox="0 0 9 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M7.37277 0.515625H1.37277C0.899381 0.515625 0.515625 0.899381 0.515625 1.37277V7.37277C0.515625 7.84615 0.899381 8.22991 1.37277 8.22991H7.37277C7.84615 8.22991 8.22991 7.84615 8.22991 7.37277V1.37277C8.22991 0.899381 7.84615 0.515625 7.37277 0.515625Z"
                        stroke="#8A8F98" strokeWidth="1.02857"/>
                    </svg>

                    <span className={s.notTablet}>
                      {formatArchived(request.archivedChats)}
                    </span>
                    <span className={s.tablet}>{request.archivedChats}</span>
                  </div>
                )
              }
            </div>
          )
        }
      </div>
    </li>
  )
}

export default ChatRequestItem;