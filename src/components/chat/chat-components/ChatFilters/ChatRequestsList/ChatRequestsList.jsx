import s from './ChatRequestsList.module.scss';
import ChatRequestItem
  from "@/components/chat/chat-components/ChatFilters/ChatRequestsList/ChatRequestItem/ChatRequestItem.jsx";
import MiniSpinnerPagination from "@/components/ui/miniSpinner/MiniSpinnerPagination/MiniSpinnerPagination.jsx";

const ChatRequestsList = ({requests, containerRef, observerRef, isOnScrollLoading}) => {

  return (
    <ul ref={containerRef} className={`${s.chatRequestsList} scroll`}>
      {
        requests.items.map((request, index) => <ChatRequestItem key={index} request={request} />)
      }

      {requests && (requests.meta.hasNext) && (
        <li ref={observerRef} className={s.observerDiv} style={{ listStyleType: 'none', width: '100%', minHeight: '30px' }}>
          {isOnScrollLoading && <div className={s.onScrollSpinnerWrapper}>
            <MiniSpinnerPagination />
          </div>}
        </li>
      )}
    </ul>
  )
}

export default ChatRequestsList;