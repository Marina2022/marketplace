import s from "./EmptyHistoryPage.module.scss"
import {useState} from 'react';
import Button from "@/components/ui/Button/Button.jsx";
import EditRequest from "@/components/manage-requests/MyRequests/ManageRequests/EditRequest/EditRequest.jsx";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getTabs, setTabs} from "@/store/tabsSlice.js";

const EmptyHistoryPage = ({resetRequests}) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const tabs = useSelector(getTabs)

  const handleGoToCatalog = () => {
    const url = "/requests"
    const isInTabs = tabs.find((tab) => tab === url)

    if (!isInTabs) {
      const newTabs = [...tabs, url]
      dispatch(setTabs(newTabs))
    }

    navigate(url, {
      state: {fromApp: true}
    })
  }

  const [requestToEdit, setRequestToEdit] = useState(null)

  return (
    <div className={s.emptyPage}>
      <div className={s.emptyPageContent}>
        <svg className={s.icon} width="104" height="104" viewBox="0 0 104 104" fill="none"
             xmlns="http://www.w3.org/2000/svg">
          <rect width="104" height="104" rx="18" fill="#ECEFF5"/>
          <path
            d="M52 70C61.9411 70 70 61.9411 70 52C70 42.0589 61.9411 34 52 34C42.0589 34 34 42.0589 34 52C34 61.9411 42.0589 70 52 70Z"
            stroke="#3D4A66" strokeWidth="2.4"/>
          <path d="M52 41V52L59 56" stroke="#3D4A66" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>

        <div className={s.title}>История пока пуста</div>
        <div className={s.text}>
          Здесь будет хронология ваших действий: завершённые заявки, принятые отклики и закрытые сделки. Как только
          появится первое событие, оно отобразится в ленте.
        </div>
        <div className={s.buttons}>
          <Button onClick={() => setRequestToEdit('new')} className={s.createRequestButton}>
            <svg className={s.btnIcon} width="11" height="11" viewBox="0 0 11 11" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path d="M5.48438 0.796875V10.1719M0.796875 5.48438H10.1719" stroke="white" strokeWidth="1.59375"
                    strokeLinecap="round"/>
            </svg>
            <span>Создать заявку</span>
          </Button>
          <Button onClick={() => handleGoToCatalog()} white className={s.gotToCatalogBtn}>
            <svg className={s.btnIcon} width="16" height="16" viewBox="0 0 16 16" fill="none"
                 xmlns="http://www.w3.org/2000/svg">
              <path
                d="M7.11241 11.553C9.56701 11.553 11.5569 9.56311 11.5569 7.10851C11.5569 4.65391 9.56701 2.66406 7.11241 2.66406C4.65781 2.66406 2.66797 4.65391 2.66797 7.10851C2.66797 9.56311 4.65781 11.553 7.11241 11.553Z"
                stroke="#3A3F49" strokeWidth="1.51111"/>
              <path d="M10.668 10.6641L13.3346 13.3307" stroke="#3A3F49" strokeWidth="1.51111" strokeLinecap="round"/>
            </svg>
            <span>Открыть каталог</span>
          </Button>
        </div>
      </div>
      {requestToEdit && (
        <EditRequest
          requestToEdit={requestToEdit}
          resetRequests={resetRequests}
          setRequestToEdit={setRequestToEdit}
        />
      )}
    </div>
  )
}

export default EmptyHistoryPage;