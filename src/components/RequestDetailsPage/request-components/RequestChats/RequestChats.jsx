import s from './RequestChats.module.scss';
import {useNavigate} from "react-router-dom";
import ChatCard from "@/components/RequestDetailsPage/request-components/RequestChats/ChatCard/ChatCard.jsx";
import {getChatsLabel} from "@/utils/oneRequest.js";
import NoChats from "@/components/RequestDetailsPage/request-components/RequestChats/NoChats/NoChats.jsx";

const RequestChats = ({request, responses, resetRequest}) => {

  const navigate = useNavigate()
  const handleGoToChats = () => {
    navigate(`/chat?request=${request.requestId}`);
  }

  if (responses && responses.totalChats === 0) return <NoChats/>

  if (responses) return (
    <div className={s.requestResponses}>
      <div className={s.header}>
        <h3 className={s.title}>Отклики — все чаты</h3>
        <div className={s.headerOpenAll} onClick={handleGoToChats}>
          <span>Открыть все</span>
          <svg width="12" height="6" viewBox="0 0 12 6" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8.8125 4.875L11 2.6875L8.8125 0.5M11 2.6875H0.5" stroke="#3D4A66" strokeLinecap="round"
                  strokeLinejoin="round"/>
          </svg>
        </div>
      </div>

      <ul className={s.chatCards}>
        {
          responses.pinnedSlots.map((chat, index) => <ChatCard
            key={chat.chatLinkId}
            chat={chat} isLast={index === request.totalChats - 1}
            index={index}
            isPinned={true}
            resetRequest={resetRequest}
          />)
        }

        {
          responses.recentChats.map((chat, index) => <ChatCard
            key={chat.chatLinkId}
            chat={chat}
            isLast={(index + responses.pinnedSlots.length) === request.totalChats - 1}
            resetRequest={resetRequest}
          />)
        }
      </ul>
      {
        responses.remainingCount > 0 && (
          <div onClick={handleGoToChats} className={s.moreChats}>Ещё {getChatsLabel(responses.remainingCount)} →</div>
        )
      }
    </div>
  )
};

export default RequestChats;